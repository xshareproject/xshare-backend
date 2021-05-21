import RSA from "node-rsa";
import fs from "fs";

// get public and private keys
const rsaPublicKey = new RSA();
const rsaPrivateKey = new RSA();

const publicKey = fs.readFileSync("./keys/public_key.pem", "utf8");
const privateKey = fs.readFileSync("./keys/private_key.pem", "utf8");

rsaPublicKey.importKey(publicKey);
rsaPrivateKey.importKey(privateKey);

export const serverPublicKey = rsaPublicKey.exportKey("public");
export const serverPrivateKey = rsaPrivateKey.exportKey("private");
