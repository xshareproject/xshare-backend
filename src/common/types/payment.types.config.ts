import { PaymentType } from "../../../models/payment_service/payment.service.model";
import mongoose from "mongoose";

export interface PaymentData {
  amount: number;
  restaurant: mongoose.Types.ObjectId;
  table: mongoose.Types.ObjectId;
  session: mongoose.Types.ObjectId;
  order: mongoose.Types.ObjectId;
  paymentServiceUsed: PaymentType;
}
