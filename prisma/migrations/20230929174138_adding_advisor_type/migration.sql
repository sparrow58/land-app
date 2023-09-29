-- CreateEnum
CREATE TYPE "AdvisorType" AS ENUM ('OWNER', 'PROKER', 'COMPANY');

-- AlterEnum
ALTER TYPE "RealEstateType" ADD VALUE 'WARHOUSE';

-- AlterTable
ALTER TABLE "RealEstate" ADD COLUMN     "advisorType" "AdvisorType",
ADD COLUMN     "details" JSONB;
