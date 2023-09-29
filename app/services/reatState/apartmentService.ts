import prisma from "@/lib/prisma";
import { RealEstate, RealEstateType } from "@prisma/client";

export async function getAppartments() {
  const data = await prisma.realEstate.findMany({
    where: {
      type: RealEstateType.APARTMENT,
    },
  });
  return data;
}
export async function getAppartment(id: string) {
  const data = await prisma.realEstate.findUnique({
    where: {
      id: id,
    },
  });
  return data;
}
