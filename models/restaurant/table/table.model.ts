import mongoose, { Schema } from "mongoose";
import SESSION from "./session/session.model";

const tableSchema = new Schema({
  QRCode: {
    type: String,
    required: true,
    unique: true,
  },
  tableId: {
    type: mongoose.Types.ObjectId,
    required: true,
    unique: true,
  },
  tableNumber: {
    type: Number,
    required: true,
  },
  sessions: [
    {
      type: SESSION,
      required: true,
      unique: true,
    },
  ],
  servers: [
    {
      type: mongoose.Types.ObjectId, // server id
      required: true,
    },
  ],
});

const TABLE = mongoose.model("Table", tableSchema);

export default TABLE;
