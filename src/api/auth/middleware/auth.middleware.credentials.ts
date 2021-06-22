import { Request, Response, NextFunction } from "express";
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

    if (await authService.isUserSessionActive(body.sessionToken)) {
      const user = await userService.getUserBySessionToken(body.sessionToken);

      request.body = {
        userId: user._id,
        email: body.credentials.email,
        password: body.credentials.password,
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

    const user = await userService.getUserByEmail(body.email);

    if (await authService.isUserCredentialsValid(body)) {
      request.body = { userId: user._id };
      next();
    } else {
      response.status(STATUS_CODES.FORBIDDEN).send({
        error: `Invalid credentials.`,
      });
    }
  }
}

export default new AuthMiddlewareCredentials();
