import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';

const checkAuth = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
try {
    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token || token === null) {
  
    }
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decodedToken);
    
    const userId = decodedToken;
    //const person = await AppDataSource.getRepository(User).findBy({ id: userId })
    next()
} catch (error) {
  
}
}
export default checkAuth;