import { Restaurant } from "../../../models/restaurant/restaurant.type";
import RESTAURANT from "../../../models/restaurant/restaurant.model";
import { CreateRestaurant } from "./restaurant.types.config";

class RestaurantService {
  async createRestaurant(data: CreateRestaurant): Promise<Restaurant> {
    const restaurant = new RESTAURANT(data);

    return await restaurant.save();
  }

  async fetchRestaurant(id: string): Promise<Restaurant> {
    return await RESTAURANT.findById(id);
  }
}

export default new RestaurantService();
