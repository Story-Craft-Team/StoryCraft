-- DropIndex
DROP INDEX "Story_authorId_key";

-- AlterTable
ALTER TABLE "Scene" ADD COLUMN     "maxChoices" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "Story" ADD COLUMN     "image" TEXT;
