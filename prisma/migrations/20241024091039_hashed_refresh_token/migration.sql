/*
  Warnings:

  - Added the required column `hashedParol` to the `staff` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "staff" ADD COLUMN     "hashedParol" TEXT NOT NULL,
ADD COLUMN     "hashedRefreshToken" TEXT;
