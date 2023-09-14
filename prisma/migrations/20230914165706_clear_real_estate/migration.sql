/*
  Warnings:

  - You are about to drop the column `created_at` on the `RealEstate` table. All the data in the column will be lost.
  - You are about to drop the column `created_by` on the `RealEstate` table. All the data in the column will be lost.
  - You are about to drop the column `payment_method` on the `RealEstate` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `RealEstate` table. All the data in the column will be lost.
  - You are about to drop the column `updated_by` on the `RealEstate` table. All the data in the column will be lost.
  - Added the required column `paymentMethod` to the `RealEstate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `RealEstate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RealEstate" DROP COLUMN "created_at",
DROP COLUMN "created_by",
DROP COLUMN "payment_method",
DROP COLUMN "updated_at",
DROP COLUMN "updated_by",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "paymentMethod" "PaymentMethodType" NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
