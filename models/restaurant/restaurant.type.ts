import { PaymentService } from "../payment_service/payment.service.type";
import { Document } from "mongoose";
import { Kitchen } from "./kitchen/kitchen.type";
import { Menu } from "./menu/menu.type";
import { Server } from "./server/server.type";
import { Table } from "./table/table.type";

export interface Restaurant extends Document {
  name: string;
  address: string;
  googleMapsAddressLink: string;
  tables: Table[];
  servers: Server[];
  menus: Menu[];
  kitchen: Kitchen[];
  paymentService: PaymentService;
}
