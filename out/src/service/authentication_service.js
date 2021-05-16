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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aGVudGljYXRpb25fc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlL2F1dGhlbnRpY2F0aW9uX3NlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsb0RBQTRDO0FBRTVDLG1DQUFtQztBQUNuQyxNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUM7QUFDekIsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDO0FBQ25CLE1BQU0sYUFBYSxHQUFHLEVBQUUsQ0FBQztBQUN6QixNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUM7QUFDeEIsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDO0FBRXJCLHdCQUF3QjtBQUN4QixNQUFNLFlBQVksR0FBRyxHQUFHLEVBQUU7SUFDeEIsT0FBTyxnQkFBTSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDNUQsQ0FBQyxDQUFDO0FBRUYsaURBQWlEO0FBQ2pELE1BQU0saUNBQWlDLEdBQUcsQ0FBQyxRQUFnQixFQUFFLElBQVksRUFBRSxFQUFFO0lBQzNFLE1BQU0sY0FBYyxHQUFlLFFBQVEsQ0FBQztJQUM1QyxNQUFNLFVBQVUsR0FBZSxJQUFJLENBQUM7SUFFcEMsT0FBTyxnQkFBTTtTQUNWLFVBQVUsQ0FBQyxjQUFjLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDO1NBQ2xFLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN0QixDQUFDLENBQUM7QUFFRix5Q0FBeUM7QUFDbEMsTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLFFBQWdCLEVBQUUsRUFBRTtJQUNuRCxNQUFNLGFBQWEsR0FBRyxZQUFZLEVBQUUsQ0FBQztJQUNyQyxNQUFNLGVBQWUsR0FBRyxpQ0FBaUMsQ0FDdkQsUUFBUSxFQUNSLGFBQWEsQ0FDZCxDQUFDO0lBRUYsT0FBTztRQUNMLE1BQU0sRUFBRSxlQUFlO1FBQ3ZCLElBQUksRUFBRSxhQUFhO0tBQ3BCLENBQUM7QUFDSixDQUFDLENBQUM7QUFYVyxRQUFBLGdCQUFnQixvQkFXM0IifQ==