-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_subRedditId_fkey";

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "subRedditId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_subRedditId_fkey" FOREIGN KEY ("subRedditId") REFERENCES "SubReddit"("id") ON DELETE SET NULL ON UPDATE CASCADE;
