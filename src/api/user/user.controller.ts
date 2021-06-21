import { Request, Response } from "express";
import userService from "./user.service";
import { STATUS_CODES } from "../../common/constants/response.status";
import {
  CreateUserBody,
  CreateUserRequest,
} from "../../common/types/users.types.config";
import { getSecretAndSalt } from "../../service/encryption/authentication.service";
import { PublicAndPrivateKeyPair } from "../../service/encryption/encryption.types";
import encryptionService from "../../service/encryption/encryption.service";

class UserController {
  async createUser(request: Request, response: Response) {
    const createUserRequest: CreateUserRequest = request.body;

    const newUserSaltAndSecret = getSecretAndSalt(createUserRequest.password);

    const publicAndPrivateKeyPair: PublicAndPrivateKeyPair =
      encryptionService.getPublicAndPrivateKeyAsString();

    const createUserBody: CreateUserBody = {
      ...createUserRequest,
      ...newUserSaltAndSecret,
      ...{ publicKey: publicAndPrivateKeyPair.publicKey },
    };

    userService
      .createUser(createUserBody)
      .then(() => {
        response.status(STATUS_CODES.SUCCESS).send({ publicAndPrivateKeyPair });
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
