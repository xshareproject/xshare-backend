import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema({
  dateCreated: {
    type: Date,
    required: true,
  },
  data: {
    type: String,
    required: true,
  },
});

const PAYMENT = mongoose.model("Payment", paymentSchema);

export default PAYMENT;
