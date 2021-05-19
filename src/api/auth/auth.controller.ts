import { Request, Response } from "express";
import { ClientLoginRequest } from "../../common/types/auth.types.config";
import { STATUS_CODES } from "../../common/constants/response.status";
import authService from "./auth.service";
import userService from "../user/user.service";
import mongoose from "mongoose";

class AuthController {
  async getSessionToken(request: Request, response: Response) {
    const clientLoginRequest: ClientLoginRequest = request.body;
    const fetchUserRequest: Promise<any> = userService.getUserByPublicKey(
      clientLoginRequest.publicKey
    );

    const sessionToken: string = authService.generateSessionToken();

    fetchUserRequest.then((user: mongoose.Document) => {
      const storeSessionTokenRequest: Promise<any> =
        authService.storeSessionTokenAndExpiryDate(user._id, sessionToken);

      // encrypt here for now

      storeSessionTokenRequest.then((updatedUser: mongoose.Document) => {
        response
          .status(STATUS_CODES.SUCCESS)
          .send({ encryptedSessionToken: sessionToken });
      });
    });
  }
}

export default new AuthController();
