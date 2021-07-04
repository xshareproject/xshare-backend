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
}

export default new TableController();
