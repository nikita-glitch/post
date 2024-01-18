import * as express from "express";
import topcategoryController from "../controllers/topcategoryController";
import checkRole from "../middleware/checkRole";
import checkAuth from "../middleware/checkAuth";
import validateSchema from "../middleware/validation";
import topcategorySchema from "../schemas/topcategorySchema";

const router = express.Router();

router.get("/topcategories", topcategoryController.getAllTopcategories);
router.get("/topcategory", topcategoryController.getTopcategory);
router.delete(
  "/topcategory",
  validateSchema(topcategorySchema.topcategoryDeleteteSchema),
  checkAuth,
  checkRole,
  topcategoryController.deleteTopcategory
);
router.post(
  "/topcategory",
  validateSchema(topcategorySchema.topcategoryAddOrUpdateSchema),
  checkAuth,
  checkRole,
  topcategoryController.addTopCategory
);
router.put(
  "/topcategory",
  validateSchema(topcategorySchema.topcategoryAddOrUpdateSchema),
  checkAuth,
  checkRole,
  topcategoryController.updateTopcategory
);

export default router;
