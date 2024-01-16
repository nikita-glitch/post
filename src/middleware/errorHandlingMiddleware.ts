import { NextFunction, Request, Response } from "express";
import * as yup from 'yup';
import * as jwt from 'jsonwebtoken'
import CustomError from "../error/errorHandler";

const handleError = (error: any, req: Request, res: Response, next: NextFunction) => {  
  
  if (error instanceof jwt.JsonWebTokenError || error instanceof jwt.TokenExpiredError) {
    return res.status(400).json({ message: error.message })
  }
  if (error instanceof CustomError) {
    return res.status(error.status).json({ message: error.message })
  }
  if (error instanceof yup.ValidationError) {
    return res.status(400).json({ message: error.errors })
  }
  return res.status(500).json({ message: 'Unexpected error' })
}
export default handleError;