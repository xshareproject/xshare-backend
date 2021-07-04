import express from "express";

import { CommonRoutesConfig } from "../../common/common.routes.config";
import RestaurantController from "./restaurant.controller";
import RestaurantMiddleware from "./restaurant.middleware";

export const RESTAURANT_BASE_PATH = "/restaurant";
export const restaurantWithId = `${RESTAURANT_BASE_PATH}/:id`;

export const PATHS = {
  restaurantTables: `${restaurantWithId}/tables`,
  restaurantSessions: `${restaurantWithId}/sessions`,
  restaurantServers: `${restaurantWithId}/servers`,
  restaurantKitchenOrders: `${restaurantWithId}/kitchen/orders`,
};

export class RestaurantRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "RestaurantRoutes");
  }

  configureRoutes() {
    this.app
      .route(RESTAURANT_BASE_PATH)
      .post(
        RestaurantMiddleware.isValidCreateRestaurant,
        RestaurantController.createRestaurant
      );

    this.app
      .route(restaurantWithId)
      .get(
        RestaurantMiddleware.isValidGetRestaurant,
        RestaurantController.getRestaurant
      );

    this.app
      .route(PATHS.restaurantTables)
      .get(
        RestaurantMiddleware.isValidGetRestaurant,
        RestaurantController.getRestaurantTables
      );

    this.app
      .route(PATHS.restaurantTables)
      .post(
        RestaurantMiddleware.isValidGetRestaurant,
        RestaurantMiddleware.isValidCreateTables
      );

    this.app
      .route(PATHS.restaurantSessions)
      .get(
        RestaurantMiddleware.isValidGetRestaurant,
        RestaurantController.getRestaurantSessions
      );

    this.app
      .route(PATHS.restaurantServers)
      .get(
        RestaurantMiddleware.isValidGetRestaurant,
        RestaurantController.getRestaurantServers
      );

    this.app
      .route(PATHS.restaurantServers)
      .post(RestaurantMiddleware.isValidCreateServers);

    this.app
      .route(PATHS.restaurantKitchenOrders)
      .get(
        RestaurantMiddleware.isValidGetRestaurant,
        RestaurantController.getRestaurantKitchenOrders
      );

    return this.app;
  }
}
