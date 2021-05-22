import { Request, Response } from "express";
import userService from "./user.service";
import { STATUS_CODES } from "../../common/constants/response.status";
import {
  CreateUserBody,
  CreateUserRequest,
  UserDocument,
} from "../../common/types/users.types.config";
import { getSecretAndSalt } from "../../common/encryption/authentication_service";
import { PublicAndPrivateKeyPair } from "../../common/encryption/encryption.types";
import encryptionService from "../../common/encryption/encryption.service";

class UserController {
  async createUser(request: Request, response: Response) {
    const createUserRequest: CreateUserRequest = request.body;
    const clientNoncePublicKey: string = request.body.noncePublicKey;

    const newUserSaltAndSecret = getSecretAndSalt(createUserRequest.password);

    const publicAndPrivateKeyPair: PublicAndPrivateKeyPair =
      encryptionService.getPublicAndPrivateKeyAsString();

    const createUserBody: CreateUserBody = {
      ...createUserRequest,
      ...newUserSaltAndSecret,
      ...{ publicKey: publicAndPrivateKeyPair.publicKey },
    };

    const newUserRequest: Promise<UserDocument> =
      userService.createUser(createUserBody);

    const encryptedUserKeysWithClientNoncePublicKey: string =
      encryptionService.encryptMessageGivenPublicKey(
        JSON.stringify(publicAndPrivateKeyPair),
        clientNoncePublicKey
      );

    const encryptedUserKeysWithServerPrivateKey: string =
      encryptionService.encryptMessageWithServerPrivateKey(
        encryptedUserKeysWithClientNoncePublicKey
      );

    newUserRequest
      .then(() => {
        response
          .status(STATUS_CODES.SUCCESS)
          .send(encryptedUserKeysWithServerPrivateKey);
      })
      .catch((error) => console.log(error));
  }

  async getUserGivenId(request: Request, response: Response) {
    const userId: string | undefined = String(request.query.id);

    const user = await userService.getUserById(userId);

    response.status(STATUS_CODES.SUCCESS).send(user);
  }
}

export default new UserController();
