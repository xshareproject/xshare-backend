import _ from "lodash";
import { Request, Response } from "express";

import { CreateTables } from "./table.types.config";
import TableService from "./table.service";

class TableController {
  async createRestaurantTables(request: Request, response: Response) {
    const body: CreateTables = request.body;
    const id = request.query.id as string;

    const numberOfTablesAdded = await TableService.createTablesForRestaurant(
      id,
      body
    );

    response
      .status(200)
      .send(`Created this many new tables: ${numberOfTablesAdded}`);
  }

  async getTableSessions(request: Request, response: Response) {
    const id = request.query.id as string;

    const table = await TableService.fetchTable(id);

    response.status(200).send({ sessions: table.sessions });
  }

  async getTableServers(request: Request, response: Response) {
    const id = request.query.id as string;

    const table = await TableService.fetchTable(id);

    response.status(200).send({ servers: table.servers });
  }

  async addServersToTable(request: Request, response: Response) {
    const id = request.query.id as string;
    const serverIds = request.body;

    const numberOfServersAdded = await TableService.addServersToTable(
      id,
      serverIds
    );

    response.status(200).send({ numberOfServersAdded });
  }

  async removeServersFromTable(request: Request, response: Response) {
    const id = request.query.id as string;
    const serverIds = request.body;

    const numberOfServersRemoved = await TableService.removeServersFromTable(
      id,
      serverIds
    );

    response.status(200).send({ numberOfServersRemoved });
  }
}

export default new TableController();
