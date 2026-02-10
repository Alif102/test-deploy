import { prisma } from "../../../config/db";
import { Prisma, Category } from "../../../generated/prisma/client";


const createCategory = async (payload: Prisma.CategoryCreateInput): Promise<Category> => {
    const result = await prisma.category.create({
        data: payload,
        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        }
    })

    return result;
}
const getAllCategories = async () => {
  return prisma.category.findMany({
    include: {
      author: true,
    },
  });
};


export const CategoryService = {
    createCategory,
    getAllCategories
    
}