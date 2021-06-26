import { Document } from "mongoose";

export interface Payment extends Document {
  dateCreated: Date;
  data: string;
}
