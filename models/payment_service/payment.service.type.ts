import { Document } from "mongoose";
import { PaymentType } from "./payment.service.model";
import { SharePaymentService } from "./share/share.type";
import { SquarePaymentService } from "./square/square.type";

export interface PaymentService extends Document {
  type: PaymentType;
  sharePayment: SharePaymentService;
  squarePayment: SquarePaymentService;
}
