// LOGIN USER
const RSA = require("node-rsa");
const axios = require("axios").default;
const fs = require("fs");

const serverPublicKey = new RSA();
const clientPrivate = new RSA();
const clientPublic = new RSA();
let importedKey = fs.readFileSync("../../../keys/public_key.pem", "utf8");

console.log(importedKey);

serverPublicKey.importKey(importedKey);

importedKey = fs.readFileSync("./keys/private_key.pem", "utf8");

clientPrivate.importKey(importedKey);

importedKey = fs.readFileSync("./keys/public_key.pem", "utf8");

clientPublic.importKey(importedKey);

let globalAuthToken;

const getSessionToken = async () => {
  const body = { publicKey: importedKey };

  return axios
    .post("http://localhost:3000/auth/session", {
      encryptedClientPublicKey: serverPublicKey.encrypt(
        JSON.stringify(body),
        "base64"
      ),
    })
    .then((response) => {
      console.log(response.data);

      const body = response.data.encryptedSessionToken;

      const serverDecrypt = serverPublicKey.decryptPublic(body, "utf8");

      console.log(serverDecrypt);

      const sessionToken = clientPrivate.decrypt(serverDecrypt, "utf8");

      console.log("sessionToken: ", sessionToken);

      return sessionToken;
    })
    .catch((error) => console.log(error));
};

const sendCredentials = async (sessionToken) => {
  const body = {
    sessionToken: sessionToken, // session token accessible after server decrypt with server private
    credentials: clientPrivate.encryptPrivate(
      JSON.stringify({
        email: "test@gmail.com",
        password: "123456",
      }),
      "base64"
    ),
  };

  return axios
    .post("http://localhost:3000/auth/login", {
      encryptedCredentials: serverPublicKey.encrypt(
        JSON.stringify(body),
        "base64"
      ),
    })
    .then((response) => {
      console.log(response.data);

      const body = response.data.encryptedAuthenticationToken;

      const serverDecrypt = serverPublicKey.decryptPublic(body, "utf8");

      const authToken = clientPrivate.decrypt(serverDecrypt, "utf8");

      console.log("authToken: ", authToken);

      return authToken;
    })
    .catch((error) => console.log(error));
};

const completeLogin = async (sessionToken) => {
  return axios
    .post("http://localhost:3000/auth/complete", {
      encryptedSessionToken: serverPublicKey.encrypt(
        JSON.stringify(sessionToken),
        "base64"
      ),
    })
    .then((response) => {
      console.log(response.status);
      console.log(response.data);

      return;
    })
    .catch((error) => console.log(error));
};

const login = async () => {
  const newSessionToken = await getSessionToken();

  const authToken = await sendCredentials(newSessionToken);

  globalAuthToken = authToken;

  const complete = await completeLogin(newSessionToken);
};

login();
