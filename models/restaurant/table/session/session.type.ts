import { Document } from "mongoose";
import { Customer } from "./customer/customer.type";
import { Order } from "./order/order.type";

export interface Session extends Document {
  customers: Customer[];
  currentOrder: Order[];
  payments: string[];
  dateCreate: Date;
}
