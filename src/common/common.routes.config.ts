import express from "express";

export abstract class CommonRoutesConfig {
  app: express.Application;
  name: string;

  constructor(app: express.Application, name: string) {
    this.app = app;
    this.name = name;
  }

  getName() {
    return this.name;
  }

  log(toLog: any) {
    console.log(toLog);
  }

  abstract configureRoutes(): express.Application;
}
