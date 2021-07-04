import { Request, Response } from "express";

import { Session } from "../../../models/restaurant/table/session/session.type";
import { STATUS_CODES } from "../../common/constants/response.status";
import RestaurantService from "./restaurant.service";
import { CreateRestaurant } from "./restaurant.types.config";

class RestaurantController {
  async createRestaurant(request: Request, response: Response) {
    const body: CreateRestaurant = request.body;

    const newRestaurant = await RestaurantService.createRestaurant(body);

    response
      .status(STATUS_CODES.SUCCESS)
      .send(`Created restaurant with id: ${newRestaurant._id}`);
  }

  async getRestaurant(request: Request, response: Response) {
    const id = String(request.query.id);

    const restaurant = await RestaurantService.fetchRestaurant(id);

    response.status(STATUS_CODES.SUCCESS).send({ restaurant });
  }

  async getRestaurantTables(request: Request, response: Response) {
    const id = String(request.query.id);

    const restaurant = await RestaurantService.fetchRestaurant(id);

    response.status(STATUS_CODES.SUCCESS).send({ tables: restaurant.tables });
  }

  async getRestaurantServers(request: Request, response: Response) {
    const id = String(request.query.id);

    const restaurant = await RestaurantService.fetchRestaurant(id);

    response.status(STATUS_CODES.SUCCESS).send({ tables: restaurant.servers });
  }

  async getRestaurantMostRecentSessions(request: Request, response: Response) {
    const id = String(request.query.id);

    const restaurant = await RestaurantService.fetchRestaurant(id);

    const sessions: Session[] = [];

    restaurant.tables.forEach((table) => {
      const lastIndex = table.sessions.length - 1;

      if (lastIndex >= 0) {
        sessions.push(table.sessions[lastIndex]);
      }
    });

    response.status(STATUS_CODES.SUCCESS).send({ sessions });
  }

  async getRestaurantKitchenOrders(request: Request, response: Response) {
    const id = String(request.query.id);

    const restaurant = await RestaurantService.fetchRestaurant(id);

    response
      .status(STATUS_CODES.SUCCESS)
      .send({ orders: restaurant.kitchen.orders });
  }
}

export default new RestaurantController();
