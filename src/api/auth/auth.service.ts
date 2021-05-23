import crypto from "crypto";
import moment from "moment";
import { UserDocument } from "../../common/types/users.types.config";
import { ClientLoginCredentials } from "../../common/types/auth.types.config";
import { isUserPasswordValid } from "../../common/encryption/authentication.service";
import userService from "../user/user.service";

const byteLength: number = 64;

class AuthService {
  generateSessionToken(): string {
    return crypto.randomBytes(byteLength).toString("hex");
  }

  generateAuthenticationToken(): string {
    return crypto.randomBytes(byteLength * 2).toString("hex");
  }

  async storeSessionTokenAndExpiryDate(
    id: string,
    sessionToken: string
  ): Promise<UserDocument> {
    const expiryDate = moment().add(5, "minute").toDate();

    return userService.updateUserLoginSession(id, sessionToken, expiryDate);
  }

  async storeAuthenticationTokenAndExpiryDate(
    id: string,
    authToken: string
  ): Promise<UserDocument> {
    const expiryDate = moment().add(15, "minute").toDate();

    return userService.updateUserAuthenticationToken(id, authToken, expiryDate);
  }

  async isUserSessionActive(sessionToken: string): Promise<boolean> {
    const user: UserDocument = await userService.getUserBySessionToken(
      sessionToken
    );

    const currentDate = new Date();
    const sessionExpiryDate = user.session.expiryDate;

    return moment(currentDate.toUTCString()).isSameOrAfter(
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
