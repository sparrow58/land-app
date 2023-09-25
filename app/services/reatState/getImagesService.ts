import prisma from "@/lib/prisma";
export default async function getImagesService(id: string) {
  const images = await prisma.realEstate.findUnique({
    where: {
      id: id,
    },
    select: {
      images: true, // Include the 'images' field in the selection
    },
  });
  return images;
}
