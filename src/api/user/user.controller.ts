import { Request, Response } from "express";
import {
  CreateUserBody,
  CreateUserRequest,
} from "../../common/types/users.types.config";
import userService from "./user.service";
import { STATUS_CODES } from "../../common/constants/response.status";
import { getSecretAndSalt } from "../../service/authentication_service";

class UserController {
  async createUser(request: Request, response: Response) {
    const createUserRequest: CreateUserRequest = request.body;

    const newUserSaltAndSecret = getSecretAndSalt(createUserRequest.password);

    const createUserBody: CreateUserBody = {
      ...createUserRequest,
      ...newUserSaltAndSecret,
    };

    const newUser = await userService.createUser(createUserBody);

    response.status(STATUS_CODES.SUCCESS).send(newUser);
  }

  async getUserGivenId(request: Request, response: Response) {
    const userId: string | undefined = String(request.query.id);

    const user = await userService.getUserById(userId);

    response.status(STATUS_CODES.SUCCESS).send(user);
  }
}

export default new UserController();
