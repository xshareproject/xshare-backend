import { Request, Response, NextFunction } from "express";
import { STATUS_CODES } from "../../common/constants/response.status";

class UserMiddleware {
  async validateRequiredUserBodyFields(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const body = request.body;
    if (
      body &&
      body.firstName &&
      body.lastName &&
      body.email &&
      body.password &&
      body.phoneNumber
    ) {
      next();
    } else {
      response.status(STATUS_CODES.BAD_REQUEST).send({
        error: `Missing required fields.`,
      });
    }
  }
}

export default new UserMiddleware();
