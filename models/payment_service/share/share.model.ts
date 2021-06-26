import mongoose, { Schema } from "mongoose";

const shareSchema = new Schema({
  paymentIdentification: {
    type: String,
    required: true,
  },
});

const SHARE_PAYMENT_SERVICE = shareSchema;

export default SHARE_PAYMENT_SERVICE;
