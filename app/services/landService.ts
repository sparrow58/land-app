import prisma from "@/lib/prisma";
import { RealEstate } from "@prisma/client";
export async function getLand(id: string): Promise<RealEstate | null> {
  return prisma.realEstate.findFirst({ where: { id: id, type: "LAND" } });
}
export async function getLands() {
  return await prisma.realEstate.findMany();
}
