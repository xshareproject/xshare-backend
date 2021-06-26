import mongoose, { Schema } from "mongoose";

const squareSchema: Schema = new Schema({
  paymentIdentification: {
    type: String,
    required: true,
  },
});

const SQUARE_PAYMENT_SERVICE = squareSchema;

export default SQUARE_PAYMENT_SERVICE;
