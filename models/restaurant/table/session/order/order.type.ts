import { MenuItem } from "../../../../restaurant/menu/menu_section/menu_item/menu.item.type";
import { Document } from "mongoose";

export interface Order extends Document {
  menuItems: MenuItem[];
  dateCreated: Date;
}
