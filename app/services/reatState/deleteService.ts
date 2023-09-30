import { del } from "@vercel/blob";
import prisma from "@/lib/prisma";

export const deleteRealEstate = async (id: string) => {
  const item = await prisma.realEstate.delete({
    where: {
      id: id,
    },
  });

  if (item.images && item.images.length > 0) await del(item.images);

  return item.id;
};
