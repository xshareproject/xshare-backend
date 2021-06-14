import { Request, Response, NextFunction } from "express";
import userService from "../../user/user.service";
import { STATUS_CODES } from "../../../common/constants/response.status";
import encryptionService from "../../../service/encryption/encryption.service";
import { AuthMiddlewareCommon } from "./auth.middleware.common";

class AuthMiddlewareComplete extends AuthMiddlewareCommon {
  async validateSessionToken(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const body = request.body;

    const sessionToken = encryptionService
      .decryptMessageWithServerPrivateKey(body.encryptedSessionToken)
      .split('"')
      .join("");

    const user = await userService.getUserBySessionToken(sessionToken);

    if (user) {
      request.body = { sessionToken };
      next();
    } else {
      response.status(STATUS_CODES.FORBIDDEN).send({
        error: `Invalid session token.`,
      });
    }
  }
}

export default new AuthMiddlewareComplete();
