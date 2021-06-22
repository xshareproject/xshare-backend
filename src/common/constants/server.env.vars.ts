import RSA from "node-rsa";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

// get public and private keys
const rsaPublicKey = new RSA();
const rsaPrivateKey = new RSA();

const publicKey = fs.readFileSync("./keys/public_key.pem", "utf8");
const privateKey = fs.readFileSync("./keys/private_key.pem", "utf8");

export const serverPublicKey = rsaPublicKey.importKey(publicKey, "public");
export const serverPrivateKey = rsaPrivateKey.importKey(privateKey, "private");
export const sslKey = process.env.SSL_KEY;
