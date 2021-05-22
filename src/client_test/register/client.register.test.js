// REGISTER USER: WORKING
const RSA = require("node-rsa");
const axios = require("axios").default;
const fs = require("fs");

const serverPublicKey = new RSA();
const importedKey = fs.readFileSync("./keys/public_key.pem", "utf8");

console.log(importedKey);

serverPublicKey.importKey(importedKey);

const rsa = new RSA();

const keys = rsa.generateKeyPair();
const noncePublic = keys.exportKey("public");

const credentials = {
  firstName: "test",
  lastName: "test",
  email: "test@gmail.com",
  password: "123456",
  phoneNumber: "+1-778-777-777",
  noncePublicKey: noncePublic,
};

const stringCrendentials = JSON.stringify(credentials);

console.log(stringCrendentials);

const cypher = serverPublicKey.encrypt(stringCrendentials, "base64");

console.log(cypher);

axios
  .post("http://localhost:3000/user/register", {
    encryptedCrendentialsAndPublicKeyNonce: cypher,
  })
  .then((response) => {
    console.log(response);

    const encryptedResponse = response.data;

    const severDecrypt = serverPublicKey.decryptPublic(
      encryptedResponse,
      "utf8"
    );

    const message = keys.decrypt(severDecrypt, "utf8");

    console.log(message);
  })
  .catch((error) => console.log(error));
