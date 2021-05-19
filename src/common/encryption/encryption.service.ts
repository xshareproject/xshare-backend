import crypto, { KeyPairKeyObjectResult } from "crypto";
import { PublicAndPrivateKeyPair } from "./encryption.types";

class EncprytionService {
  private generatePublicAndPrivateKeys(): KeyPairKeyObjectResult {
    return crypto.generateKeyPairSync("rsa", { modulusLength: 64 });
  }

  getPublicAndPrivateKeyInHexFormat(): PublicAndPrivateKeyPair {
    const publicAndPrivateKeyObject: KeyPairKeyObjectResult =
      this.generatePublicAndPrivateKeys();

    const privateKeyBuffer: Buffer =
      publicAndPrivateKeyObject.privateKey.export();
    const publicKeyBuffer: Buffer =
      publicAndPrivateKeyObject.publicKey.export();

    const publicAndPrivateKeyPair: PublicAndPrivateKeyPair = {
      publicKey: publicKeyBuffer.toString("hex"),
      privateKey: privateKeyBuffer.toString("hex"),
    };

    return publicAndPrivateKeyPair;
  }

  decryptMessageWithPublicKey(
    encryptedMessage: string,
    publicKey: string
  ): string {
    const decryptedMessage: Buffer = crypto.publicDecrypt(
      publicKey,
      Buffer.from(encryptedMessage)
    );

    return decryptedMessage.toString();
  }

  decryptMessageWithPrivateKey(
    encryptedMessage: string,
    privateKey: string
  ): string {
    const decryptedMessage: Buffer = crypto.privateDecrypt(
      privateKey,
      Buffer.from(encryptedMessage)
    );

    return decryptedMessage.toString();
  }

  encryptMessageWithPublicKey(message: string, publicKey: string): string {
    const encryptedMessage: Buffer = crypto.publicEncrypt(
      publicKey,
      Buffer.from(message)
    );

    return encryptedMessage.toString();
  }

  encryptMessageWithPrivateKey(message: string, privateKey: string): string {
    const encryptedMessage: Buffer = crypto.privateEncrypt(
      privateKey,
      Buffer.from(message)
    );

    return encryptedMessage.toString();
  }
}

export default new EncprytionService();
