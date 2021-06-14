import { Request, Response } from "express";
import {
  serverPublicKey,
  sslKey,
} from "../../common/constants/server.env.vars";

class ClientController {
  getSSLKeyAndServerPublicKey(request: Request, response: Response) {
    response
      .status(200)
      .send({
        sslKey,
        serverPublicKey: serverPublicKey.exportKey("public"),
      });
  }
}

export default new ClientController();
