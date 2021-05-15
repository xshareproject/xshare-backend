"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = __importDefault(require("express"));
const user_db_1 = require("../db/user_db");
const router = express_1.default.Router();
router.post("/", (req, res) => {
    user_db_1.createUser(req.body)
        .then((result) => {
        res.status(200).send(result);
    })
        .catch((error) => {
        res.status(500).send(error.message);
    });
});
exports.userRoute = router;
//# sourceMappingURL=user_api.js.map