require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

const menuItems = [
  // Appetizers
  { name: 'Smoked Wings', description: 'Applewood-smoked wings tossed in your choice of dry rub or sauce.', price: 12.99, category: 'APPETIZERS', sortOrder: 1 },
  { name: 'Loaded Brisket Fries', description: 'Crispy fries topped with chopped brisket, cheese sauce, jalapenos, and pickled onion.', price: 14.99, category: 'APPETIZERS', sortOrder: 2 },
  { name: 'Fried Pickles', description: 'Beer-battered pickle chips with a smoky ranch dip.', price: 8.99, category: 'APPETIZERS', sortOrder: 3 },

  // BBQ Mains
  { name: 'Full Rack Ribs', description: 'St. Louis ribs, dry-rubbed and slow smoked, finished with house BBQ sauce.', price: 26.99, category: 'BBQ_MAINS', sortOrder: 1 },
  { name: 'Brisket Plate', description: '14-hour smoked brisket, sliced thick, with two sides.', price: 22.99, category: 'BBQ_MAINS', sortOrder: 2 },
  { name: 'Pulled Pork Sandwich', description: 'Slow-smoked pulled pork, house slaw, brioche bun.', price: 15.99, category: 'BBQ_MAINS', sortOrder: 3 },
  { name: 'Beer Can Chicken', description: 'Whole smoked chicken brined in our house lager.', price: 19.99, category: 'BBQ_MAINS', sortOrder: 4 },

  // Beer / Drinks
  { name: 'House Lager', description: 'Crisp, clean, brewed locally.', price: 6.5, category: 'BEER_DRINKS', sortOrder: 1 },
  { name: 'Smoked Amber Ale', description: 'Malty amber ale with a hint of smoke.', price: 7.5, category: 'BEER_DRINKS', sortOrder: 2 },
  { name: 'Bourbon Peach Tea', description: 'Sweet tea, bourbon, fresh peach.', price: 9.0, category: 'BEER_DRINKS', sortOrder: 3 },

  // Sides
  { name: 'Mac N Cheese', description: 'Smoked gouda and cheddar mac, toasted breadcrumb top.', price: 6.99, category: 'SIDES', sortOrder: 1 },
  { name: 'Collard Greens', description: 'Slow-cooked with smoked ham hock.', price: 5.99, category: 'SIDES', sortOrder: 2 },
  { name: 'Cornbread', description: 'Skillet-baked, honey butter.', price: 4.99, category: 'SIDES', sortOrder: 3 },

  // Desserts
  { name: 'Bourbon Pecan Pie', description: 'Warm, with a scoop of vanilla bean ice cream.', price: 8.99, category: 'DESSERTS', sortOrder: 1 },
  { name: 'Banana Pudding', description: 'Classic Southern style, vanilla wafers.', price: 6.99, category: 'DESSERTS', sortOrder: 2 },
];

async function main() {
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
