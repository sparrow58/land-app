import prisma from "@/lib/prisma";
import { RealEstateType } from "@prisma/client";

export async function getRealEstates(type: RealEstateType) {
  return await prisma.realEstate.findMany({
    where: { type: type },
    orderBy: { createdAt: "desc" },
  });
}
export async function getRealEstate(id: string, type: RealEstateType) {
  return await prisma.realEstate.findUnique({ where: { id: id, type: type } });
}
