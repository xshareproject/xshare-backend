import { Request, Response, NextFunction } from "express";
import encryptionService from "../../common/encryption/encryption.service";
import { STATUS_CODES } from "../../common/constants/response.status";
import userService from "../user/user.service";
import {
  ClientLoginRequest,
  ClientLoginEncryptedCredentials,
  ClientLoginCredentials,
} from "../../common/types/auth.types.config";
import authService from "./auth.service";

class AuthMiddleware {
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

  async validateSessionToken(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const body = request.body;

    const sessionTokenAndCredentials: ClientLoginEncryptedCredentials =
      JSON.parse(
        encryptionService.decryptMessageWithServerPrivateKey(
          body.encryptedCredentials
        )
      );

    if (
      await authService.isUserSessionActive(
        sessionTokenAndCredentials.sessionToken
      )
    ) {
      const user = await userService.getUserBySessionToken(
        sessionTokenAndCredentials.sessionToken
      );

      request.body = {
        userId: user._id,
        credentials: sessionTokenAndCredentials.credentials,
      };

      next();
    } else {
      response.status(STATUS_CODES.BAD_REQUEST).send({
        error: `Required fields not found.`,
      });
    }
  }

  async validateCredentials(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const body = request.body;

    const decryptedCrendentials =
      await encryptionService.decryptMessageWithClientPublicKey(
        body.credentials,
        body.userId
      );

    const userCrendentials: ClientLoginCredentials = JSON.parse(
      decryptedCrendentials
    );

    if (await authService.isUserCredentialsValid(userCrendentials)) {
      next();
    } else {
      response.status(STATUS_CODES.BAD_REQUEST).send({
        error: `Required fields not found.`,
      });
    }
  }
}

export default new AuthMiddleware();
