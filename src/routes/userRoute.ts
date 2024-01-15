import * as express from 'express'
import userController from '../controllers/userController'
import userSchema from '../schemas/userSchema';
import validateShema from '../middleware/validation';

const router = express.Router();

router.post('/auth', validateShema(userSchema), userController.addUser);
router.post('/login', validateShema(userSchema), userController.login);


export default router;

