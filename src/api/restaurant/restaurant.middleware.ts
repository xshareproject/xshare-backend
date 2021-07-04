import _ from "lodash";
import { Request, Response, NextFunction } from "express";

import {
  CreateAddress,
  CreateRestaurant,
  CreateServer,
  CreateTables,
  GetRestaurant,
} from "./restaurant.types.config";
import RestaurantService from "./restaurant.service";

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

  private readonly TABLE_PROPERTIES = ["numberOfTables"];

  isValidCreateServers(
    request: Request,
    response: Response,
    next: NextFunction
  ): boolean {
    const servers: CreateServer[] = request.body;

    let valid = true;

    servers.forEach((server) => {
      valid = this.isValidPropertiesOfObject(
        this.SERVER_PROPERTIES,
        request.body
      );
    });

    return valid;
  }

  async isValidGetRestaurant(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<boolean> {
    const id = request.query.id as string;

    const restaurant = await RestaurantService.fetchRestaurant(id);

    return !_.isNil(restaurant);
  }

  isValidCreateTables(
    request: Request,
    response: Response,
    next: NextFunction
  ): boolean {
    const body: CreateTables = request.body;

    let validTables = true;

    body.tables.forEach((table) => {
      validTables = !_.isNil(table) && !_.isNil(table.tableNumber);
    });

    return !_.isNil(body.tables) && validTables;
  }

  isValidCreateRestaurant(
    request: Request,
    response: Response,
    next: NextFunction
  ): boolean {
    const body = request.body;

    return (
      this.isValidPropertiesOfObject(this.CREATE_RESTAURANT_PROPERTIES, body) &&
      this.isValidAddress(body.address)
    );
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
