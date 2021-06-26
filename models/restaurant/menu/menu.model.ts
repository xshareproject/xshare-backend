import { Schema } from "mongoose";
import MENU_SECTION from "./menu_section/menu.section.model";

const menuSchema = new Schema({
  numberOfMenuItems: {
    type: Number,
    required: true,
  },
  sections: [
    {
      type: MENU_SECTION,
      required: true,
    },
  ],
  lastUpdated: {
    type: Date,
    required: true,
  },
});

const MENU = menuSchema;

export default MENU;
