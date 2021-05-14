export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export const isUserRequestCorrect = (
  userRequestBody: CreateUserRequest
): boolean => {
  const { firstName, lastName, email, phoneNumber, password } = userRequestBody;

  if (firstName && lastName && email && phoneNumber && password) {
    // more correction checking etc.
    return true;
  }

  return false;
};
