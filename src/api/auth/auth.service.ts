import crypto from "crypto";
import { USER } from "../../../models/User";
import moment from "moment";
import { Document } from "mongoose";

const byteLength: number = 64;

class AuthService {
  generateSessionToken(): string {
    return crypto.randomBytes(byteLength).toString("hex");
  }

  async storeSessionTokenAndExpiryDate(
    id: string,
    sessionToken: string
  ): Promise<Document> {
    const expiryDate = moment().add(5, "minute").toDate();

    return USER.findByIdAndUpdate(
      id,
      {
        session: { token: sessionToken, expiryDate },
      },
      { new: true }
    );
  }
}

export default new AuthService();
