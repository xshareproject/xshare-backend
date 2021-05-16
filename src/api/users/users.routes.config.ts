import express, { Request, Response } from "express";

import { CommonRoutesConfig } from "../../common/common.routes.config";

export class UsersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "UsersRoutes");
  }

  configureRoutes(): express.Application {
    this.app.route("/users").post((request: Request, response: Response) => {});

    return this.app;
  }
}
