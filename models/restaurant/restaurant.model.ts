import mongoose, { Schema } from "mongoose";
import KITCHEN from "./kitchen/kitchen.model";
import MENU from "./menu/menu.model";
import SERVER from "./server/server.model";
import TABLE from "./table/table.model";
import PAYMENT_SERVICE from "../payment_service/payment.service.model";

const restaurantSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  googleMapsAddressLink: {
    type: String,
    required: true,
  },
  tables: [
    {
      type: TABLE,
      required: true,
    },
  ],
  servers: [
    {
      type: SERVER,
      required: true,
    },
  ],
  menus: [
    {
      type: MENU,
      required: true,
    },
  ],
  kitchen: {
    type: KITCHEN,
    required: true,
  },
  paymentService: {
    type: PAYMENT_SERVICE,
    required: true,
  },
});

export const RESTAURANT = mongoose.model("Restaurant", restaurantSchema);
