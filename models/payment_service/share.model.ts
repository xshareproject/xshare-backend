import mongoose, { Schema } from "mongoose";

const shareSchema: Schema = new Schema({
  paymentIdentification: {
    type: String,
    required: true,
  },
});

const SHARE_PAYMENT_SERVICE = shareSchema;

export default SHARE_PAYMENT_SERVICE;
