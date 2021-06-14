import dotenv from "dotenv";
import express from "express";
import * as http from "http";
import debug from "debug";
import cors from "cors";

import * as winston from "winston";
import * as expressWinston from "express-winston";

import { connectToMongoDatabase } from "./service/mongoose/mongoose.service";

import { CommonRoutesConfig } from "./common/common.routes.config";
import { UserRoutes } from "./api/user/user.routes.config";
import { AuthRoutes } from "./api/auth/auth.routes.config";
import { ClientRoutes } from "./api/client/client.routes.config";
import commonMiddleware from "./common/common.middleware";

dotenv.config();

connectToMongoDatabase();

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const PORT = process.env.PORT || 3000;
const routes: CommonRoutesConfig[] = [];
const debugLog: debug.IDebugger = debug("app");

app.use(express.json());

app.use(cors());

const loggerOptions: expressWinston.LoggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.colorize({ all: true })
  ),
};

if (!process.env.DEBUG) {
  loggerOptions.meta = false;
}

app.use(expressWinston.logger(loggerOptions));

app.use(commonMiddleware.verifySSLKey);

routes.push(new UserRoutes(app));
routes.push(new AuthRoutes(app));
routes.push(new ClientRoutes(app));

const runningMessage = `Server running on port: ${PORT}`;

server.listen(PORT, () => {
  routes.forEach((route: CommonRoutesConfig) => {
    debugLog(`Routes configured for ${route.getName()}`);
  });

  console.log(runningMessage);
});
