import { CreateUserBody } from "../../common/types/users.types.config";
import { CRUD } from "../../common/interfaces/crud.user.interface";
import { USER } from "../../../models/User";

class UserService implements CRUD {
  async createUser(createUserBody: CreateUserBody) {
    const newUser = new USER(createUserBody);

    return newUser.save();
  }

  async getUserById(id?: string) {
    return USER.findById(id);
  }

  async getUserByEmail(email: string) {
    return USER.findOne({ email });
  }

  async getUserByPhoneNumber(phoneNumber: string) {
    return USER.findOne({ phoneNumber });
  }
}

export default new UserService();
