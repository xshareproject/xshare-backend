import mongoose, { Schema } from "mongoose";

const orderModel: Schema = new Schema({
  menuItems: [
    {
      type: String, // menu item id
      required: true,
    },
  ],
  dateCreated: {
    type: Date,
    required: true,
  },
});

const ORDER = mongoose.model("Order", orderModel);

export default ORDER;
