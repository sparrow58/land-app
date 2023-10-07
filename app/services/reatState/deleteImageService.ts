import { RealEstate } from "@prisma/client";
import prisma from "@/lib/prisma";
export default async function deleteImageAsync(
  realEstateId: string,
  url: string
) {
  const existingUrl = await prisma.realEstate.findUnique({
    where: { id: realEstateId },
    select: { images: true },
  });
  if (existingUrl) {
    return await prisma.realEstate.update({
      where: { id: realEstateId },
      data: {
        images: {
          set: existingUrl.images.filter((i) => i !== url),
        },
      },
    });
  }
}
