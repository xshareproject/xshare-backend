import { CreateUserRequest } from "../../common/types/users.types.config";
import { CRUD } from "../../common/interfaces/crud.user.interface";
import { USER } from "../../../models/User";

class UserService implements CRUD {
  async createUser(createUserRequest: CreateUserRequest) {
    const newUser = new USER(createUserRequest);

    return newUser.save();
  }

  async getById(id: string) {
    return USER.findById(id);
  }
}

export default new UserService();
