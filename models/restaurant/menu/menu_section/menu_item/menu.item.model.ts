import { Schema } from "mongoose";

const menuItemSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  lastUpdated: {
    type: Date,
    required: true,
  },
});

const MENU_ITEM = menuItemSchema;

export default MENU_ITEM;
