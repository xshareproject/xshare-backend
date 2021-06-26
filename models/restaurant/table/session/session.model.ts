import mongoose, { Schema } from "mongoose";
import CUSTOMER from "./customer/customer.model";
import ORDER from "./order/order.model";

const sessionSchema = new Schema({
  customers: [
    {
      type: CUSTOMER,
      required: true,
    },
  ],
  currentOrder: {
    type: ORDER,
    required: true,
  },
  allOrders: [
    {
      type: ORDER,
      required: true,
    },
  ],
  payments: [
    {
      type: mongoose.Types.ObjectId, // payment id
      required: true,
    },
  ],
  dateCreate: {
    type: Date,
    required: true,
  },
});

const SESSION = mongoose.model("Session", sessionSchema);

export default SESSION;
