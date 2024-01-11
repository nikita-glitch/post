import * as express from "express";

const router = express.Router();

router.use("/post");
router.use("/user");
router.use("/subcategory");
router.use("/topcategory");

export default router;
