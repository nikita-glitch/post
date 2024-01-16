import * as express from 'express';
import postController from '../controllers/postController';
import checkAuth from '../middleware/checkAuth';
import validateSchema from '../middleware/validation';
import postSchema from '../schemas/postSchema';

const router = express.Router();

router.get('/posts', postController.getAllPosts)
router.post('/post', validateSchema(postSchema), checkAuth, postController.addPost)
router.put('/post', validateSchema(postSchema), checkAuth, postController.updatePost)
router.delete('/post', checkAuth, postController.deletePost)
router.get('/post', postController.getSubcategoryPosts)
router.get('/postss', checkAuth, postController.getUserPosts)

export default router;