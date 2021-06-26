import RSA from "node-rsa";
import { PublicAndPrivateKeyPair } from "./encryption.types";
import {
  serverPrivateKey,
  serverPublicKey,
} from "../../common/constants/env.vars";
import userService from "../../api/user/user.service";

class EncprytionService {
  private generatePublicAndPrivateKeys(): RSA {
    return new RSA().generateKeyPair();
  }

  getPublicAndPrivateKeyAsString(): PublicAndPrivateKeyPair {
    const generatedRSAKey: RSA = this.generatePublicAndPrivateKeys();

    const privateKey = generatedRSAKey.exportKey("private");
    const publicKey = generatedRSAKey.exportKey("public");

    return {
      publicKey,
      privateKey,
    };
  }

  decryptMessageWithSeverPublicKey(encryptedMessage: string): string {
    const decryptedMessage: string = serverPublicKey.decryptPublic(
      encryptedMessage,
      "utf8"
    );

    return decryptedMessage;
  }

  decryptMessageWithServerPrivateKey(encryptedMessage: string): string {
    const decryptedMessage: string = serverPrivateKey.decrypt(
      encryptedMessage,
      "utf8"
    );

    return decryptedMessage;
  }

  encryptMessageWithServerPublicKey(message: string): string {
    const encryptedMessage: string = serverPublicKey.encrypt(message, "base64");

    return encryptedMessage;
  }

  encryptMessageWithServerPrivateKey(message: string): string {
    const encryptedMessage: string = serverPrivateKey.encryptPrivate(
      message,
      "base64"
    );

    return encryptedMessage;
  }

  async decryptMessageWithClientPublicKey(
    encryptedMessage: string,
    userId: string
  ) {
    const user = await userService.getUserById(userId);

    const userPublicKey: string = user.publicKey;

    const publicKey = new RSA();

    publicKey.importKey(userPublicKey);

    const decryptedMessage: string = publicKey.decryptPublic(
      encryptedMessage,
      "utf8"
    );

    return decryptedMessage;
  }

  async encryptMessageWithClientPublicKey(
    message: string,
    userId: string
  ): Promise<string> {
    const user = await userService.getUserById(userId);

    const userPublicKey: string = user.publicKey;

    const publicKey = new RSA();

    publicKey.importKey(userPublicKey);

    const encryptedMessage: string = publicKey.encrypt(message, "base64");

    return encryptedMessage;
  }

  encryptMessageGivenPublicKey(
    message: string,
    publicKeyString: string
  ): string {
    const publicKey = new RSA();

    publicKey.importKey(publicKeyString);

    const encryptedMessage: string = publicKey.encrypt(message, "base64");

    return encryptedMessage;
  }
}

export default new EncprytionService();
