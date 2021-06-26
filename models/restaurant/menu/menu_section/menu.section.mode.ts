import { Schema } from "mongoose";
import MENU_ITEM from "./menu_item/menu.item.model";

const menuSectionSchema: Schema = new Schema({
  numberOfMenuSectionItems: {
    type: Number,
    required: true,
  },
  menuItems: [
    {
      type: MENU_ITEM,
      required: true,
    },
  ],
});

const MENU_SECTION = menuSectionSchema;

export default MENU_SECTION;
