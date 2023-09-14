/*
  Warnings:

  - You are about to drop the `Land` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `RealEstate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RealEstate" ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Land";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL,
    "prefrences" JSONB,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RealEstate" ADD CONSTRAINT "RealEstate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
