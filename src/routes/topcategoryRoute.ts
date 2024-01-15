import * as express from 'express';
import topcategoryController from '../controllers/topcategoryController';

const router = express.Router();

router.get('/topcategories', topcategoryController.getAllTopcategories)
router.delete('/topcategory', topcategoryController.deleteTopcategory)
router.post('/topcategory', topcategoryController.addTopCategory)
router.put('/topcategory', topcategoryController.updateTopcategory)
router.get('/topcategory', topcategoryController.getTopcategory)

export default router;