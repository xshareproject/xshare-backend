import qrcode from "qrcode";
import mongoose from "mongoose";

import RESTAURANT from "../../../models/restaurant/restaurant.model";
import { Restaurant } from "../../../models/restaurant/restaurant.type";
import TABLE from "../../../models/restaurant/table/table.model";
import { CreateTable, CreateTables } from "./table.types.config";

class TableService {
  async createTablesForRestaurant(
    id: string,
    tableBody: CreateTables
  ): Promise<number> {
    if (tableBody.tables.length === 0) {
      return 0;
    }

    const newTables: any[] = [];

    tableBody.tables.forEach(async (tableBody: CreateTable) => {
      const newTableId = new mongoose.Types.ObjectId().toHexString();
      const newTableQRCode = await this.generateQRCodeForTable(newTableId);

      const newTable = new TABLE({
        QRCode: newTableQRCode,
        tableId: newTableId,
        tableNumber: tableBody.tableNumber,
      });

      newTables.push(newTable);
    });

    const update: Restaurant = await RESTAURANT.findByIdAndUpdate(
      id,
      {
        $push: { tables: { $each: newTables } },
      },
      { new: true }
    );

    return update.tables.length;
  }

  async generateQRCodeForTable(tableId: string): Promise<string> {
    return await qrcode.toDataURL(tableId);
  }
}

export default new TableService();
