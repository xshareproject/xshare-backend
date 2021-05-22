import express from "express";

import { CommonRoutesConfig } from "../../common/common.routes.config";
import AuthController from "./auth.controller";
import AuthMiddlware from "./auth.middleware";

export class AuthRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "AuthRoutes");
  }

  configureRoutes() {
    this.app
      .route("/auth/session")
      .post(
        AuthMiddlware.validateRequestHasEncryptedPublicKey,
        AuthMiddlware.validateClientPublicKey,
        AuthController.getSessionToken
      );

    this.app.route("/auth/credentials").post();

    return this.app;
  }
}
