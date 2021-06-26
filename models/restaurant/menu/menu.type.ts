import { Document } from "mongoose";
import { MenuSection } from "./menu_section/menu.section.type";

export interface Menu extends Document {
  numberOfMenuItems: number;
  sections: MenuSection[];
  lastUpdated: Date;
}
