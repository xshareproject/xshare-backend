import { Document } from "mongoose";

export interface MenuItem extends Document {
  name: string;
  description: string;
  price: number;
  lastUpdated: Date;
}
