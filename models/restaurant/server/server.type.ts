import { Document } from "mongoose";

export interface Server extends Document {
  firstName: string;
  lastName: string;
}
