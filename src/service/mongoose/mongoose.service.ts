import mongoose from "mongoose";

export const connectToMongoDatabase = () => {
  const MONGO_USER = process.env.MONGO_USER;
  const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
  const MONGO_DB = process.env.MONGO_DB;

  const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.wcu0n.mongodb.net/${MONGO_DB}?retryWrites=true&w=majority`;

  mongoose.connect(
    uri,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    (err: any) => {
      if (err) {
        console.log("Error, not connected");
      } else {
        console.log("Connected as: ", MONGO_USER, " with DB: ", MONGO_DB);
      }
    }
  );
};
