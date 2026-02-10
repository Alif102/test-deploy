/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_categoryId_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "categoryId",
ADD COLUMN     "categoryName" TEXT;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_categoryName_fkey" FOREIGN KEY ("categoryName") REFERENCES "Category"("name") ON DELETE SET NULL ON UPDATE CASCADE;
