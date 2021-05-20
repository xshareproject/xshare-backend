import { Request, Response } from "express";
import {
  CreateUserBody,
  CreateUserRequest,
} from "../../common/types/users.types.config";
import userService from "./user.service";
import encryptionService from "../../common/encryption/encryption.service";
import { STATUS_CODES } from "../../common/constants/response.status";
import { getSecretAndSalt } from "../../common/encryption/authentication_service";
import { PublicAndPrivateKeyPair } from "../../common/encryption/encryption.types";
import { serverPrivateKey } from "../../common/constants/server.env.vars";

class UserController {
  createUser(request: Request, response: Response) {
    const createUserRequest: CreateUserRequest = request.body;
    const clientNoncePublicKey: string = request.body.noncePublicKey;

    const newUserSaltAndSecret = getSecretAndSalt(createUserRequest.password);

    const publicAndPrivateKeyPair: PublicAndPrivateKeyPair =
      encryptionService.getPublicAndPrivateKeyInHexFormat();

    const createUserBody: CreateUserBody = {
      ...createUserRequest,
      ...newUserSaltAndSecret,
      ...{ publicKey: publicAndPrivateKeyPair.publicKey },
    };

    const newUserRequest = userService.createUser(createUserBody);

    const encryptedUserKeysWithClientNoncePublicKey: string =
      encryptionService.encryptMessageWithPublicKey(
        JSON.stringify(publicAndPrivateKeyPair),
        clientNoncePublicKey
      );

    const encryptedUserKeysWithServerPrivateKey: string =
      encryptionService.encryptMessageWithPrivateKey(
        encryptedUserKeysWithClientNoncePublicKey,
        serverPrivateKey!
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
