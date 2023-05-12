import { Prisma, PrismaClient, User } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const generateUser = () => {
  const users = [];

  for (let index = 0; index < 1000; index++) {
    const user = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      birthDate: faker.date.birthdate().toDateString(),
    };

    users.push(user);
  }

  return users;
};

(async () => {
  console.log(`Start seeding 🍃🍃🍃`)

  const users = generateUser();

  await prisma.user.createMany({
    data: users,
  });

  console.log(`End seeding 🍃🍃🍃`)

  await prisma.$disconnect()
})();
