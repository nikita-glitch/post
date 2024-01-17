import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Post } from "../entity/Post";
import { User } from "../entity/User";
import { Subcategory } from "../entity/Subcategory";
import CustomError from "../error/errorHandler";

const getUserPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.body.token;
    const userPosts = await AppDataSource.getRepository(Post).findBy({
      user: userId,
    });
    return res.json(userPosts);
  } catch (error) {
    next(error)
  }
};

const getSubcategoryPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const subcategoryId = req.body.id;
    if (!subcategoryId) {
      throw CustomError.notFound('Posts not found')
    }
    const subcategoryPosts = await AppDataSource.getRepository(Post).findBy({ subcategoryId: subcategoryId });
    return res.json(subcategoryPosts);
  } catch (error) {
    next(error)
  }
};

const getAllPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await AppDataSource.getRepository(Post).find();
    return res.json(posts);
  } catch (error) {
    next(error)
  }
};

const addPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.body.token;
    const { postText, subcategoryId } = req.body;

    const user = await AppDataSource.getRepository(User).findOneBy({ id: userId });
    const subcategory = await AppDataSource.getRepository(Subcategory).findOneBy({ id: subcategoryId });
    const postRep = AppDataSource.getRepository(Post);
    const postCheck = postRep.findOneBy({subcategoryId: subcategoryId});

    if (postCheck) {
      throw CustomError.existingEntity('Post in this subcategory alredy exists')
    }

    const post = new Post();
    post.postText = postText;
    post.user = user;
    post.subcategory = subcategory;
    await postRep.save(post);
    return res.status(201).json({ message: "Post created succsessfully" });
  } catch (error) {
    console.log(error);
    next(error)
  }
};

const updatePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.body.token
    const { id, postText } = req.body;    
    const postRep = AppDataSource.getRepository(Post);
    const post =  await postRep.findOneBy({ 
      id: id, 
      userId: userId
    });   
    if (!post) {
      throw CustomError.notFound('Post does not exist')
    }
    await postRep.update(id, { postText: postText });
    return res.status(200).json({ message: "Post updated succsessfully" });
  } catch (error) {
    console.log(error);
    next(error)
  }
};

const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.body.token;
    const id = req.body.id;
    const postRep = AppDataSource.getRepository(Post);
    const post =  await postRep.findOneBy({ 
      id: id, 
      userId: userId
    });   
    if (!post) {
      throw CustomError.notFound('Post does not exist')
    }
    await postRep.remove(post);
    return res.status(200).json({ message: "Post deleted succsessfully" });
  } catch (error) {
    console.log(error);
    next(error)
  }
};

export default {
  getUserPosts,
  getAllPosts,
  getSubcategoryPosts,
  addPost,
  updatePost,
  deletePost,
};
