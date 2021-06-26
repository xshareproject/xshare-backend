import { Document } from "mongoose";

export interface SharePaymentService extends Document {
  paymentIdentification: string;
}
