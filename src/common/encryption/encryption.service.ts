const {
  generateKeyPairSync,
  privateDecrypt,
  privateEncrypt,
  publicDecrypt,
  publicEncrypt,
} = await import("crypto");
import { PublicAndPrivateKeyPair } from "./encryption.types";

class EncprytionService {
  private generatePublicAndPrivateKeys() {
    const options: object = {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: "spki",
        format: "pem",
      },
      privateKeyEncoding: {
        type: "pkcs8",
        format: "pem",
        cipher: "aes-256-cbc",
        passphrase: "top secret",
      },
    };

    return generateKeyPairSync("x448", options);
  }

  getPublicAndPrivateKeyInHexFormat(): PublicAndPrivateKeyPair {
    const publicAndPrivateKeyObject = this.generatePublicAndPrivateKeys();

    const privateKeyBuffer = publicAndPrivateKeyObject.privateKey.export();
    const publicKeyBuffer = publicAndPrivateKeyObject.publicKey.export();

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
    const decryptedMessage: Buffer = publicDecrypt(
      publicKey,
      Buffer.from(encryptedMessage)
    );

    return decryptedMessage.toString();
  }

  decryptMessageWithPrivateKey(
    encryptedMessage: string,
    privateKey: string
  ): string {
    const decryptedMessage: Buffer = privateDecrypt(
      privateKey,
      Buffer.from(encryptedMessage)
    );

    return decryptedMessage.toString();
  }

  encryptMessageWithPublicKey(message: string, publicKey: string): string {
    const encryptedMessage: Buffer = publicEncrypt(
      publicKey,
      Buffer.from(message)
    );

    return encryptedMessage.toString();
  }

  encryptMessageWithPrivateKey(message: string, privateKey: string): string {
    const encryptedMessage: Buffer = privateEncrypt(
      privateKey,
      Buffer.from(message)
    );

    return encryptedMessage.toString();
  }
}

export default new EncprytionService();
