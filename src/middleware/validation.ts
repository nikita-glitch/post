import * as express from "express";
import * as yup from "yup";

const validateSchema =
  (schema: yup.AnySchema) =>
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      await schema.validate(req.body, { abortEarly: false });
      //await schema.validate(req.query, { abortEarly: false });
      //await schema.validate(req.params, { abortEarly: false });
      next();
    } catch (error) {
      //next(error)
      return res.status(400).json({ message: error.errors });
    }
  };
export default validateSchema;
