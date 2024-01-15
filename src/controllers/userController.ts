import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import CustomError from "../error/errorHandler";

const addUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;    
    const person = await AppDataSource.getRepository(User).findBy({ email: email });
    if (person) {
      throw CustomError.existingUser('User with this email alredy exists');
    }
    const user = new User();
    user.email = email;
    user.password = await bcrypt.hash(password, 3);
    user.name = name;    
    await AppDataSource.getRepository(User).save(user);
    return res.status(200).json({ message: 'User has created succsessfully! '});
  } catch (error) {         
    return next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const person = await AppDataSource.getRepository(User).findOneBy(email);
    if (!person) {
    }
    const comparedPassword = bcrypt.compare(password, person.password);
    if (!comparedPassword) {
    }
    const token = jwt.sign({ data: person.id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    return res.json(token);
  } catch (error) {
    return next(error);
  }
};
export default { addUser, login };
