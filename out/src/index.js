"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
// Import Routes
const user_api_1 = require("./api/user_api");
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_DB = process.env.MONGO_DB;
const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.wcu0n.mongodb.net/${MONGO_DB}?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 9000;
const app = express_1.default();
mongoose_1.default.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    //   const collection = client.db("test").collection("devices");
    if (err) {
        console.log("Error, not connected");
        mongoose_1.default.connection
            .close()
            .then((message) => {
            console.log("Closed:", message);
        })
            .catch((message) => {
            console.log("Error on close:", message);
        });
    }
    else {
        // perform actions on the collection object
        console.log("Connected");
    }
    return;
});
app.get("/", (req, res) => {
    res.send("Hello Share");
});
app.use(body_parser_1.default.json());
app.use("/user", user_api_1.userRoute);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map