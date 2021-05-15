import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
dotenv.config();
// Import Routes
import { userRoute } from "./api/user_api";

const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_DB = process.env.MONGO_DB;

const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.wcu0n.mongodb.net/${MONGO_DB}?retryWrites=true&w=majority`;

const PORT = process.env.PORT || 9000;
const app = express();

mongoose.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err: any) => {
    //   const collection = client.db("test").collection("devices");
    if (err) {
      console.log("Error, not connected");
      mongoose.connection
        .close()
        .then((message: any) => {
          console.log("Closed:", message);
        })
        .catch((message: any) => {
          console.log("Error on close:", message);
        });
    } else {
      // perform actions on the collection object
      console.log("Connected");
    }
    return;
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
