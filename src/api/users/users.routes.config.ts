import express from "express";

import { CommonRoutesConfig } from "../../common/common.routes.config";
import UserController from "./user.controller";
import UserMiddleware from "./user.middleware";

export class UsersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "UsersRoutes");
  }

  configureRoutes(): express.Application {
    this.app
      .route("/users")
      .post(
        UserMiddleware.validateRequiredCreateUserBodyFields,
        UserMiddleware.validateUserUniquenessByEmail,
        UserMiddleware.validateUserUniquenessByPhoneNumber,
        UserController.createUser
      );

    this.app
      .route("/users/:id")
      .get(
        UserMiddleware.validateUserRequestUserId,
        UserController.getUserGivenId
      );

    return this.app;
  }
}
