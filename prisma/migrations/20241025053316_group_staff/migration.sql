/*
  Warnings:

  - You are about to drop the column `branchId` on the `group` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "group" DROP CONSTRAINT "group_branchId_fkey";

-- AlterTable
ALTER TABLE "group" DROP COLUMN "branchId";
