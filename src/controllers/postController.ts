import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Post } from "../entity/Post";
import postSchema from "../schemas/postSchema";

const getUserPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.body.id;
    const userPosts = await AppDataSource.getRepository(Post).findBy({ user: userId });
    return res.json(userPosts);
  } catch (error) {
    
  }
}

const getSubcategoryPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const subcategoryId = req.body.id;
    const subcategoryPosts = await AppDataSource.getRepository(Post).findBy({ subcategory: subcategoryId });
    return res.json(subcategoryPosts);
  } catch (error) {
    
  }
}

const getAllPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await AppDataSource.getRepository(Post).find();
    return res.json(posts);
  } catch (error) {
    
  }
}

const addPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const postText = req.body.postText;
    await postSchema.validate(postText);
    const post = new Post();
    post.postText = postText;
    await AppDataSource.getRepository(Post).save(post);
  } catch (error) {
    
  }
}

const updatePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, updatedPostText } = req.body;
    await postSchema.validate(updatedPostText);
    const postRep = AppDataSource.getRepository(Post);
    await postRep.update({ id: id }, { postText: updatedPostText});
  } catch (error) {
    
  }
}

const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.body.id;
    const postRep = AppDataSource.getRepository(Post);
    await postRep.delete({ id: id });
  } catch (error) {
    
  }
}

export default { getUserPosts, getAllPosts, getSubcategoryPosts, addPost, updatePost, deletePost }