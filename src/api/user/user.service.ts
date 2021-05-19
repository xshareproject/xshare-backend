import { Document } from "mongoose";
import { CreateUserBody } from "../../common/types/users.types.config";
import { CRUD } from "../../common/interfaces/crud.user.interface";
import { USER } from "../../../models/User";

class UserService implements CRUD {
  async createUser(createUserBody: CreateUserBody): Promise<Document> {
    const newUser = new USER(createUserBody);

    return newUser.save();
  }

  async getUserById(id?: string): Promise<Document> {
    return USER.findById(id);
  }

  async getUserByEmail(email: string): Promise<Document> {
    return USER.findOne({ email });
  }

  async getUserByPhoneNumber(phoneNumber: string): Promise<Document> {
    return USER.findOne({ phoneNumber });
  }

  async getUserByPublicKey(publicKey: string): Promise<Document> {
    return USER.findOne({ publicKey });
  }
}

export default new UserService();
