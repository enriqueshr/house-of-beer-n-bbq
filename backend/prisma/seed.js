require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

const menuItems = [
  // Appetizers
  { name: 'Hiyayakko', description: 'Cold tofu garnished with grind ginger and chopped green onions.', price: 215, category: 'APPETIZERS', sortOrder: 1 },
  { name: 'Agaydashi Tofu', description: 'Fried tofu in a dashi/soya-based sauce and garnished with grated radish and spring onion.', price: 265, category: 'APPETIZERS', sortOrder: 2 },
  { name: 'Mabu Tofu', description: 'Tofu cooked in spicy chilly bean based sauce with minced meat.', price: 355, category: 'APPETIZERS', sortOrder: 3 },
  { name: 'Chicken Taki-Rousse', description: 'Cold cut chicken topped with jelly.', price: 375, category: 'APPETIZERS', sortOrder: 4 },
  { name: 'Teba Teriyaki', description: 'Fried chicken wing with teriyaki sauce.', price: 365, category: 'APPETIZERS', imageUrl: '/images/gallery/food-12.jpg', sortOrder: 5 },
  { name: 'Chicken Teriyaki', description: 'Fried chicken with teriyaki sauce and rice.', price: 495, category: 'APPETIZERS', sortOrder: 6 },
  { name: 'Fried Vegetable', description: 'Stir fried vegetable in sauce.', price: 265, category: 'APPETIZERS', sortOrder: 7 },
  { name: 'Chicken Yakitori', description: 'Chicken and onion skewers (5 pieces).', price: 495, category: 'APPETIZERS', sortOrder: 8 },
  { name: 'Goma-ae', description: 'Blanched spinach in a sweetened soya sauce with sesame dressing.', price: 185, category: 'APPETIZERS', sortOrder: 9 },
  { name: 'Crab & Cucumber Salad', description: 'Crab, cucumber with ponzu mayo dressing.', price: 355, category: 'APPETIZERS', sortOrder: 10 },
  { name: 'Karake', description: 'Fried chicken.', price: 375, category: 'APPETIZERS', imageUrl: '/images/gallery/food-9.jpg', sortOrder: 11 },
  { name: 'Prawn Tempura', description: 'Lightly battered, deep-fried prawns.', price: 695, category: 'APPETIZERS', sortOrder: 12 },
  { name: 'Chicken Tempura', description: 'Lightly battered, deep-fried chicken.', price: 475, category: 'APPETIZERS', sortOrder: 13 },
  { name: 'Mixed Tempura', description: 'An assortment of battered, deep-fried seafood and vegetables.', price: 575, category: 'APPETIZERS', sortOrder: 14 },
  { name: 'Vegetable Tempura', description: 'Lightly battered, deep-fried seasonal vegetables.', price: 375, category: 'APPETIZERS', sortOrder: 15 },
  { name: 'Prawn Cutlet', description: 'Breaded and fried prawn cutlet.', price: 695, category: 'APPETIZERS', sortOrder: 16 },
  { name: 'Chicken Cutlet', description: 'Breaded and fried chicken cutlet.', price: 375, category: 'APPETIZERS', sortOrder: 17 },
  { name: 'Pork Cutlet', description: 'Breaded and fried pork cutlet.', price: 475, category: 'APPETIZERS', sortOrder: 18 },
  { name: 'Potato Cutlet', description: 'Breaded and fried potato cutlet.', price: 280, category: 'APPETIZERS', sortOrder: 19 },

  // Sushi
  { name: 'Vegetable Sushi', description: 'Tempura vegetable & cucumber.', price: 415, category: 'SUSHI', sortOrder: 1 },
  { name: 'Chicken Sushi', description: 'Smoked chicken & cucumber with spicy sauce.', price: 455, category: 'SUSHI', sortOrder: 2 },
  { name: 'Chi. Teriyaki Sushi', description: 'Teriyaki chicken & cucumber.', price: 495, category: 'SUSHI', sortOrder: 3 },
  { name: 'Maki Sushi', description: 'Salmon & cucumber.', price: 695, category: 'SUSHI', sortOrder: 4 },
  { name: 'Tamayaki Sushi', description: 'Tamayaki egg roll with spicy sauce.', price: 435, category: 'SUSHI', sortOrder: 5 },
  { name: 'Crispy Chicken Sushi', description: 'Crispy fried chicken & cucumber with spicy sauce.', price: 565, category: 'SUSHI', sortOrder: 6 },
  { name: 'Avocado Roll', description: 'Avocado & mayonnaise.', price: 455, category: 'SUSHI', sortOrder: 7 },
  { name: 'Prawn Tempura Roll', description: 'Prawn tempura & cucumber.', price: 575, category: 'SUSHI', sortOrder: 8 },
  { name: 'Salmon Avocado Roll', description: 'Salmon, avocado and cucumber with mayonnaise.', price: 775, category: 'SUSHI', sortOrder: 9 },
  { name: 'California Roll', description: 'Cucumber, avocado, crab & mayonnaise.', price: 575, category: 'SUSHI', sortOrder: 10 },
  { name: 'Salmon Roll', description: 'Salmon, cucumber & mayonnaise.', price: 695, category: 'SUSHI', sortOrder: 11 },
  { name: 'California Tempura Style', description: 'Tempura-battered California roll with spicy sauce.', price: 655, category: 'SUSHI', sortOrder: 12 },
  { name: 'Spicy Crab Roll', description: 'Tempura crab, avocado with spicy sauce.', price: 635, category: 'SUSHI', sortOrder: 13 },
  { name: 'Spicy Tuna Roll', description: 'Tuna & cucumber with spicy sauce.', price: 715, category: 'SUSHI', sortOrder: 14 },
  { name: 'Mixed Nigiri Sushi', description: 'Salmon, tuna, crab & tamago.', price: 1175, category: 'SUSHI', sortOrder: 15 },
  { name: 'Sushi Platter (Ichi)', description: 'Uramaki salmon roll, uramaki tuna roll, futomaki California roll. 24 pieces, customizable.', price: 1895, category: 'SUSHI', sortOrder: 16 },
  { name: 'Sushi Platter (Ni)', description: 'Uramaki salmon/tuna roll, uramaki California roll, futomaki chicken roll. 24 pieces, customizable.', price: 1695, category: 'SUSHI', sortOrder: 17 },
  { name: 'Veg. Sushi Platter (San)', description: 'Uramaki avocado roll, futomaki vegetable roll, futomaki tempura roll. 24 pieces, customizable.', price: 1195, category: 'SUSHI', sortOrder: 18 },

  // Noodles
  { name: 'Tempura Udon', description: 'Battered and fried seafood and vegetable on top of noodle soup.', price: 475, category: 'NOODLES', sortOrder: 1 },
  { name: 'Kamonan Udon', description: 'Chicken and green onion on top of noodle soup.', price: 475, category: 'NOODLES', sortOrder: 2 },
  { name: 'Zaru Udon', description: 'Cold udon noodles served with a cup of dashi-based dipping sauce.', price: 465, category: 'NOODLES', sortOrder: 3 },
  { name: 'Chicken Yaki Udon', description: 'Fried udon noodles with vegetables and chicken.', price: 475, category: 'NOODLES', sortOrder: 4 },
  { name: 'Pork Yaki Udon', description: 'Fried udon noodles with vegetables and pork.', price: 535, category: 'NOODLES', sortOrder: 5 },
  { name: 'Vegetable Yaki Udon', description: 'Fried udon noodles with vegetables.', price: 365, category: 'NOODLES', sortOrder: 6 },
  { name: 'Egg Yaki Udon', description: 'Fried udon noodles with vegetables and egg.', price: 435, category: 'NOODLES', sortOrder: 7 },
  { name: 'Vegetable Keema Noodles', description: 'Stir-fried noodles with minced vegetables.', price: 255, category: 'NOODLES', sortOrder: 8 },
  { name: 'Chicken Keema Noodles', description: 'Stir-fried noodles with minced chicken.', price: 325, category: 'NOODLES', sortOrder: 9 },
  { name: 'Buff Keema Noodles', description: 'Stir-fried noodles with minced buff.', price: 375, category: 'NOODLES', sortOrder: 10 },
  { name: 'Pork Keema Noodles', description: 'Stir-fried noodles with minced pork.', price: 375, category: 'NOODLES', sortOrder: 11 },

  // Main Course
  { name: 'Chicken Shougayaki', description: 'Stir-fried chicken and onion in ginger.', price: 395, category: 'MAIN_COURSE', sortOrder: 1 },
  { name: 'Pork Shougayaki', description: 'Stir-fried pork and onion in ginger.', price: 475, category: 'MAIN_COURSE', imageUrl: '/images/gallery/food-11.jpg', sortOrder: 2 },
  { name: 'Katsu Curry Rice', description: 'Pork or chicken cutlet on curry rice.', price: 575, category: 'MAIN_COURSE', sortOrder: 3 },
  { name: 'Curry Rice', description: 'Japanese-style chicken or pork curry rice with carrot and potatoes.', price: 545, category: 'MAIN_COURSE', sortOrder: 4 },
  { name: 'Om Rice', description: 'Tomato-flavored chicken rice covered by omelet.', price: 365, category: 'MAIN_COURSE', sortOrder: 5 },
  { name: 'Pork Belly', description: 'Grilled pork belly with onions.', price: 475, category: 'MAIN_COURSE', sortOrder: 6 },
  { name: 'Katsu Don', description: 'Pork or chicken cutlet & egg on top of rice.', price: 565, category: 'MAIN_COURSE', sortOrder: 7 },
  { name: 'Oyako Don', description: 'Boiled chicken & egg on top of rice.', price: 485, category: 'MAIN_COURSE', sortOrder: 8 },

  // Bento & Set Menu
  { name: 'Makunouchi Bento', description: 'Lunch box with chicken, prawn cutlet and vegetable.', price: 685, category: 'BENTO_SETS', sortOrder: 1 },
  { name: 'Chi-Teriyaki Bento', description: 'Lunch box with meat and vegetable.', price: 685, category: 'BENTO_SETS', sortOrder: 2 },
  { name: 'Salmon Teriyaki Bento', description: 'Salmon teriyaki & vegetable.', price: 1555, category: 'BENTO_SETS', sortOrder: 3 },
  { name: 'Sushi Bento', description: 'Nigiri and maki sushi with vegetable.', price: 1195, category: 'BENTO_SETS', sortOrder: 4 },
  { name: 'Tonkatsu Bento', description: 'Pork cutlet and vegetable.', price: 685, category: 'BENTO_SETS', sortOrder: 5 },
  { name: 'Veg. Bento', description: 'Potato cutlet with tofu & salad.', price: 575, category: 'BENTO_SETS', sortOrder: 6 },
  { name: 'Prawn Bento', description: 'Prawn tempura with mabu tofu.', price: 885, category: 'BENTO_SETS', sortOrder: 7 },
  { name: 'Teriyaki Set - Chicken', description: 'Chicken, rice & miso soup with pickle.', price: 595, category: 'BENTO_SETS', sortOrder: 8 },
  { name: 'Teriyaki Set - Mix Tempura', description: 'Mix tempura, mabu, rice & miso soup with pickle.', price: 755, category: 'BENTO_SETS', sortOrder: 9 },
  { name: 'Teriyaki Set - Chicken/Pork', description: 'Chicken or pork, rice & miso soup with pickle.', price: 655, category: 'BENTO_SETS', sortOrder: 10 },
  { name: 'Shougayaki Set', description: 'Chicken or pork, rice & miso soup with pickle.', price: 585, category: 'BENTO_SETS', sortOrder: 11 },

  // Sides
  { name: 'Rice', description: 'Steamed rice.', price: 105, category: 'SIDES', sortOrder: 1 },
  { name: 'Miso Soup', description: 'Traditional Japanese miso soup.', price: 105, category: 'SIDES', sortOrder: 2 },

  // Nepali Veg & Sides
  { name: 'Aloo (Sadeko/Jeera/Mustang)', description: 'Nepali-style potato preparation.', price: 255, category: 'NEPALI_VEG', sortOrder: 1 },
  { name: 'Fries / Chilly Fries', description: 'Crispy fries, plain or tossed in chilli.', price: 225, category: 'NEPALI_VEG', sortOrder: 2 },
  { name: 'Bhatmas / Peanuts Masala', description: 'Spiced soybeans or peanuts.', price: 195, category: 'NEPALI_VEG', sortOrder: 3 },
  { name: 'Green Bhatmas (Seasonal)', description: 'Seasonal spiced green soybeans.', price: 245, category: 'NEPALI_VEG', sortOrder: 4 },
  { name: 'Saute Veg', description: 'Lightly sauteed seasonal vegetables.', price: 325, category: 'NEPALI_VEG', sortOrder: 5 },
  { name: 'Sweet Corn (Boil/Satey/Masala)', description: 'Sweet corn prepared boiled, satay-style, or masala.', price: 225, category: 'NEPALI_VEG', sortOrder: 6 },
  { name: 'Mix Veg Pakoda', description: 'Mixed vegetable fritters.', price: 295, category: 'NEPALI_VEG', sortOrder: 7 },
  { name: 'Tofu Chilli', description: 'Tofu tossed in a spicy chilli sauce.', price: 325, category: 'NEPALI_VEG', sortOrder: 8 },
  { name: 'Paneer Chilli / Tikka', description: 'Paneer tossed in chilli sauce or grilled tikka-style.', price: 525, category: 'NEPALI_VEG', sortOrder: 9 },
  { name: 'Mushroom (Chilli/Sadeko/Choila)', description: 'Mushroom prepared chilli, sadeko, or choila style.', price: 375, category: 'NEPALI_VEG', sortOrder: 10 },
  { name: 'Green Salad', description: 'Fresh seasonal green salad.', price: 325, category: 'NEPALI_VEG', sortOrder: 11 },
  { name: 'Veg Fried Rice', description: 'Wok-fried rice with vegetables.', price: 235, category: 'NEPALI_VEG', sortOrder: 12 },
  { name: 'Chicken Fried Rice', description: 'Wok-fried rice with chicken.', price: 325, category: 'NEPALI_VEG', imageUrl: '/images/gallery/food-5.jpg', sortOrder: 13 },
  { name: 'Buff Fried Rice', description: 'Wok-fried rice with buff.', price: 355, category: 'NEPALI_VEG', sortOrder: 14 },
  { name: 'Pork Fried Rice', description: 'Wok-fried rice with pork.', price: 355, category: 'NEPALI_VEG', sortOrder: 15 },
  { name: 'Mix Fried Rice', description: 'Wok-fried rice with a mix of meats.', price: 395, category: 'NEPALI_VEG', sortOrder: 16 },
  { name: 'Chicken Tikka / Malai', description: 'Tandoori-grilled marinated chicken.', price: 525, category: 'NEPALI_VEG', imageUrl: '/images/gallery/food-4.jpg', sortOrder: 17 },
  { name: 'Chicken Tikka / Malai (1/2 kg)', description: 'Tandoori-grilled marinated chicken, half kilo.', price: 755, category: 'NEPALI_VEG', sortOrder: 18 },
  { name: 'Chicken Tikka / Malai (1 kg)', description: 'Tandoori-grilled marinated chicken, one kilo.', price: 1225, category: 'NEPALI_VEG', sortOrder: 19 },

  // Momo
  { name: 'Veg Momo (Steam)', description: 'Steamed vegetable dumplings.', price: 205, category: 'MOMO', sortOrder: 1 },
  { name: 'Veg Momo (Kothe)', description: 'Pan-fried vegetable dumplings.', price: 255, category: 'MOMO', sortOrder: 2 },
  { name: 'Veg Momo (Chilli)', description: 'Vegetable dumplings tossed in chilli sauce.', price: 255, category: 'MOMO', sortOrder: 3 },
  { name: 'Veg Momo (Jhol)', description: 'Vegetable dumplings in a spiced soupy sauce.', price: 255, category: 'MOMO', sortOrder: 4 },
  { name: 'Veg Momo (Jhaneko)', description: 'Vegetable dumplings tempered in spiced oil.', price: 255, category: 'MOMO', sortOrder: 5 },
  { name: 'Chicken Momo (Steam)', description: 'Steamed chicken dumplings.', price: 275, category: 'MOMO', sortOrder: 6 },
  { name: 'Chicken Momo (Kothe)', description: 'Pan-fried chicken dumplings.', price: 325, category: 'MOMO', sortOrder: 7 },
  { name: 'Chicken Momo (Chilli)', description: 'Chicken dumplings tossed in chilli sauce.', price: 325, category: 'MOMO', sortOrder: 8 },
  { name: 'Chicken Momo (Jhol)', description: 'Chicken dumplings in a spiced soupy sauce.', price: 325, category: 'MOMO', sortOrder: 9 },
  { name: 'Chicken Momo (Jhaneko)', description: 'Chicken dumplings tempered in spiced oil.', price: 325, category: 'MOMO', sortOrder: 10 },
  { name: 'Buff Momo (Steam)', description: 'Steamed buff dumplings.', price: 305, category: 'MOMO', sortOrder: 11 },
  { name: 'Buff Momo (Kothe)', description: 'Pan-fried buff dumplings.', price: 345, category: 'MOMO', sortOrder: 12 },
  { name: 'Buff Momo (Chilli)', description: 'Buff dumplings tossed in chilli sauce.', price: 345, category: 'MOMO', sortOrder: 13 },
  { name: 'Buff Momo (Jhol)', description: 'Buff dumplings in a spiced soupy sauce.', price: 345, category: 'MOMO', sortOrder: 14 },
  { name: 'Buff Momo (Jhaneko)', description: 'Buff dumplings tempered in spiced oil.', price: 345, category: 'MOMO', sortOrder: 15 },

  // Nepali BBQ / House Specials
  { name: 'Karela & Egg', description: 'Bitter gourd stir-fried with egg.', price: 285, category: 'NEPALI_BBQ', sortOrder: 1 },
  { name: 'Cucumber & Peanuts Salad', description: 'Fresh cucumber salad with peanuts.', price: 295, category: 'NEPALI_BBQ', sortOrder: 2 },
  { name: 'Chicken Dry Masala', description: 'Chicken tossed in a dry spiced masala.', price: 445, category: 'NEPALI_BBQ', imageUrl: '/images/gallery/food-3.jpg', sortOrder: 3 },
  { name: 'Fish Fillet With Broccoli', description: 'Pan-seared fish fillet served with broccoli.', price: 585, category: 'NEPALI_BBQ', sortOrder: 4 },
  { name: 'Sausages With Egg & Mushroom', description: 'Grilled sausages with egg and mushroom.', price: 525, category: 'NEPALI_BBQ', imageUrl: '/images/gallery/food-2.jpg', sortOrder: 5 },
  { name: 'Buff Choila', description: 'Spiced, grilled buff tossed with herbs and mustard oil.', price: 475, category: 'NEPALI_BBQ', sortOrder: 6 },
  { name: 'Chicken Wings (Crunchy/Hot)', description: 'Crunchy or hot-spiced chicken wings.', price: 455, category: 'NEPALI_BBQ', imageUrl: '/images/gallery/food-8.jpg', sortOrder: 7 },
  { name: 'Pangra (Sadeko/Fry/Chilli)', description: 'Nepali-style pangra prepared sadeko, fried, or chilli style.', price: 425, category: 'NEPALI_BBQ', imageUrl: '/images/gallery/food-7.jpg', sortOrder: 8 },
  { name: 'Chicken (Honey Roast/Chilli/Timmur/Sadeko)', description: 'Chicken prepared honey roast, chilli, timmur, or sadeko style.', price: 455, category: 'NEPALI_BBQ', imageUrl: '/images/gallery/food-6.jpg', sortOrder: 9 },
  { name: 'Sausages (3pc) (Boil/Grill/Chilli/Sadeko)', description: 'Three-piece sausages, boiled, grilled, chilli, or sadeko style.', price: 425, category: 'NEPALI_BBQ', sortOrder: 10 },
  { name: 'Chicken Plate (With Bone)', description: 'Chicken BBQ/sekuwa/tawa plate, with bone. Choice of sadheko, masala, jhaneko, or sizzling.', price: 415, category: 'NEPALI_BBQ', imageUrl: '/images/gallery/food-1.jpg', sortOrder: 11 },
  { name: 'Chicken Plate (Boneless)', description: 'Chicken BBQ/sekuwa/tawa plate, boneless. Choice of sadheko, masala, jhaneko, or sizzling.', price: 525, category: 'NEPALI_BBQ', imageUrl: '/images/gallery/food-10.jpg', sortOrder: 12 },
  { name: 'Chicken (1/2 kg, With Bone)', description: 'Half kilo chicken BBQ/sekuwa/tawa, with bone. Choice of sadheko, masala, jhaneko, or sizzling.', price: 575, category: 'NEPALI_BBQ', sortOrder: 13 },
  { name: 'Chicken (1/2 kg, Boneless)', description: 'Half kilo chicken BBQ/sekuwa/tawa, boneless. Choice of sadheko, masala, jhaneko, or sizzling.', price: 775, category: 'NEPALI_BBQ', sortOrder: 14 },
  { name: 'Chicken (1 kg, With Bone)', description: 'One kilo chicken BBQ/sekuwa/tawa, with bone. Choice of sadheko, masala, jhaneko, or sizzling.', price: 955, category: 'NEPALI_BBQ', sortOrder: 15 },
  { name: 'Chicken (1 kg, Boneless)', description: 'One kilo chicken BBQ/sekuwa/tawa, boneless. Choice of sadheko, masala, jhaneko, or sizzling.', price: 1225, category: 'NEPALI_BBQ', sortOrder: 16 },
  { name: 'Pork Plate', description: 'Pork BBQ/sekuwa/tawa plate. Choice of sadheko, masala, jhaneko, or sizzling.', price: 525, category: 'NEPALI_BBQ', sortOrder: 17 },
  { name: 'Pork (1/2 kg)', description: 'Half kilo pork BBQ/sekuwa/tawa. Choice of sadheko, masala, jhaneko, or sizzling.', price: 755, category: 'NEPALI_BBQ', sortOrder: 18 },
  { name: 'Pork (1 kg)', description: 'One kilo pork BBQ/sekuwa/tawa. Choice of sadheko, masala, jhaneko, or sizzling.', price: 1255, category: 'NEPALI_BBQ', sortOrder: 19 },
  { name: 'Mutton Plate', description: 'Mutton BBQ/sekuwa/tawa plate. Choice of sadheko, masala, jhaneko, or sizzling.', price: 775, category: 'NEPALI_BBQ', sortOrder: 20 },
  { name: 'Mutton (1/2 kg)', description: 'Half kilo mutton BBQ/sekuwa/tawa. Choice of sadheko, masala, jhaneko, or sizzling.', price: 1455, category: 'NEPALI_BBQ', sortOrder: 21 },
  { name: 'Mutton (1 kg)', description: 'One kilo mutton BBQ/sekuwa/tawa. Choice of sadheko, masala, jhaneko, or sizzling.', price: 2725, category: 'NEPALI_BBQ', sortOrder: 22 },
];

async function main() {
  console.log('Clearing existing menu items...');
  await prisma.menuItem.deleteMany();

  console.log(`Seeding ${menuItems.length} menu items...`);
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
