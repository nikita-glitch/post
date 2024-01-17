import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import CustomError from "../error/errorHandler";

const addUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;
    const person = await AppDataSource.getRepository(User).findOneBy({
      email: email,
    });
    if (person) {
      throw CustomError.existingEntity("User with this email alredy exists");
    }
    const user = new User();
    user.email = email;
    user.password = await bcrypt.hash(password, 3);
    user.name = name;
    await AppDataSource.getRepository(User).save(user);
    return res
      .status(201)
      .json({ message: "User has created succsessfully! " });
  } catch (error) {
    return next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const person = await AppDataSource.getRepository(User).findOneBy({
      email: email,
    });
    if (!person) {
      throw CustomError.wrongLogPass("Wrong email or password");
    }
    const comparedPassword = bcrypt.compare(password, person.password);
    if (!comparedPassword) {
      throw CustomError.wrongLogPass("Wrong email or password");
    }
    const token = jwt.sign(
      {
        id: person.id,
        role: person.role,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
    return res.json(token);
  } catch (error) {
    return next(error);
  }
};
export default { addUser, login };
