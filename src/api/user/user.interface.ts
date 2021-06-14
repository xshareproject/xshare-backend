import { Document } from "mongoose";
import { CreateUserRequest } from "../../common/types/users.types.config";
import { UserDocument } from "../../common/types/users.types.config";

export interface IUserService {
  createUser(createUserRequest: CreateUserRequest): Promise<UserDocument>;

  getUserById(id: string): Promise<UserDocument>;

  getUserByEmail(email: string): Promise<UserDocument>;

  getUserByPhoneNumber(phoneNumber: string): Promise<UserDocument>;

  getUserByPublicKey(publicKey: string): Promise<UserDocument>;

  getUserBySessionToken(sessionToken: string): Promise<UserDocument>;

  getUserByAuthToken(authToken: string): Promise<UserDocument>;

  isAuthTokenActive(user: UserDocument): boolean;

  updateUserLoginSession(
    id: string,
    sessionToken: string | null,
    expiryDate: Date | null
  ): Promise<UserDocument>;

  updateUserAuthenticationToken(
    id: string,
    authToken: string | null,
    expiryDate: Date | null
  ): Promise<UserDocument>;
}
