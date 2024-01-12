import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Subcategory } from "../entity/Subcategory";
//import validate from "../middleware/validation";
import { Topcategory } from "../entity/Topcategory";
import subcategorySchema from "../schemas/subcategorySchema";

const getSubcategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.body.id;
    const subcategory = await AppDataSource.getRepository(
      Subcategory
    ).findOneBy({ id: id });
    return res.json(subcategory);
  } catch (error) {}
};

const getAllSubcategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const subcategories = await AppDataSource.getRepository(Subcategory).find();
    return res.json(subcategories);
  } catch (error) {}
};

const getTopcategorySubcategories = async (req: Request, res: Response, next: NextFunction) => {
  
}

const addSubcategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const name = req.body.name;
    await subcategorySchema.validate(name);
    const subcategoryRep = AppDataSource.getRepository(Subcategory);
    const subcategory = new Subcategory();
    subcategory.name = name;
    await subcategoryRep.save(subcategory);
  } catch (error) {}
};

const updateSubcategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, name } = req.body;
    await subcategorySchema.validate(name);
    const subcategoryRep = AppDataSource.getRepository(Subcategory);
    await subcategoryRep.update({ id: id }, { name: name });
  } catch (error) {}
};

const deleteSubcategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.body.id;
    const subcategoryRep = AppDataSource.getRepository(Subcategory);
    await subcategoryRep.delete({ id: id });
  } catch (error) {}
};

export default { getSubcategory, getAllSubcategories, updateSubcategory, deleteSubcategory, addSubcategory, getTopcategorySubcategories }