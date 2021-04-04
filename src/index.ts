import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.wcu0n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err: any) => {
    //   const collection = client.db("test").collection("devices");
    //   perform actions on the collection object
    if (err) {
        console.log("Error, not connected");
        mongoose.connection.close().then((message: any) => {
          console.log("Closed:", message);
        }).catch((message: any) => {
            console.log("Error on close:", message);
        });
    } else {
        console.log("Connected");
    }

    return;
});