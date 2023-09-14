import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  //await prisma.user.deleteMany();
  const superAdmin = await prisma.user.upsert({
    where: { email: "superadmin@mail.com" },
    update: {},
    create: {
      name: "SuperAdmin",
      email: "superadmin@mail.com",
      dateOfBirth: new Date("1993-6-13"),
      role: "SUPERADMIN",
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
