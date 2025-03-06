/*
  Warnings:

  - You are about to drop the column `Content` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `Title` on the `Post` table. All the data in the column will be lost.
  - Added the required column `content` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "Content",
DROP COLUMN "Title",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "title" TEXT NOT NULL;
