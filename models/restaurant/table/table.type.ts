import { Document } from "mongoose";
import { Session } from "./session/session.type";

export interface Table extends Document {
  QRCode: string;
  tableId: string;
  tableNumber: number;
  sessions: Session[];
  servers: string[];
}
