import dotenv from "dotenv";
import express, { Request, Response } from "express";
import * as http from "http";
import cors from "cors";
import debug from "debug";

import * as winston from "winston";
import * as expressWinston from "express-winston";

import { connectToMongoDatabase } from "./common/mongoose/mongoose.service";

import { CommonRoutesConfig } from "./common/common.routes.config";
import { UserRoutes } from "./api/user/user.routes.config";
import {
  serverPrivateKey,
  serverPublicKey,
} from "./common/constants/server.env.vars";

dotenv.config();

console.log(serverPrivateKey, serverPublicKey);

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
  loggerOptions.meta = false; // when not debugging, log requests as one-liners
}

app.use(expressWinston.logger(loggerOptions));

routes.push(new UserRoutes(app));

const runningMessage = `Server running on port: ${PORT}`;

app.get("/", (request: Request, response: Response) => {
  response.status(200).send(runningMessage);
});

server.listen(PORT, () => {
  routes.forEach((route: CommonRoutesConfig) => {
    debugLog(`Routes configured for ${route.getName()}`);
  });

  console.log(runningMessage);
});
