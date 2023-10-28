import prisma from "@/lib/prisma";

export async function getUserById(id: string) {
  return await prisma.user.findUnique({ where: { id: id } });
}
export async function getUserByLogin(username: string) {
  return await prisma.user.findUnique({
    where: { email: username, OR: [{ username: username, phone: username }] },
  });
}

export async function checkUserEmailExist(email: string) {
  const count = await prisma.user.count({ where: { email: email } });

  return count > 0;
}

export async function checkUserUsernameExist(username: string) {
  const count = await prisma.user.count({ where: { username: username } });

  return count > 0;
}

export async function checkUserPhoneExist(phone: string) {
  const count = await prisma.user.count({ where: { phone: phone } });

  return count > 0;
}
