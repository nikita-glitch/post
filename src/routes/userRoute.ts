import * as express from 'express'
import * as yup from 'yup'
import userController from '../controllers/userController'
//import validation from '../middleware/validation'
import userSchema from '../schemas/userSchema';
const router = express.Router();

router.post('/auth', userController.addUser);
router.post('/login', userController.login);

module.exports = router;