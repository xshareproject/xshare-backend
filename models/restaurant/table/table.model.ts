import mongoose, { Schema } from "mongoose";
import SESSION from "./session/session.model";

const tableSchema = new Schema({
  QRCode: {
    type: String,
    required: true,
    unique: true,
  },
  sessions: [
    {
      type: SESSION,
      required: true,
      unique: true,
    },
  ],
  server: [
    {
      type: mongoose.Types.ObjectId, // server id
      required: true,
    },
  ],
});

const TABLE = tableSchema;

export default TABLE;
