-- DropForeignKey
ALTER TABLE "RealEstate" DROP CONSTRAINT "RealEstate_userId_fkey";

-- AlterTable
ALTER TABLE "RealEstate" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "RealEstate" ADD CONSTRAINT "RealEstate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
