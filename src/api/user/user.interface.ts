import { User } from "../../../models/user/user.type";
import { CreateUserRequest } from "./users.types.config";

export interface IUserService {
  createUser(createUserRequest: CreateUserRequest): Promise<User>;

  getUserById(id: string): Promise<User>;

  getUserByEmail(email: string): Promise<User>;

  getUserByPhoneNumber(phoneNumber: string): Promise<User>;

  getUserByPublicKey(publicKey: string): Promise<User>;

  getUserBySessionToken(sessionToken: string): Promise<User>;

  getUserByAuthToken(authToken: string): Promise<User>;

  isAuthTokenActive(user: User): boolean;

  updateUserLoginSession(
    id: string,
    sessionToken: string | null,
    expiryDate: Date | null
  ): Promise<User>;

  updateUserAuthenticationToken(
    id: string,
    authToken: string | null,
    expiryDate: Date | null
  ): Promise<User>;
}
