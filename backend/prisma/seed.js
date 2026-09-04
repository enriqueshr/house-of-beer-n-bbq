require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

const menuItems = [
  // Appetizers
  { name: 'Chicken Sekuwa', description: 'Spiced grilled chicken skewers, a house classic, served with tomato dip.', price: 11.99, category: 'APPETIZERS', imageUrl: '/images/gallery/food-1.jpg', sortOrder: 1 },
  { name: 'Sausage & Mushroom Sizzler', description: 'Grilled sausages with mushrooms, onions, and egg on a sizzling platter.', price: 12.99, category: 'APPETIZERS', imageUrl: '/images/gallery/food-2.jpg', sortOrder: 2 },
  { name: 'Crispy Chicken Sekuwa', description: 'Extra-crispy spiced chicken bites, smoked and charred.', price: 11.99, category: 'APPETIZERS', imageUrl: '/images/gallery/food-8.jpg', sortOrder: 3 },
  { name: 'Golden Fried Chicken Bites', description: 'Crispy fried chicken bites, deeply spiced.', price: 10.99, category: 'APPETIZERS', imageUrl: '/images/gallery/food-9.jpg', sortOrder: 4 },
  { name: 'Chicken Sekuwa with Peanut Sauce', description: 'Grilled chicken sekuwa served with a rich peanut dipping sauce.', price: 12.99, category: 'APPETIZERS', imageUrl: '/images/gallery/food-12.jpg', sortOrder: 5 },

  // BBQ Mains
  { name: 'Chicken Chhoila', description: 'Spicy pan-seared chicken tossed with charred onion and herbs.', price: 14.99, category: 'BBQ_MAINS', imageUrl: '/images/gallery/food-3.jpg', sortOrder: 1 },
  { name: 'Chicken Tikka Skewers', description: 'Marinated chicken skewers grilled and topped with green chutney.', price: 15.99, category: 'BBQ_MAINS', imageUrl: '/images/gallery/food-4.jpg', sortOrder: 2 },
  { name: 'Sekuwa Rice Combo', description: 'Grilled chicken skewers served with smoky fried rice.', price: 16.99, category: 'BBQ_MAINS', imageUrl: '/images/gallery/food-5.jpg', sortOrder: 3 },
  { name: 'Chicken Skewers with Pickled Onion', description: 'Char-grilled chicken skewers with tangy pickled onion.', price: 14.99, category: 'BBQ_MAINS', imageUrl: '/images/gallery/food-6.jpg', sortOrder: 4 },
  { name: 'Chili Chicken', description: 'Wok-tossed chicken with bell peppers in a spicy glaze.', price: 15.99, category: 'BBQ_MAINS', imageUrl: '/images/gallery/food-7.jpg', sortOrder: 5 },
  { name: 'Grilled Sekuwa with Lime', description: 'Charcoal-grilled chicken sekuwa with fresh lime and onion.', price: 15.99, category: 'BBQ_MAINS', imageUrl: '/images/gallery/food-10.jpg', sortOrder: 6 },
  { name: 'Herb Chili Chicken', description: 'Chili chicken stir-fry finished with fresh herbs.', price: 15.99, category: 'BBQ_MAINS', imageUrl: '/images/gallery/food-11.jpg', sortOrder: 7 },
];

async function main() {
  console.log('Clearing existing menu items...');
  await prisma.menuItem.deleteMany();

  console.log('Seeding menu items...');
  for (const item of menuItems) {
    await prisma.menuItem.create({ data: item });
  }

  const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@houseofbeernbbq.com';
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'ChangeMe123!';
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  console.log(`Seeding admin user: ${adminEmail}`);
  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {},
    create: { email: adminEmail, passwordHash, name: 'Admin' },
  });

  console.log('Seed complete.');
  console.log(`Admin login -> email: ${adminEmail} / password: ${adminPassword}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
