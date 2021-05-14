import { user } from "../../models/User";
import {
  CreateUserRequest,
  isUserRequestCorrect,
} from "../../types/user_types";
import { getSecretAndSalt } from "../service/authentication_service";

export const createUser = async (data: any): Promise<string> => {
  const userData: CreateUserRequest = data;

  if (!isUserRequestCorrect(userData)) {
    throw Error("User incorrect.");
  }

  const newUserSecretAndSalt = getSecretAndSalt(userData.password);

  const newUser = new user({ ...userData, ...newUserSecretAndSalt });

  return newUser.save().then(() => {
    return "User created";
  });
};
