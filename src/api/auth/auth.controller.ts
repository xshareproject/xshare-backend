import { Request, Response } from "express";
import { ClientLoginRequest } from "./auth.types.config";
import {
  STATUS_CODES,
  GENERIC_MESSAGES,
} from "../../common/constants/response.status";
import authService from "./auth.service";
import userService from "../user/user.service";

class AuthController {
  async getSessionToken(request: Request, response: Response) {
    const clientLoginRequest: ClientLoginRequest = request.body;

    try {
      const user = await userService.getUserByPublicKey(
        clientLoginRequest.publicKey
      );

      const sessionToken: string = authService.generateSessionToken();

      const storeSessionToken =
        await authService.storeSessionTokenAndExpiryDate(
          user._id,
          sessionToken
        );

      if (!storeSessionToken) {
        throw Error(GENERIC_MESSAGES.GENERIC_500);
      }

      response.status(STATUS_CODES.SUCCESS).send({ sessionToken });
    } catch (error) {
      response.status(500).send({ error });
    }
  }

  async getAuthenticationToken(request: Request, response: Response) {
    const newAuthenticationToken = authService.generateAuthenticationToken();
    const { userId } = request.body;

    const storeAuthToken = authService.storeAuthenticationTokenAndExpiryDate(
      userId,
      newAuthenticationToken
    );

    storeAuthToken
      .then(() => {
        response
          .status(STATUS_CODES.SUCCESS)
          .send({ authToken: newAuthenticationToken });
      })
      .catch((error) => response.status(500).send({ error }));
  }

  async completeLoginSession(request: Request, response: Response) {
    const { sessionToken } = request.body;

    const user = await userService.getUserBySessionToken(sessionToken);

    userService
      .updateUserLoginSession(user._id, null, null)
      .then(() => {
        response
          .status(STATUS_CODES.SUCCESS)
          .send({ message: "Login Complete." });
      })
      .catch((error) => response.status(500).send({ error }));
  }
}

export default new AuthController();
