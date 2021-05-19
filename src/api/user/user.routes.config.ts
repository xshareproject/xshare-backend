import express from "express";

import { CommonRoutesConfig } from "../../common/common.routes.config";
import UserController from "./user.controller";
import UserMiddleware from "./user.middleware";

export class UserRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "UserRoutes");
  }

  configureRoutes() {
    this.app
      .route("/user/register")
      .post(
        UserMiddleware.validateInitialRegisterRequest,
        UserMiddleware.validateRequiredCreateUserBodyFields,
        UserMiddleware.validateUserDoesNotExsitWithEmail,
        UserMiddleware.validateUserDoesNotExsitWithPhoneNumber,
        UserController.createUser
      );

    this.app
      .route("/user")
      .get(
        UserMiddleware.validateUserRequestUserId,
        UserController.getUserGivenId
      );

    return this.app;
  }
}
