import { Document } from "mongoose";
import { PaymentType } from "./payment.service.model";
import { SharePaymentService } from "./share.type";
import { SquarePaymentService } from "./square.type";

export interface PaymentService extends Document {
  type: PaymentType;
  sharePayment: SharePaymentService;
  squarePayment: SquarePaymentService;
}
