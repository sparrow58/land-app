import prisma from "@/lib/prisma";
import { Land } from "@prisma/client";
export async function getLand(id: string): Promise<Land | null> {
  return prisma.land.findFirst({ where: { id: id } });
}
export async function getLands() {
  return await prisma.land.findMany();
}
