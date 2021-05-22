import {
  CreateUserBody,
  UserDocument,
} from "../../common/types/users.types.config";
import { CRUD } from "../../common/interfaces/crud.user.interface";
import { USER } from "../../../models/User";

class UserService implements CRUD {
  async createUser(createUserBody: CreateUserBody): Promise<UserDocument> {
    const newUser = new USER(createUserBody);

    return newUser.save();
  }

  async getUserById(id?: string): Promise<UserDocument> {
    return USER.findById(id);
  }

  async getUserByEmail(email: string): Promise<UserDocument> {
    return USER.findOne({ email });
  }

  async getUserByPhoneNumber(phoneNumber: string): Promise<UserDocument> {
    return USER.findOne({ phoneNumber });
  }

  async getUserByPublicKey(publicKey: string): Promise<UserDocument> {
    return USER.findOne({ publicKey });
  }

  async getUserBySessionToken(sessionToken: string): Promise<UserDocument> {
    return USER.findOne({ session: { token: sessionToken } });
  }
}

export default new UserService();
