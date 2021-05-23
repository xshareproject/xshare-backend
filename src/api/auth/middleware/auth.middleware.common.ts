import { Request, Response, NextFunction } from "express";
import { STATUS_CODES } from "../../../common/constants/response.status";

export abstract class AuthMiddlewareCommon {
  validateRequiredFields(
    request: Request,
    response: Response,
    next: NextFunction,
    requiredFields: string[]
  ) {
    const body = request.body;
    let areFieldsValid = true;

    if (!body) {
      response.status(STATUS_CODES.BAD_REQUEST).send({
        error: `Missing required fields.`,
      });
      return;
    }

    requiredFields.forEach((field) => {
      if (!body[field]) {
        areFieldsValid = false;
        return;
      }
    });

    if (areFieldsValid) {
      next();
    } else {
      response.status(STATUS_CODES.BAD_REQUEST).send({
        error: `Missing required fields.`,
      });
    }
  }
}
