"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const User_1 = require("../../models/User");
const user_types_1 = require("../../types/user_types");
const authentication_service_1 = require("../service/authentication_service");
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = data;
    if (!user_types_1.isUserRequestCorrect(userData)) {
        throw Error("User incorrect.");
    }
    const newUserSecretAndSalt = authentication_service_1.getSecretAndSalt(userData.password);
    const newUser = new User_1.user(Object.assign(Object.assign({}, userData), newUserSecretAndSalt));
    return newUser.save().then(() => {
        return "User created";
    });
});
exports.createUser = createUser;
//# sourceMappingURL=user_db.js.map