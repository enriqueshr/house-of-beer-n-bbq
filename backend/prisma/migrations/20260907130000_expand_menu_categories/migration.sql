-- Expand MenuCategory enum to match the real printed menu structure
ALTER TYPE "MenuCategory" RENAME TO "MenuCategory_old";

CREATE TYPE "MenuCategory" AS ENUM ('APPETIZERS', 'SUSHI', 'NOODLES', 'MAIN_COURSE', 'BENTO_SETS', 'NEPALI_VEG', 'MOMO', 'NEPALI_BBQ', 'SIDES', 'BEER_DRINKS', 'DESSERTS');

ALTER TABLE "MenuItem" ALTER COLUMN "category" TYPE "MenuCategory" USING ("category"::text::"MenuCategory");

DROP TYPE "MenuCategory_old";
