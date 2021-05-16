import { Document } from "mongoose";
import { CreateUserRequest } from "../types/users.types.config";

export interface CRUD {
  createUser: (createUserRequest: CreateUserRequest) => Promise<Document>;

  getById: (id: string) => Promise<Document>;
}

export interface VALIDATION {}
