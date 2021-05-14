"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const userSchema = new mongoose_1.Schema({
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
        type: String,
        required: true,
        unique: true,
    },
    salt: {
        // idk if this is what is meant by "secret (hashed password)"
        type: String,
        required: true,
        unique: true,
    },
    lastUpdated: {
        type: Date,
        required: true,
        default: Date.now,
    },
    UserUUIDs: [mongoose_1.default.Types.ObjectId],
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
exports.user = mongoose_1.default.model("Users", userSchema);
//# sourceMappingURL=User.js.map