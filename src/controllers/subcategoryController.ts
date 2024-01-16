import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Subcategory } from "../entity/Subcategory";
import { Topcategory } from "../entity/Topcategory";
import CustomError from "../error/errorHandler";

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
  } catch (error) {
    next(error)
  }
};

const getAllSubcategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const subcategories = await AppDataSource.getRepository(Subcategory).find();
    return res.json(subcategories);
  } catch (error) {
    next(error)
  }
};

const getTopcategorySubcategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const topcategoryId = req.body.id;
    if (!topcategoryId) {
      throw CustomError.notFound('Subcategories not found');
    }
    const subcategories = AppDataSource.getRepository(Subcategory).findBy({
      topcategoryId: topcategoryId,
    });
    return res.json(subcategories);
  } catch (error) {
    next(error)
  }
};

const addSubcategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, topcategoryName } = req.body;
    const subcategoryRep = AppDataSource.getRepository(Subcategory);
    const topcategory = await AppDataSource.getRepository(
      Topcategory
    ).findOneBy({ name: topcategoryName });
    const subCat = await subcategoryRep.findOneBy({ name: name });
    if (subCat) {
      throw CustomError.existingEntity('Subcategory alredy exist!')
    }
    const subcategory = new Subcategory();
    subcategory.name = name;
    subcategory.topcategory = topcategory;
    await subcategoryRep.save(subcategory);
    return res.status(201).json({ message: "Subcategory added successfully" });
  } catch (error) {
    next(error)
  }
};

const updateSubcategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, name } = req.body;
    const subcategoryRep = AppDataSource.getRepository(Subcategory);
    const subCat = await subcategoryRep.findOneBy({ name: name });
    if (subCat) {
      throw CustomError.existingEntity('Subcategory alredy exist!')
    }
    await subcategoryRep.update({ id: id }, { name: name });
    return res.status(200).json({ message: "Subcategory updated succsessfully" });
  } catch (error) {
    next(error)
  }
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
    return res.status(200).json({ message: "Subcategory deleted succsessfully" });
    } catch (error) {
    next(error)
  }
};

export default {
  getSubcategory,
  getAllSubcategories,
  updateSubcategory,
  deleteSubcategory,
  addSubcategory,
  getTopcategorySubcategories,
};
