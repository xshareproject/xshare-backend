export interface UserDocument extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  lastUpdated: Date;
  userUUIDs: string[];
  session: Token;
  auth: Token;
  publicKey: string;
  salt: string;
  secret: string;
}

interface Token {
  token: string;
  expiryDate: Date;
}
