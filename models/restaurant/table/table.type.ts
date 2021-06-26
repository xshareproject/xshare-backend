import { Document } from "mongoose";
import { Session } from "./session/session.type";

export interface Table extends Document {
  QRCode: string;
  sessions: Session[];
  server: string;
}
