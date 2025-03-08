const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  // Create a demo user
  const hashedPassword = await bcrypt.hash("password123", 10);
  const user = await prisma.user.upsert({
    where: { email: "demo@example.com" },
    update: {},
    create: {
      email: "demo@example.com",
      name: "Demo User",
      password: hashedPassword,
    },
  });

  // Create some hotels
  const hotels = [
    {
      name: "Royal Garden Resort",
      location: "Shimla, Himachal Pradesh",
      description:
        "A luxury resort nestled in the beautiful hills of Shimla, offering panoramic views of the Himalayas.",
      price: 7500,
      rating: 4.7,
      amenities: [
        "Swimming Pool",
        "Spa",
        "Restaurant",
        "Room Service",
        "Wi-Fi",
      ],
      roomTypes: ["Deluxe", "Super Deluxe", "Suite"],
      imageUrl:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
    },
    {
      name: "Beachside Paradise",
      location: "Goa, India",
      description:
        "Experience the serene beaches of Goa with direct beach access and stunning sunset views.",
      price: 8500,
      rating: 4.5,
      amenities: ["Beach Access", "Bar", "Restaurant", "Pool", "Wi-Fi"],
      roomTypes: ["Standard", "Deluxe", "Beach View"],
      imageUrl:
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
    },
    {
      name: "Heritage Palace Hotel",
      location: "Jaipur, Rajasthan",
      description:
        "A royal experience in the heart of the Pink City with architecture inspired by Rajasthani heritage.",
      price: 12000,
      rating: 4.8,
      amenities: ["Heritage Tours", "Spa", "Fine Dining", "Pool", "Wi-Fi"],
      roomTypes: ["Heritage Room", "Palace Suite", "Royal Suite"],
      imageUrl:
        "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
    },
  ];

  for (const hotel of hotels) {
    await prisma.hotel.create({
      data: hotel,
    });
  }

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
