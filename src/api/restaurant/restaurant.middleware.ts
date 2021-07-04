import _ from "lodash";
import { Request, Response, NextFunction } from "express";

import {
  CreateAddress,
  CreateRestaurant,
  CreateServer,
  PutServers,
} from "./restaurant.types.config";
import RestaurantService from "./restaurant.service";
import {
  GENERIC_MESSAGES,
  STATUS_CODES,
} from "../../common/constants/response.status";

class RestaurantValidation {
  private readonly CREATE_RESTAURANT_PROPERTIES = [
    "name",
    "address",
    "googleMapsAddressLink",
    "phoneNumber",
    "paymentType",
  ];

  private readonly ADDRESS_PROPERTIES = [
    "addressLineOne",
    "city",
    "province",
    "postalCode",
  ];

  private readonly SERVER_PROPERTIES = ["firstName", "lastName"];

  isValidCreateServers(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const servers: CreateServer[] = request.body;

    let valid = true;

    servers.forEach((server) => {
      valid = this.isValidPropertiesOfObject(this.SERVER_PROPERTIES, server);
    });

    if (valid) {
      next();
    } else {
      response
        .status(STATUS_CODES.BAD_REQUEST)
        .send({ error: GENERIC_MESSAGES.GENERIC_400 });
    }
  }

  async isValidGetRestaurant(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const id = request.query.id as string;

    const restaurant = await RestaurantService.fetchRestaurant(id);

    if (!_.isNil(restaurant)) {
      next();
    } else {
      response
        .status(STATUS_CODES.BAD_REQUEST)
        .send({ error: GENERIC_MESSAGES.GENERIC_400 });
    }
  }

  isValidCreateRestaurant(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const body: CreateRestaurant = request.body;

    if (
      this.isValidPropertiesOfObject(this.CREATE_RESTAURANT_PROPERTIES, body) &&
      this.isValidAddress(body.address)
    ) {
      next();
    } else {
      response
        .status(STATUS_CODES.BAD_REQUEST)
        .send({ error: GENERIC_MESSAGES.GENERIC_400 });
    }
  }

  async areServersPartOfRestaurant(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const body: PutServers = request.body;
    const id = request.query.id as string;

    const restaurant = await RestaurantService.fetchRestaurant(id);

    let containsServers = true;

    body.serverIds.forEach((serverId) => {
      const containsServer =
        restaurant.servers.filter((server) => server._id === serverId)
          .length === 1;
      containsServers = containsServer;
    });

    if (containsServers) {
      next();
    } else {
      response
        .status(STATUS_CODES.BAD_REQUEST)
        .send({ error: GENERIC_MESSAGES.GENERIC_400 });
    }
  }

  private isValidAddress(address: CreateAddress): boolean {
    return this.isValidPropertiesOfObject(this.ADDRESS_PROPERTIES, address);
  }

  private isValidPropertiesOfObject(
    properties: string[],
    object: any
  ): boolean {
    let isValid = true;

    properties.forEach((property) => {
      isValid = !_.isNil(object[property]);
    });

    return isValid;
  }
}

export default new RestaurantValidation();
