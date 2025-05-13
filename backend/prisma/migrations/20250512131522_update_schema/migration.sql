/*
  Warnings:

  - You are about to drop the column `publishedById` on the `Story` table. All the data in the column will be lost.
  - You are about to drop the column `favoriteStories` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `followedUsers` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `followingUsers` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `_savedBy` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[authorId]` on the table `Story` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `storyId` to the `Choice` table without a default value. This is not possible if the table is not empty.
  - Made the column `storyId` on table `Scene` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `language` on table `UserSettings` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Scene" DROP CONSTRAINT "Scene_storyId_fkey";

-- DropForeignKey
ALTER TABLE "Story" DROP CONSTRAINT "Story_publishedById_fkey";

-- DropForeignKey
ALTER TABLE "UserSettings" DROP CONSTRAINT "UserSettings_userId_fkey";

-- DropForeignKey
ALTER TABLE "_savedBy" DROP CONSTRAINT "_savedBy_A_fkey";

-- DropForeignKey
ALTER TABLE "_savedBy" DROP CONSTRAINT "_savedBy_B_fkey";

-- AlterTable
ALTER TABLE "Choice" ADD COLUMN     "storyId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Scene" ALTER COLUMN "storyId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Story" DROP COLUMN "publishedById",
ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "favoriteStories",
DROP COLUMN "followedUsers",
DROP COLUMN "followingUsers",
ADD COLUMN     "password" TEXT NOT NULL,
ALTER COLUMN "role" SET DEFAULT 'reader';

-- AlterTable
ALTER TABLE "UserSettings" ALTER COLUMN "language" SET NOT NULL,
ALTER COLUMN "language" SET DEFAULT 'en';

-- DropTable
DROP TABLE "_savedBy";

-- CreateTable
CREATE TABLE "_UserFollows" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_UserFollows_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_UserFavoriteStories" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_UserFavoriteStories_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_UserFollows_B_index" ON "_UserFollows"("B");

-- CreateIndex
CREATE INDEX "_UserFavoriteStories_B_index" ON "_UserFavoriteStories"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Story_authorId_key" ON "Story"("authorId");

-- AddForeignKey
ALTER TABLE "Scene" ADD CONSTRAINT "Scene_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "Story"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Choice" ADD CONSTRAINT "Choice_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "Story"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSettings" ADD CONSTRAINT "UserSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFollows" ADD CONSTRAINT "_UserFollows_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFollows" ADD CONSTRAINT "_UserFollows_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFavoriteStories" ADD CONSTRAINT "_UserFavoriteStories_A_fkey" FOREIGN KEY ("A") REFERENCES "Story"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFavoriteStories" ADD CONSTRAINT "_UserFavoriteStories_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
