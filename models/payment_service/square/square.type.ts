import { Document } from "mongoose";

export interface SquarePaymentService extends Document {
  paymentIdentification: string;
}
