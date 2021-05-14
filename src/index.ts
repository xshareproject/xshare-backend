import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
dotenv.config();
// Import Routes
import { userRoute } from "./api/user_api";

const PORT = process.env.PORT || 9000;
const app = express();

const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_DB = process.env.MONGO_DB;
const uri: string = `mongodb+srv://erica_db:ericaGhost246@cluster0.wcu0n.mongodb.net/erica_db?retryWrites=true&w=majority`;

console.log(MONGO_DB, MONGO_PASSWORD, MONGO_USER, uri);

mongoose.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err: any) => {
    //   const collection = client.db("test").collection("devices");
    if (err) {
      console.log("Error, not connected");
    } else {
      // perform actions on the collection object
      console.log("Connected");
    }
  }
);

app.get("/", (req, res) => {
  res.send("Hello Share");
});

app.use(bodyParser.json());

app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
