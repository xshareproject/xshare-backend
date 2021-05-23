import express, { Request, Response, NextFunction } from "express";

import { CommonRoutesConfig } from "../../common/common.routes.config";
import AuthController from "./auth.controller";
import AuthMiddlewareSession from "./middleware/auth.middleware.session";
import AuthMiddlewareCredentials from "./middleware/auth.middleware.credentials";
import AuthMiddlewareComplete from "./middleware/auth.middleware.complete";

export class AuthRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "AuthRoutes");
  }

  configureRoutes() {
    this.app.route("/auth/session").post(
      (request: Request, response: Response, next: NextFunction) => {
        AuthMiddlewareComplete.validateRequiredFields(request, response, next, [
          "encryptedClientPublicKey",
        ]);
      },
      AuthMiddlewareSession.validateRequestHasEncryptedPublicKey,
      AuthMiddlewareSession.validateClientPublicKey,
      AuthController.getSessionToken
    );

    this.app.route("/auth/login").post(
      (request: Request, response: Response, next: NextFunction) => {
        AuthMiddlewareComplete.validateRequiredFields(request, response, next, [
          "encryptedCredentials",
        ]);
      },
      AuthMiddlewareCredentials.validateSessionToken,
      AuthMiddlewareCredentials.validateCredentials,
      AuthController.getAuthenticationToken
    );

    this.app
      .route("/auth/complete")
      .post((request: Request, response: Response, next: NextFunction) => {
        AuthMiddlewareComplete.validateRequiredFields(request, response, next, [
          "encryptedSessionToken",
        ]);
      }, AuthMiddlewareComplete.validateSessionToken);

    return this.app;
  }
}
