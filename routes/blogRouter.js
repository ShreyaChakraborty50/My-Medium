import { Router } from 'express';
import * as blogController from '../controllers/blogController.js';
//import* as authorController from '../controllers/authorController.js';




const router = Router();


router.post('/blogs', blogController.createBlog);
router.get('/blogs', blogController.getAllBlogs);
router.get('/:id', blogController.getOneBlog);

export default router;
