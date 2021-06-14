import { NextFunction, Request, Response } from "express";
import _ from "lodash";

import { ICommonMiddleware } from "./common.interface";
import sslService from "../service/ssl/ssl.service";
import authService from "../api/auth/auth.service";

class CommonMiddleware implements ICommonMiddleware {
  private readonly whitelistEndpoints = ["/client/setup"];
  private readonly whitelistEndpointsAuth = [
    "/user/register",
    "/auth/session",
    "/auth/login",
    "/auth/complete",
  ];
  private readonly sslKeyPath = "x-ssl-key";
  private readonly authTokenPath = "authorization";

  verifySSLKey = (request: Request, response: Response, next: NextFunction) => {
    const sslKey = request.headers[this.sslKeyPath] as string;

    if (this.isInWhitelist(request.originalUrl)) {
      next();
      return;
    }

    if (_.isString(sslKey) && sslService.isValidSSLKey(sslKey)) {
      next();
      return;
    }

    return response.status(403).send("Incorrect SSL Key.");
  };

  private isInWhitelist = (path: string) => {
    return this.whitelistEndpoints.includes(path);
  };

  isValidAuthToken = (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const authToken = request.headers[this.authTokenPath] as string;

    if (this.isInWhitelistAuth(request.originalUrl)) {
      next();
      return;
    }

    if (_.isString(authToken) && authService.isUserAuthorized(authToken)) {
      next();
      return;
    }

    return response.status(403).send("Unauthorized.");
  };

  private isInWhitelistAuth = (path: string) => {
    return this.whitelistEndpointsAuth.includes(path);
  };
}

export default new CommonMiddleware();
