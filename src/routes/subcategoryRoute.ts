import * as express from 'express';
import subcategoryController from '../controllers/subcategoryController';
import checkRole from '../middleware/checkRole';
import checkAuth from '../middleware/checkAuth';
import validateSchema from '../middleware/validation';
import subcategorySchema from '../schemas/subcategorySchema';

const router = express.Router();

router.get('/subcategories', subcategoryController.getAllSubcategories);
router.get('/subcategory', subcategoryController.getSubcategory);
router.get('/subcategor', subcategoryController.getTopcategorySubcategories)
router.post('/subcategory', validateSchema(subcategorySchema.subcategoryAddSchema), checkAuth, checkRole, subcategoryController.addSubcategory)
router.put('/subcategory', validateSchema(subcategorySchema.subcategoryUpdateSchema), checkAuth, checkRole, subcategoryController.updateSubcategory)
router.delete('/subcategory', checkAuth, checkRole, subcategoryController.deleteSubcategory);

export default router;
