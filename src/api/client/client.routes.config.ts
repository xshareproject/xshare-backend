import express from "express";

import { CommonRoutesConfig } from "../../common/common.routes.config";
import ClientController from "./client.controller";

export class ClientRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "ClientRoutes");
  }

  configureRoutes() {
    this.app
      .route("/client/setup")
      .get(ClientController.getSSLKeyAndServerPublicKey);

    return this.app;
  }
}
