-- CreateTable
CREATE TABLE "Stuff" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "is_active" TEXT NOT NULL,

    CONSTRAINT "Stuff_pkey" PRIMARY KEY ("id")
);
