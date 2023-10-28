import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import { UserFormData } from "./../../dataObjects/UserFormData";
export async function createUser(user: UserFormData) {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  return await prisma.user.create({
    data: {
      name: user.name,
      email: user.email,
      dateOfBirth: user.dateOfBirth,
      username: user.password,
      phone: user.phone,
      hashedPassword: hashedPassword,
    },
  });
}
