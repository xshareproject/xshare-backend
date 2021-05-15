import { USER } from "../../models/User";
import {
  CreateUserRequest,
  isUserRequestCorrect,
} from "../api/users/users.types.config";
import { getSecretAndSalt } from "../service/authentication_service";

export const createUser = async (data: any): Promise<string> => {
  const userData: CreateUserRequest = data;

  if (!isUserRequestCorrect(userData)) {
    throw Error("User incorrect.");
  }

  const newUserSecretAndSalt = getSecretAndSalt(userData.password);

  const newUser = new USER({ ...userData, ...newUserSecretAndSalt });

  return newUser.save().then(() => {
    return "User created";
  });
};
