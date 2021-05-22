import { Document } from "mongoose";

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  isContact?: boolean;
}

export interface CreateUserBody {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string; // NOTE: following format +1-123-123-1234
  password: string;
  isContact?: boolean;
  salt: string;
  secret: string;
  publicKey: string;
}

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
