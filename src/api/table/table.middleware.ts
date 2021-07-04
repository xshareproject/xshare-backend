import _ from "lodash";
import { Request, Response, NextFunction } from "express";

import { CreateTables } from "./table.types.config";
import restaurantService from "../restaurant/restaurant.service";
import {
  STATUS_CODES,
  GENERIC_MESSAGES,
} from "../../common/constants/response.status";

class TableMiddleware {
  isValidCreateTables(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const body: CreateTables = request.body;

    let validTables = true;

    body.tables.forEach((table) => {
      validTables = !_.isNil(table) && !_.isNil(table.tableNumber);
    });

    if (!_.isNil(body.tables) && validTables) {
      next();
    } else {
      response
        .status(STATUS_CODES.BAD_REQUEST)
        .send({ error: GENERIC_MESSAGES.GENERIC_400 });
    }
  }

  async isTablePartOfRestaurant(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { tableId, restaurantId } = request.query;

    const restaurant = await restaurantService.fetchRestaurant(
      restaurantId as string
    );

    const doesRestaurantContainTable =
      restaurant.tables.filter((table) => table._id === (tableId as string))
        .length === 1;

    if (!_.isNil(restaurant) && doesRestaurantContainTable) {
      next();
    } else {
      response
        .status(STATUS_CODES.BAD_REQUEST)
        .send({ error: GENERIC_MESSAGES.GENERIC_400 });
    }
  }
}

export default new TableMiddleware();
