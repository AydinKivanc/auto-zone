import { Request, Response, NextFunction } from "express"

// Middleware for authentication
export const testMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("First Middleware run then Request received")
  next()
}
