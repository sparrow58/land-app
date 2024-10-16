import prisma from "@/lib/prisma";
type queryParams = {
  search?: string;
  page: number;
  limit: number;
  sort: string;
  order: string;
};
export async function getUsers({
  search,
  page,
  limit,
  sort,
  order,
}: queryParams) {
  const skip = (page - 1) * limit;
  const where = search
    ? {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
          { username: { contains: search, mode: "insensitive" } },
        ],
      }
    : ({} as any);

  const [users, totalCount] = await Promise.all([
    prisma.user.findMany({
      where,
      skip,
      take: limit,
      orderBy: { [sort]: order },
    }),
    prisma.user.count({ where }),
  ]);

  const totalPages = Math.ceil(totalCount / limit);

  return { users, totalPages };
}

export async function getUserById(id: string) {
  return await prisma.user.findUnique({ where: { id: id } });
}
export async function getUserByLogin(username: string) {
  return await prisma.user.findUnique({
    where: { email: username },
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
