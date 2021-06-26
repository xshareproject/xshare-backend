import express from "express";

import { CommonRoutesConfig } from "../../common/common.routes.config";

export class RestaurantRoutes extends CommonRoutesConfig {
  private readonly restaurantWithId = "/restaurant/:id";
  private readonly restaurant = "/restaurant";

  constructor(app: express.Application) {
    super(app, "RestaurantRoutes");
  }

  configureRoutes() {
    this.app.route(this.restaurant).post();
    this.app.route(`${this.restaurantWithId}`).get();
    this.app.route(`${this.restaurantWithId}/tables`).get();
    this.app.route(`${this.restaurantWithId}/tables`).post();
    this.app.route(`${this.restaurantWithId}/orders`).get();
    this.app.route(`${this.restaurantWithId}/servers`).get();
    this.app.route(`${this.restaurantWithId}/servers`).post();
    this.app.route(`${this.restaurantWithId}/kitchen/orders`).get();

    return this.app;
  }
}
