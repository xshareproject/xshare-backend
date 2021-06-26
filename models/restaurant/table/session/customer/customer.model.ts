import mongoose, { Schema } from "mongoose";
import USER from "../../../../user/user.model";

const customerSchema: Schema = new Schema({
  fillerName: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    required: false,
    unique: true,
  },
});

const CUSTOMER = mongoose.model("Customer", customerSchema);

export default CUSTOMER;
