import { Request, Response } from "express";
import { STATUS_CODES } from "../../common/constants/response.status";
import RestaurantService from "./restaurant.service";
import { CreateRestaurant } from "./restaurant.types.config";

class RestaurantController {
  async createRestaurant(request: Request, response: Response) {
    const body: CreateRestaurant = request.body;

    const newRestaurant = await RestaurantService.createRestaurant(body);

    response
      .status(200)
      .send(`Created restaurant with id: ${newRestaurant._id}`);
  }

  async getRestaurant(request: Request, response: Response) {
    const id = String(request.query.id);

    const restaurant = await RestaurantService.fetchRestaurant(id);

    response.status(200).send({ restaurant });
  }
}

export default new RestaurantController();
