import mongoose, { Schema } from "mongoose";
import ORDER from "../table/session/order/order.model";

const kitchenSchema = new Schema({
  orders: [
    {
      type: mongoose.Types.ObjectId, // order id
      required: true,
    },
  ],
});

const KITCHEN = kitchenSchema;

export default KITCHEN;
