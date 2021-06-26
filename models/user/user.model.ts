import mongoose, { Schema } from "mongoose";

const userSchema: Schema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  secret: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  lastUpdated: {
    type: Date,
    required: true,
    default: Date.now, // In UTC date
  },
  userUUIDs: [{ type: mongoose.Types.ObjectId }],
  isContact: {
    type: Boolean,
    required: true,
    default: false,
  },
  session: {
    token: {
      type: String,
      required: false,
      default: null,
    },
    expiryDate: {
      type: Date,
      required: false,
      default: null,
    },
  },
  auth: {
    token: {
      type: String,
      required: false,
      default: null,
    },
    expiryDate: {
      type: Date,
      required: false,
      default: null,
    },
  },
  publicKey: {
    type: String,
    required: true,
  },
});

const USER = mongoose.model("Users", userSchema);

export default USER;
