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
      if (Object.keys(req.body).length !== 0) {
        await schema.validate(req.body, { abortEarly: false });
      }
      if (Object.keys(req.params).length !== 0) {
        await schema.validate(req.params, { abortEarly: false });
      }
      if (Object.keys(req.query).length !== 0) {
        await schema.validate(req.query, { abortEarly: false });
      }
      next();
    } catch (error) {
      return next(error)
    }
  };
export default validateSchema;
