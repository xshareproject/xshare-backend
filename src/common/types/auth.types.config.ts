export interface ClientLoginRequest {
  publicKey: string;
}

export interface ClientLoginEncryptedCredentials {
  sessionToken: string;
  credentials: string;
}

export interface ClientLoginCredentials {
  email: string;
  password: string;
}
