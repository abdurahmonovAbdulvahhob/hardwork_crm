-- AlterTable
ALTER TABLE "stuff" ALTER COLUMN "first_name" DROP NOT NULL,
ALTER COLUMN "last_name" DROP NOT NULL,
ALTER COLUMN "phone_number" DROP NOT NULL,
ALTER COLUMN "is_active" DROP NOT NULL;
