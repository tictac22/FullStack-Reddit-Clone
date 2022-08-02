/*
  Warnings:

  - You are about to drop the column `name` on the `SubReddit` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `SubReddit` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title` to the `SubReddit` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "SubReddit_name_key";

-- AlterTable
ALTER TABLE "SubReddit" DROP COLUMN "name",
ADD COLUMN     "image" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "subscribers" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "title" VARCHAR(255) NOT NULL;

-- CreateTable
CREATE TABLE "SubscribedSubReddits" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "subRedditId" INTEGER NOT NULL,

    CONSTRAINT "SubscribedSubReddits_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SubReddit_title_key" ON "SubReddit"("title");

-- AddForeignKey
ALTER TABLE "SubscribedSubReddits" ADD CONSTRAINT "SubscribedSubReddits_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscribedSubReddits" ADD CONSTRAINT "SubscribedSubReddits_subRedditId_fkey" FOREIGN KEY ("subRedditId") REFERENCES "SubReddit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
