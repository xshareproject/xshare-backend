import { Request, Response } from "express";
import { ClientLoginRequest } from "../../common/types/auth.types.config";
import { STATUS_CODES } from "../../common/constants/response.status";
import authService from "./auth.service";
import userService from "../user/user.service";
import { UserDocument } from "../../common/types/users.types.config";
import encryptionService from "../../common/encryption/encryption.service";

class AuthController {
  getSessionToken(request: Request, response: Response) {
    const clientLoginRequest: ClientLoginRequest = request.body;
    const fetchUserRequest = userService.getUserByPublicKey(
      clientLoginRequest.publicKey
    );

    const sessionToken: string = authService.generateSessionToken();

    fetchUserRequest
      .then((user: UserDocument) => {
        const storeSessionTokenRequest: Promise<any> =
          authService.storeSessionTokenAndExpiryDate(user._id, sessionToken);

        const encryptedUserSessionToken: string =
          encryptionService.encryptMessageWithServerPrivateKey(
            encryptionService.encryptMessageGivenPublicKey(
              sessionToken,
              user.publicKey
            )
          );

        storeSessionTokenRequest
          .then(() => {
            response
              .status(STATUS_CODES.SUCCESS)
              .send({ encryptedSessionToken: encryptedUserSessionToken });
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  }

  async getAuthenticationToken(request: Request, response: Response) {
    const newAuthenticationToken = authService.generateAuthenticationToken();
    const { userId } = request.body;

    const storeAuthToken = authService.storeAuthenticationTokenAndExpiryDate(
      userId,
      newAuthenticationToken
    );

    const encryptedWithUserPublicKey =
      await encryptionService.encryptMessageWithClientPublicKey(
        newAuthenticationToken,
        userId
      );

    const encryptedAuthenticationToken =
      encryptionService.encryptMessageWithServerPrivateKey(
        encryptedWithUserPublicKey
      );

    storeAuthToken
      .then(() => {
        response
          .status(STATUS_CODES.SUCCESS)
          .send({ encryptedAuthenticationToken });
      })
      .catch((error) => console.log(error));
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
      .catch((error) => console.log(error));
  }
}

export default new AuthController();
