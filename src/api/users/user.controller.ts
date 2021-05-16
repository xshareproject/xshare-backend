import { Request, Response } from "express";
import { CreateUserRequest } from "../../common/types/users.types.config";
import userService from "./user.service";
import {
  GENERIC_MESSAGES,
  STATUS_CODES,
} from "../../common/constants/response.status";

class UserController {
  async createUser(request: Request, response: Response) {
    const createUserRequest: CreateUserRequest = request.body;

    const newUser = userService.createUser(createUserRequest);

    response.status(STATUS_CODES.SUCCESS).send(newUser);
  }

  async getUserGivenId(request: Request, response: Response) {
    const userId = request.params.id;

    const user = userService.getUserById(userId);

    response.status(STATUS_CODES.SUCCESS).send(user);
  }
}

export default new UserController();
