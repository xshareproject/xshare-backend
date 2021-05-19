import { Request, Response } from "express";
import { ClientLoginRequest } from "../../common/types/auth.types.config";
import { STATUS_CODES } from "../../common/constants/response.status";
import authService from "./auth.service";
import userService from "../user/user.service";

class AuthController {
  async getSessionToken(request: Request, response: Response) {
    const clientLoginRequest: ClientLoginRequest = request.body;
    const sessionToken: string = authService.generateSessionToken();
    const user = await userService.getUserByPublicKey(
      clientLoginRequest.publicKey
    );

    authService.storeSessionTokenAndExpiryDate(user._id, sessionToken);

    return sessionToken;
  }
}
