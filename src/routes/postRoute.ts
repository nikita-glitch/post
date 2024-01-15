import * as express from 'express';
import postController from '../controllers/postController';
import checkAuth from '../middleware/checkAuth';

const router = express.Router();

router.get('/posts', checkAuth, postController.getAllPosts)
router.post('/post', postController.addPost)
router.put('/post', postController.updatePost)
router.delete('/post', postController.deletePost)
router.get('/post', postController.getSubcategoryPosts)
router.get('/post', postController.getUserPosts)

export default router;