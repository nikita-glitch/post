import * as express from "express";
import * as jwt from "jsonwebtoken";
import CustomError from "../error/errorHandler";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

const checkRole = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token || token === null) {
      throw CustomError.invalidToken("Invalid token");
    }
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    if (typeof decodedToken === "object") {
      const { userId, role } = decodedToken;
      const person = await AppDataSource.getRepository(User).findBy({
        id: userId,
      });
      if (!person) {
        throw CustomError.notFound("User not found");
      }
      if (role === "user") {
        throw CustomError.forbidden('Forbidden');
      }
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default checkRole;
