import crypto, { BinaryLike } from "crypto";

// Formatting and set up for crypto
const iterations = 10000;
const keylen = 512;
const randomizerlen = 64;
const digest = "sha512";
const format = "hex";

// Creates Salt for user
const generateSalt = () => {
  return crypto.randomBytes(randomizerlen).toString(format);
};

// Creates Secret for user from password and salt
const generateSecretFromPasswordAndSalt = (password: string, salt: string) => {
  const binaryPassword: BinaryLike = password;
  const binarySalt: BinaryLike = salt;

  return crypto
    .pbkdf2Sync(binaryPassword, binarySalt, iterations, keylen, digest)
    .toString(format);
};

// Gets Salt and Secret for user creation
export const getSecretAndSalt = (password: string) => {
  const generatedSalt = generateSalt();
  const generatedSecret = generateSecretFromPasswordAndSalt(
    password,
    generatedSalt
  );

  return {
    secret: generatedSecret,
    salt: generatedSalt,
  };
};

export const isUserPasswordValid = (
  password: string,
  salt: string,
  secret: string
) => {
  const hashedSecret = crypto
    .pbkdf2Sync(password, salt, iterations, keylen, digest)
    .toString(format);

  return secret === hashedSecret;
};
