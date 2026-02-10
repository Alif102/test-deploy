import express from 'express';
import { CategoryController } from './category.controller';

const router = express.Router();


router.get("/", CategoryController.getAllCategories);

router.post(
    "/",
    CategoryController.createCategory
)




export const CategoryRouter = router;