/*
  Warnings:

  - You are about to drop the `Stuff` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Stuff";

-- CreateTable
CREATE TABLE "stuff" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "is_active" TEXT NOT NULL,

    CONSTRAINT "stuff_pkey" PRIMARY KEY ("id")
);
