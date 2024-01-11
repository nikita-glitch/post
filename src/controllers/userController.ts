import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

exports.addUser = async (req: Request, res: Response)  => {
  try {
    const { name, email, password } = req.body;
    const person = await AppDataSource.getRepository(User).findBy(email);
    if(person) {
  
    }
    const user = new User();
    user.email = email;
    user.password = await bcrypt.hash(password, 3);
    user.name = name;
    await AppDataSource.getRepository(User).save(user);
    return res.json(user);
  } catch (error) {
    
  }
};
exports.login = async(req: Request, res: Response) => {
  const { email, password } = req.body;
  const person = await AppDataSource.getRepository(User).findOneBy(email);
  if (!person) {

  }
  const comparedPassword = bcrypt.compare(password, person.password);
  if (!comparedPassword) {

  }
  const token = jwt.sign(
    { data: person.id },
    process.env.SECRET_KEY,
    {expiresIn: '1h'}
  )
  return res.json(token);
};
