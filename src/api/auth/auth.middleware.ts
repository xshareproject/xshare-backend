import { Request, Response, NextFunction } from "express";
import { STATUS_CODES } from "../../common/constants/response.status";
import authService from "./auth.service";
import userService from "../user/user.service";

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

    const user = await userService.getUserByPublicKey(
      body.encryptedClientPublicKey
    );

    if (user) {
      next();
    } else {
      response.status(STATUS_CODES.FORBIDDEN).send({
        error: `Public not recognised.`,
      });
    }
  }

  async validateClientPublicKeyIsAuthentic(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    // logic here
    next();
  }
}

export default new AuthMiddleware();
