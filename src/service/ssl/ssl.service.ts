import { ISSL } from "./ssl.interface";
import { sslKey } from "../../common/constants/server.env.vars";

class SSL implements ISSL {
  public isValidSSLKey(key: string) {
    return sslKey === key;
  }
}

export default new SSL();
