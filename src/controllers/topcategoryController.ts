import * as express from "express";
import { AppDataSource } from "../data-source";
import { Topcategory } from "../entity/Topcategory";
import topcategorySchema from "../schemas/topcategorySchema";
//import validate from "../middleware/validation";

const getTopcategory = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const id = req.body.id;
    const topcategory = await AppDataSource.getRepository(
      Topcategory
    ).findOneBy({ id: id });
    if (!topcategory) {
    }
    return res.json(topcategory);
  } catch (error) {}
};

const addTopCategory = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const name  = req.body.name;
    await topcategorySchema.validate(name);
    const topcategoryRep = AppDataSource.getRepository(Topcategory);
    const topcategory = new Topcategory();
    topcategory.name = name;
    await topcategoryRep.save(topcategory);
    return res
      .status(200)
      .json({ message: "Topcategory created succsessfully" });
  } catch (error) {}
};

const getAllTopcategories = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const topcategories = await AppDataSource.getRepository(Topcategory).find();
    return res.json(topcategories);
  } catch (error) {}
};

const deleteTopcategory = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const id = req.body.id;
    const topcategoryRep = AppDataSource.getRepository(Topcategory);
    await topcategoryRep.delete({ id: id });
  } catch (error) {}
};

const updateTopcategory = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id, name }  = req.body;
    await topcategorySchema.validate(name);
    const topcategoryRep = AppDataSource.getRepository(Topcategory);
    await topcategoryRep.update({ id: id }, { name: name });
  } catch (error) {
    
  }
}

export default {
  getTopcategory,
  addTopCategory,
  getAllTopcategories,
  deleteTopcategory,
  updateTopcategory
};
