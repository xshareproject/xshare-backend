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
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  secret: {
    // idk if this is what is meant by "secret (hashed password)"
    type: String, // or should I make a secret object that has the hash and salt fields?
    required: true,
    unique: true,
  },
  salt: {
    // idk if this is what is meant by "secret (hashed password)"
    type: String, // or should I make a secret object that has the hash and salt fields?
    required: true,
    unique: true,
  },
  lastUpdated: {
    type: Date,
    required: true,
    default: Date.now,
  },
  UserUUIDs: [mongoose.Types.ObjectId],
  isContact: {
    type: Boolean,
    required: true,
    default: false,
  },
});

// export interface User extends Document {
//   UUID: String;
//   firstName: String;
//   lastName: String;
//   email: String;
//   phoneNumber: String;
// }

export const user = mongoose.model("Users", userSchema);
