import { Document } from "mongoose";

export interface Order extends Document {
  menuItems: String[];
  dateCreated: Date;
}
