/*
  Warnings:

  - You are about to drop the column `categoryName` on the `Post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_categoryName_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "categoryName",
ADD COLUMN     "categoryId" INTEGER;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
