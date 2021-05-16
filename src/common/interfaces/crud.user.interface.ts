import { Document } from "mongoose";
import { CreateUserRequest } from "../types/users.types.config";

export interface CRUD {
  createUser(createUserRequest: CreateUserRequest): Promise<Document>;

  getUserById(id: string): Promise<Document>;

  getUserByEmail(email: string): Promise<Document>;

  getUserByPhoneNumber(phoneNumber: string): Promise<Document>;
}
