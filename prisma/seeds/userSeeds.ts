import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const superAdmin = await prisma.user.upsert({
    where: { email: "superadmin@mail.com" },
    update: {},
    create: {
      id: "clmjhsx490000ac7g03dkr0zf",
      name: "SuperAdmin",
      email: "superadmin@mail.com",
    },
  });

  console.log({ superAdmin });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
