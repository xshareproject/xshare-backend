import { Request, Response, NextFunction } from "express";
import encryptionService from "../../../common/encryption/encryption.service";
import { STATUS_CODES } from "../../../common/constants/response.status";
import userService from "../../user/user.service";
import {
  ClientLoginRequest,
} from "../../../common/types/auth.types.config";

class AuthMiddlewareSession {
  validateRequestHasEncryptedPublicKey(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const body = request.body;

    if (body && body.encryptedClientPublicKey) {
      next();
    } else {
      response.status(STATUS_CODES.BAD_REQUEST).send({
        error: `Missing required fields.`,
      });
    }
  }

  async validateClientPublicKey(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const body = request.body;

    const decryptedMessage =
      encryptionService.decryptMessageWithServerPrivateKey(
        body.encryptedClientPublicKey
      );

    const clientLoginRequest: ClientLoginRequest = JSON.parse(decryptedMessage);

    const user = await userService.getUserByPublicKey(
      clientLoginRequest.publicKey
    );

    if (user) {
      request.body = clientLoginRequest;
      next();
    } else {
      response.status(STATUS_CODES.FORBIDDEN).send({
        error: `Public Key not recognised.`,
      });
    }
  }

  validateCredentialsRequiredFields(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const body = request.body;

    if (body && body.encryptedCredentials) {
      next();
    } else {
      response.status(STATUS_CODES.BAD_REQUEST).send({
        error: `Required fields not found.`,
      });
    }
  }
}

export default new AuthMiddlewareSession();
