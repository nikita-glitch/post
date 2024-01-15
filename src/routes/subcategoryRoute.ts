import * as express from 'express';
import subcategoryController from '../controllers/subcategoryController';

const router = express.Router();

router.get('/subcategories', subcategoryController.getAllSubcategories);
router.get('/subcategory', subcategoryController.getSubcategory);
//router.get('/subcategory', subcategoryController.)
router.post('/subcategory', subcategoryController.addSubcategory)
router.put('/subcategory', subcategoryController.updateSubcategory)
router.delete('/subcategory', subcategoryController.deleteSubcategory);

export default router;
