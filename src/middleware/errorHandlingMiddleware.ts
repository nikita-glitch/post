import { Request, Response } from "express";
import * as yup from 'yup';
import CustomError from "../error/errorHandler";

const handleError = (error: any, req: Request, res: Response) => {  
  console.log(error instanceof CustomError);
  
  if (error instanceof CustomError) {
    return res.status(error.status).json({ message: error.message })
  }
  return res.status(500).json({ message: 'Unexpected error' })
}
export default handleError;