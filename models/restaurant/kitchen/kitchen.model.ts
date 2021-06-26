import mongoose, { Schema } from "mongoose";

const kitchenSchema = new Schema({
  orders: [
    {
      type: mongoose.Types.ObjectId, // order id
      required: true,
    },
  ],
});

const KITCHEN = kitchenSchema;

export default KITCHEN;
