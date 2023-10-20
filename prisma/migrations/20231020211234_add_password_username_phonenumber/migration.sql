-- AlterTable
ALTER TABLE "users" ADD COLUMN     "hashedPassword" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "username" TEXT,
ALTER COLUMN "email" DROP NOT NULL;
