import { Document } from "mongoose";
import { MenuItem } from "./menu_item/menu.item.type";

export interface MenuSection extends Document {
  numberOfMenuSectionItems: number;
  menuItems: [
    {
      type: MenuItem;
      required: true;
    }
  ];
}
