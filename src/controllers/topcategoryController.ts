import * as express from "express";
import { AppDataSource } from "../data-source";
import { Topcategory } from "../entity/Topcategory";
import CustomError from "../error/errorHandler";

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
      throw CustomError.notFound('Topcategory not found');
    }
    return res.json(topcategory);
  } catch (error) {
    next(error)
  }
};

const addTopCategory = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const name  = req.body.name;
    const topcategoryRep = AppDataSource.getRepository(Topcategory);
    const topCat = await topcategoryRep.findOneBy({ name: name });
    if (topCat) {
      throw CustomError.existingEntity('Topcategory alredy exist!')
    }
    const topcategory = new Topcategory();
    topcategory.name = name;
    await topcategoryRep.save(topcategory);
    return res.status(200).json({ message: "Topcategory created succsessfully" });
  } catch (error) {
    next(error)
  }
};

const getAllTopcategories = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const topcategories = await AppDataSource.getRepository(Topcategory).find();
    return res.json(topcategories);
  } catch (error) {
    next(error)
  }
};

const deleteTopcategory = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const id = req.body.id;
    const topcategoryRep = AppDataSource.getRepository(Topcategory);
    const topCat = await topcategoryRep.findOneBy({ id: id });    
    if (!topCat) {
      throw CustomError.existingEntity('Topcategory not found')
    }
    await topcategoryRep.delete({ id: id });
    return res
    .status(200)
    .json({ message: "Topcategory deleted succsessfully!" });
  } catch (error) {
    next(error)
  }
};

const updateTopcategory = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id, name }  = req.body;
    const topcategoryRep = AppDataSource.getRepository(Topcategory);
    const topCatExists = await topcategoryRep.findOneBy({ id: id });    
    if (!topCatExists) {
      throw CustomError.existingEntity('Topcategory not found')
    }
    const topCat = await topcategoryRep.findOneBy({ name: name });
    if (topCat) {
      throw CustomError.existingEntity('Topcategory alredy exist!')
    }
    await topcategoryRep.update({ id: id }, { name: name });
    return res
    .status(200)
    .json({ message: "Topcategory updated succsessfully! " });
  } catch (error) {
    next(error)
  }
}

export default {
  getTopcategory,
  addTopCategory,
  getAllTopcategories,
  deleteTopcategory,
  updateTopcategory
};
