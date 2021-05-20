import RSA from "node-rsa";
import { PublicAndPrivateKeyPair } from "./encryption.types";

class EncprytionService {
  private generatePublicAndPrivateKeys(): RSA {
    return new RSA().generateKeyPair();
  }

  getPublicAndPrivateKeyInHexFormat(): PublicAndPrivateKeyPair {
    const generatedRSAKey: RSA = this.generatePublicAndPrivateKeys();

    const privateKey = generatedRSAKey.exportKey("private");
    const publicKey = generatedRSAKey.exportKey("public");

    const publicAndPrivateKeyPair: PublicAndPrivateKeyPair = {
      publicKey,
      privateKey,
    };

    return publicAndPrivateKeyPair;
  }

  decryptMessageWithPublicKey(
    encryptedMessage: string,
    publicKey: string
  ): string {
    const publicKeyRSA: RSA = new RSA();
    publicKeyRSA.importKey(publicKey, "public");

    const decryptedMessage: Buffer =
      publicKeyRSA.decryptPublic(encryptedMessage);

    return decryptedMessage.toString();
  }

  decryptMessageWithPrivateKey(
    encryptedMessage: string,
    privateKey: string
  ): string {
    const privateKeyRSA: RSA = new RSA();
    privateKeyRSA.importKey(privateKey, "private");

    const decryptedMessage: Buffer = privateKeyRSA.decrypt(encryptedMessage);

    return decryptedMessage.toString();
  }

  encryptMessageWithPublicKey(message: string, publicKey: string): string {
    const publicKeyRSA: RSA = new RSA();
    publicKeyRSA.importKey(publicKey, "public");

    const encryptedMessage: Buffer = publicKeyRSA.encrypt(message);

    return encryptedMessage.toString();
  }

  encryptMessageWithPrivateKey(message: string, privateKey: string): string {
    const privateKeyRSA: RSA = new RSA();
    privateKeyRSA.importKey(privateKey, "private");

    const encryptedMessage: Buffer = privateKeyRSA.encryptPrivate(message);

    return encryptedMessage.toString();
  }
}

export default new EncprytionService();
