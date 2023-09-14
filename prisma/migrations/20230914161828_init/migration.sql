/*
  Warnings:

  - You are about to drop the column `details` on the `RealEstate` table. All the data in the column will be lost.
  - You are about to drop the column `updated_At` on the `RealEstate` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `RealEstate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RealEstate" DROP COLUMN "details",
DROP COLUMN "updated_At",
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
