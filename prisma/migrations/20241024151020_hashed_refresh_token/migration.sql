/*
  Warnings:

  - You are about to drop the column `hashedParol` on the `staff` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `staff` table. All the data in the column will be lost.
  - Added the required column `hashedPassword` to the `staff` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "staff" DROP COLUMN "hashedParol",
DROP COLUMN "password",
ADD COLUMN     "hashedPassword" TEXT NOT NULL;
