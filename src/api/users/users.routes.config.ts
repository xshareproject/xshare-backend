import express, { Request, Response } from "express";

import { CommonRoutesConfig } from "../../common/common.routes.config";
import { createUser } from "../../db/user_db";

export class UsersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "UsersRoutes");
  }

  configureRoutes(): express.Application {
    this.app.route("/users").post((request: Request, response: Response) => {
      createUser(request.body)
        .then((result: string) => {
          response.status(200).send(result);
        })
        .catch((error: Error) => {
          response.status(500).send(error.message);
        });
    });

    return this.app;
  }
}
