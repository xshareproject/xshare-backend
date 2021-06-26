import { Document } from "mongoose";

export interface Kitchen extends Document {
  orders: string[];
}
