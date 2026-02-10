import express from 'express';
import { PostController } from './post.controller';

const router = express.Router();


router.get("/stats", PostController.getBlogStat)

router.post(
    "/",
    PostController.createPost
)

router.get("/", PostController.getAllPosts);
router.get("/:id", PostController.getPostById);
router.get("/category/:id", PostController.getPostsByCategory);
router.patch("/:id", PostController.updatePost);
router.delete("/:id", PostController.deletePost);


export const postRouter = router;