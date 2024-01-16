import * as express from 'express';
import topcategoryController from '../controllers/topcategoryController';
import checkRole from '../middleware/checkRole';
import checkAuth from '../middleware/checkAuth';
import validateSchema from '../middleware/validation';
import topcategorySchema from '../schemas/topcategorySchema';

const router = express.Router();

router.get('/topcategories', topcategoryController.getAllTopcategories)
router.delete('/topcategory', checkAuth, checkRole, topcategoryController.deleteTopcategory)
router.post('/topcategory', validateSchema(topcategorySchema), checkAuth, checkRole, topcategoryController.addTopCategory)
router.put('/topcategory', validateSchema(topcategorySchema), checkAuth, checkRole, topcategoryController.updateTopcategory)
router.get('/topcategory', topcategoryController.getTopcategory)

export default router;