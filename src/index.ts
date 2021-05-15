import mongoose from "mongoose";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import * as http from "http";
import * as winston from "winston";
import * as expressWinston from "express-winston";
import cors from "cors";
import debug from "debug";

import { CommonRoutesConfig } from "./common/common.routes.config";
import { UsersRoutes } from "./api/users/users.routes.config";

dotenv.config();

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const PORT = process.env.PORT || 3000;
const routes: CommonRoutesConfig[] = [];
const debugLog: debug.IDebugger = debug("app");

const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_DB = process.env.MONGO_DB;

const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.wcu0n.mongodb.net/${MONGO_DB}?retryWrites=true&w=majority`;

mongoose.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err: any) => {
    if (err) {
      console.log("Error, not connected");
    } else {
      console.log("Connected as: ", MONGO_USER, " with DB: ", MONGO_DB);
    }
  }
);

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

routes.push(new UsersRoutes(app));

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
