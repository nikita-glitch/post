import * as express from 'express'
import userController from '../controllers/userController'
import validateShema from '../middleware/validation';
import userSchema from '../schemas/userSchema';

const router = express.Router();

router.post('/auth', validateShema(userSchema.userSignUpSchema), userController.addUser);
router.post('/login',  validateShema(userSchema.userSignInSchema), userController.login);


export default router;

