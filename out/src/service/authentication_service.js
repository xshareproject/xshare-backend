"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSecretAndSalt = void 0;
const crypto_1 = __importDefault(require("crypto"));
// Formatting and set up for crypto
const iterations = 10000;
const keylen = 512;
const randomizerlen = 64;
const digest = "sha512";
const format = "hex";
// Creates Salt for user
const generateSalt = () => {
    return crypto_1.default.randomBytes(randomizerlen).toString(format);
};
// Creates Secret for user from password and salt
const generateSecretFromPasswordAndSalt = (password, salt) => {
    const binaryPassword = password;
    const binarySalt = salt;
    return crypto_1.default
        .pbkdf2Sync(binaryPassword, binarySalt, iterations, keylen, digest)
        .toString(format);
};
// Gets Salt and Secret for user creation
const getSecretAndSalt = (password) => {
    const generatedSalt = generateSalt();
    const generatedSecret = generateSecretFromPasswordAndSalt(password, generatedSalt);
    return {
        secret: generatedSecret,
        salt: generatedSalt,
    };
};
exports.getSecretAndSalt = getSecretAndSalt;
//# sourceMappingURL=authentication_service.js.map