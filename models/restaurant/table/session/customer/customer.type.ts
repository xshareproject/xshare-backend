import { Document } from "mongoose";

export interface Customer extends Document {
  fillerName: string;
  dateCreated: Date;
  user?: string;
}
