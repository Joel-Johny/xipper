const prisma = require("./src/lib/prisma");

async function testPrisma() {
  try {
    // Test fetching users
    const users = await prisma.user.findMany();
    console.log("Users:", users);

    // Test fetching hotels
    const hotels = await prisma.hotel.findMany();
    console.log("Number of hotels:", hotels.length);
    console.log("First hotel:", hotels[0]);
  } catch (error) {
    console.error("Error testing Prisma:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testPrisma();
