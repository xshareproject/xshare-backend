// LOGIN USER
const RSA = require("node-rsa");
const axios = require("axios").default;
const fs = require("fs");

const serverPublicKey = new RSA();
const importedKey = fs.readFileSync("./keys/public_key.pem", "utf8");

console.log(importedKey);

serverPublicKey.importKey(importedKey);
