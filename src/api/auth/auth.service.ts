import crypto from "crypto";
import { USER } from "../../../models/User";
import moment from "moment";
import { UserDocument } from "../../common/types/users.types.config";
import { ClientLoginCredentials } from "../../common/types/auth.types.config";
import { isUserPasswordValid } from "../../common/encryption/authentication_service";
import userService from "../user/user.service";

const byteLength: number = 64;

class AuthService {
  generateSessionToken(): string {
    return crypto.randomBytes(byteLength).toString("hex");
  }

  async storeSessionTokenAndExpiryDate(
    id: string,
    sessionToken: string
  ): Promise<UserDocument> {
    const expiryDate = moment().add(5, "minute").toDate();

    return USER.findByIdAndUpdate(
      id,
      {
        session: { token: sessionToken, expiryDate },
      },
      { new: true }
    );
  }

  async isUserSessionActive(sessionToken: string): Promise<boolean> {
    const user: UserDocument = await USER.findOne({
      session: { token: sessionToken },
    });

    const currentDate = new Date();
    const sessionExpiryDate = user.session.expiryDate;

    return moment(currentDate.toISOString()).isSameOrAfter(
      moment(sessionExpiryDate)
    );
  }

  async isUserCredentialsValid(
    credentials: ClientLoginCredentials
  ): Promise<boolean> {
    const user = await userService.getUserByEmail(credentials.email);

    return isUserPasswordValid(credentials.password, user.salt, user.secret);
  }
}

export default new AuthService();
