import moment from "moment";

import { UserDocument } from "../../../models/user/user.type";
import { CreateUserBody } from "../../common/types/users.types.config";
import { IUserService } from "./user.interface";
import USER from "../../../models/user/user.model";

class UserService implements IUserService {
  public async createUser(
    createUserBody: CreateUserBody
  ): Promise<UserDocument> {
    const newUser = new USER(createUserBody);

    return newUser.save();
  }

  public async getUserById(id?: string): Promise<UserDocument> {
    return USER.findById(id);
  }

  public async getUserByEmail(email: string): Promise<UserDocument> {
    return USER.findOne({ email });
  }

  public async getUserByPhoneNumber(
    phoneNumber: string
  ): Promise<UserDocument> {
    return USER.findOne({ phoneNumber });
  }

  public async getUserByPublicKey(publicKey: string): Promise<UserDocument> {
    return USER.findOne({ publicKey });
  }

  public async getUserBySessionToken(
    sessionToken: string
  ): Promise<UserDocument> {
    return USER.findOne({ "session.token": sessionToken });
  }

  public async getUserByAuthToken(authToken: string): Promise<UserDocument> {
    return USER.findOne({ "auth.token": authToken });
  }

  public isAuthTokenActive(user: UserDocument): boolean {
    const expiryDate = moment(new Date(user.auth.expiryDate).toISOString());
    const currentMoment = moment();

    return expiryDate.isBefore(currentMoment);
  }

  public async updateUserLoginSession(
    id: string,
    sessionToken: string | null,
    expiryDate: Date | null
  ): Promise<UserDocument> {
    return USER.findByIdAndUpdate(
      id,
      {
        session: { token: sessionToken, expiryDate },
      },
      { new: true }
    );
  }

  public async updateUserAuthenticationToken(
    id: string,
    authToken: string | null,
    expiryDate: Date | null
  ): Promise<UserDocument> {
    return USER.findByIdAndUpdate(
      id,
      {
        auth: { token: authToken, expiryDate },
      },
      { new: true }
    );
  }
}

export default new UserService();
