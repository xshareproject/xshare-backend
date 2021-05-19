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
  phoneNumber: string;
  password: string;
  isContact?: boolean;
  salt: string;
  secret: string;
  publicKey: string;
}
