import { authOptions } from "@/lib/nextAuthOptions";
import prisma from "@/lib/prisma";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";

export const updateCurrentUser = async (user: Partial<User>) => {
  const session = await getServerSession(authOptions);
  const updatedUser = await prisma.user.update({
    where: { id: session?.user.id },
    data: {
      name: user.name,
      dateOfBirth: user.dateOfBirth,
      username: user.username,
      phone: user.phone,
      language: user.language,
    },
  });
  return updatedUser;
};
