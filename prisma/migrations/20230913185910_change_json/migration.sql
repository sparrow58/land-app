-- CreateEnum
CREATE TYPE "RealEstateType" AS ENUM ('LAND', 'APARTMENT', 'VILLA', 'BUILDING');

-- CreateEnum
CREATE TYPE "PaymentMethodType" AS ENUM ('CASH', 'INSTALLMENT', 'BOTH');

-- CreateEnum
CREATE TYPE "OverlookingType" AS ENUM ('MAINSTREET', 'SUBSTREET', 'SEA', 'BACK');

-- CreateEnum
CREATE TYPE "RentOrSell" AS ENUM ('RENT', 'SELL', 'BOTH');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('UNDER_REVIEW', 'SOLD', 'APPROVED');

-- CreateTable
CREATE TABLE "Land" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "land_size" INTEGER NOT NULL,
    "land_price" INTEGER NOT NULL,
    "endowment" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Land_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RealEstate" (
    "id" TEXT NOT NULL,
    "type" "RealEstateType" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "details" JSONB,
    "payment_method" "PaymentMethodType" NOT NULL,
    "rentOrSell" "RentOrSell" NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "size" DOUBLE PRECISION NOT NULL,
    "overlooking" "OverlookingType" NOT NULL,
    "status" "Status" NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RealEstate_pkey" PRIMARY KEY ("id")
);
