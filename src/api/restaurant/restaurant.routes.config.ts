import express from "express";

import { CommonRoutesConfig } from "../../common/common.routes.config";
import RestaurantController from "./restaurant.controller";

export class RestaurantRoutes extends CommonRoutesConfig {
  private readonly restaurantWithId = "/restaurant/:id";
  private readonly restaurant = "/restaurant";

  constructor(app: express.Application) {
    super(app, "RestaurantRoutes");
  }

  configureRoutes() {
    this.app.route(this.restaurant).post(RestaurantController.createRestaurant);
    this.app
      .route(`${this.restaurantWithId}`)
      .get(RestaurantController.getRestaurant);
    this.app
      .route(`${this.restaurantWithId}/tables`)
      .get(RestaurantController.getRestaurantTables);
    this.app.route(`${this.restaurantWithId}/tables`).post();
    this.app
      .route(`${this.restaurantWithId}/sessions`)
      .get(RestaurantController.getRestaurantSessions);
    this.app.route(`${this.restaurantWithId}/servers`).get();
    this.app.route(`${this.restaurantWithId}/servers`).post();
    this.app
      .route(`${this.restaurantWithId}/kitchen/orders`)
      .get(RestaurantController.getRestaurantKitchenOrders);

    return this.app;
  }
}
