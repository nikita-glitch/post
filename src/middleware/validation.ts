import * as express from "express";
import * as yup from "yup";

const validate =
  (shema: yup.AnySchema) =>
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      console.log(shema);

      await shema.validate(req.body, { abortEarly: false, stripUnknown: true });
      next();
    } catch (error) {}
  };
//export default validate;
