import crypto from "crypto";
import { USER } from "../../../models/User";
import moment from "moment";

const byteLength: number = 64;

class AuthService {
  generateSessionToken() {
    return crypto.randomBytes(byteLength).toString("hex");
  }

  async storeSessionTokenAndExpiryDate(id: string, sessionToken: string) {
    let expiryDate = moment().add(5, "minute").toDate();
    return USER.findByIdAndUpdate(id, {
      session: { token: sessionToken, expiryDate: expiryDate },
    });
  }
}

export default new AuthService();
