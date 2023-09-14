/*
  Warnings:

  - You are about to drop the column `isAdmin` on the `User` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "Roles" ADD VALUE 'SUPERADMIN';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isAdmin",
ADD COLUMN     "role" "Roles" NOT NULL DEFAULT 'BASIC';
