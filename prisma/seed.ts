import { PrismaClient, UserRole } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data (dev only)
  await prisma.review.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  // Users
  const [admin, user] = await Promise.all([
    prisma.user.create({
      data: {
        email: "admin@example.com",
        name: "Admin User",
        role: UserRole.ADMIN,
      },
    }),
    prisma.user.create({
      data: {
        email: "user@example.com",
        name: "Sample Customer",
        role: UserRole.USER,
      },
    }),
  ]);

  // Categories
  const [shoes, tshirts, jeans] = await Promise.all([
    prisma.category.create({
      data: {
        name: "Shoes",
        slug: "shoes",
      },
    }),
    prisma.category.create({
      data: {
        name: "T-shirts",
        slug: "t-shirts",
      },
    }),
    prisma.category.create({
      data: {
        name: "Jeans",
        slug: "jeans",
      },
    }),
  ]);

  // Products (using images in public/images)
  await prisma.product.createMany({
    data: [
      {
        name: "Running Shoes Pro",
        slug: "running-shoes-pro",
        description: "Lightweight running shoes with great cushioning.",
        price: 89.0,
        currency: "USD",
        images: ["/images/p11-1.jpg", "/images/p11-2.jpg"],
        stock: 25,
        isActive: true,
        categoryId: shoes.id,
      },
      {
        name: "Casual Sneakers",
        slug: "casual-sneakers",
        description: "Everyday sneakers that go with anything.",
        price: 75.0,
        currency: "USD",
        images: ["/images/p12-1.jpg", "/images/p12-2.jpg"],
        stock: 40,
        isActive: true,
        categoryId: shoes.id,
      },
      {
        name: "Graphic T-Shirt",
        slug: "graphic-tshirt",
        description: "Soft cotton T-shirt with a modern graphic print.",
        price: 29.0,
        currency: "USD",
        images: ["/images/p21-1.jpg", "/images/p21-2.jpg"],
        stock: 60,
        isActive: true,
        categoryId: tshirts.id,
      },
      {
        name: "Plain White Tee",
        slug: "plain-white-tee",
        description: "Classic white T-shirt, perfect for layering.",
        price: 19.0,
        currency: "USD",
        images: ["/images/p22-1.jpg", "/images/p22-2.jpg"],
        stock: 80,
        isActive: true,
        categoryId: tshirts.id,
      },
      {
        name: "Slim Fit Jeans",
        slug: "slim-fit-jeans",
        description: "Slim fit denim with a bit of stretch.",
        price: 59.0,
        currency: "USD",
        images: ["/images/p31-1.jpg", "/images/p31-2.jpg"],
        stock: 35,
        isActive: true,
        categoryId: jeans.id,
      },
      {
        name: "Relaxed Fit Jeans",
        slug: "relaxed-fit-jeans",
        description: "Relaxed fit for all-day comfort.",
        price: 62.0,
        currency: "USD",
        images: ["/images/p32-1.jpg", "/images/p32-2.jpg"],
        stock: 30,
        isActive: true,
        categoryId: jeans.id,
      },
    ],
  });

  console.log("Seed data created:", {
    adminEmail: admin.email,
    userEmail: user.email,
    categories: ["Shoes", "T-shirts", "Jeans"],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

