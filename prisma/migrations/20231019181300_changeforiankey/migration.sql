/*
  Warnings:

  - Made the column `userId` on table `RealEstate` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "RealEstate" DROP CONSTRAINT "RealEstate_userId_fkey";

-- AlterTable
ALTER TABLE "RealEstate" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "RealEstate" ADD CONSTRAINT "RealEstate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
