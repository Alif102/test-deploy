import { Request, Response } from "express";
import { CategoryService } from "./category.service";

const createCategory = async (req: Request, res: Response) => {
    try {
        const result = await CategoryService.createCategory(req.body)
        res.status(201).json(result);
    } catch (error) {
        res.status(500).send(error)
    }
}
const getAllCategories = async (req: Request, res: Response) => {
  const result = await CategoryService.getAllCategories();
  res.json(result);
};


export const CategoryController = {
    createCategory,
    getAllCategories
  
}