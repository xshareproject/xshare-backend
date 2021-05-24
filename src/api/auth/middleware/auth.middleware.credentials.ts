import { Request, Response, NextFunction } from "express";
import {
  ClientLoginCredentials,
  ClientLoginEncryptedCredentials,
} from "../../../common/types/auth.types.config";
import encryptionService from "../../../common/encryption/encryption.service";
import authService from "../auth.service";
import userService from "../../user/user.service";
import { STATUS_CODES } from "../../../common/constants/response.status";

class AuthMiddlewareCredentials {
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
      response.status(STATUS_CODES.FORBIDDEN).send({
        error: `Invalid session token.`,
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
      request.body = { userId: body.userId };
      next();
    } else {
      response.status(STATUS_CODES.FORBIDDEN).send({
        error: `Invalid credentials.`,
      });
    }
  }
}

export default new AuthMiddlewareCredentials();
