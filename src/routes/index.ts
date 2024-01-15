import * as express from "express";
import userRouter from './userRoute'
import subcategoryRouter from "./subcategoryRoute";
import topcategoryRouter from "./topcategoryRoute";
import postRouter from './postRoute';

const router = express.Router();

router.use("/post", postRouter);
router.use("/user", userRouter);
router.use("/subcategory", subcategoryRouter);
router.use("/topcategory", topcategoryRouter);

export default router;
