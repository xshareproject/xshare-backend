import mongoose, { Schema } from "mongoose";
import KITCHEN from "./kitchen/kitchen.model";
import MENU from "./menu/menu.model";
import SERVER from "./server/server.model";
import TABLE from "./table/table.model";
import PAYMENT_SERVICE from "../payment_service/payment.service.model";

const addressSchema = new Schema({
  addressLineOne: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  province: {
    type: String,
    required: true,
  },
  postalCode: {
    // FORM: ABC123 (no space between)
    type: String,
    required: true,
  },
});

const ADDRESS = addressSchema;

const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: ADDRESS,
    required: true,
  },
  googleMapsAddressLink: {
    type: String,
    required: false,
    default: null,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
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

const RESTAURANT = mongoose.model("Restaurant", restaurantSchema);

export default RESTAURANT;
