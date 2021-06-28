import { Request, Response, NextFunction } from "express";
import { GENERIC_MESSAGES } from "../../common/constants/response.status";
import { METHODS } from "../../common/constants/request.methods";

import {
  PATHS,
  RESTAURANT_BASE_PATH,
  restaurantWithId,
} from "./restaurant.routes.config";
import RestaurantValidation from "./restaurant.validation";
class RestaurantMiddleware {
  async validateBody(request: Request, response: Response, next: NextFunction) {
    const { path, method, body } = request;

    if (await this.validate(path, method, body)) {
      next();
    } else {
      response.status(400).send({ error: GENERIC_MESSAGES.GENERIC_400 });
    }
  }

  async validateQueryParams(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { path, method, query } = request;

    if (await this.validate(path, method, query)) {
      next();
    } else {
      response.status(400).send({ error: GENERIC_MESSAGES.GENERIC_400 });
    }
  }

  private async validate(
    path: string,
    method: string,
    bodyOrParams: any
  ): Promise<boolean> {
    const key = this.createMethodAndPathKey(path, method);

    switch (key) {
      case `${METHODS.POST}_(${RESTAURANT_BASE_PATH})`:
        return RestaurantValidation.validateCreateRestaurant(bodyOrParams);
      case `${METHODS.GET}_(${RESTAURANT_BASE_PATH})`:
        return await RestaurantValidation.validateGetRestaurant(bodyOrParams);
      default:
        return false;
    }
  }

  private createMethodAndPathKey(path: string, method: string): string {
    return `${method}_(${path})`;
  }
}

export default new RestaurantMiddleware();
