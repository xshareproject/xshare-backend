import { Request, Response, NextFunction } from "express";

export interface ICommonMiddleware {
  verifySSLKey(request: Request, response: Response, next: NextFunction): void;
  isValidAuthToken(request: Request, response: Response, next: NextFunction): void;
}
