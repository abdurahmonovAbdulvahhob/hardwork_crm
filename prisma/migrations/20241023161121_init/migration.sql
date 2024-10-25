/*
  Warnings:

  - You are about to drop the column `call_number` on the `branch` table. All the data in the column will be lost.
  - You are about to drop the column `reason_lid` on the `reason_lid` table. All the data in the column will be lost.
  - You are about to drop the column `role_name` on the `role` table. All the data in the column will be lost.
  - Added the required column `callNumber` to the `branch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reasonLid` to the `reason_lid` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `role` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "branch" DROP COLUMN "call_number",
ADD COLUMN     "callNumber" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "reason_lid" DROP COLUMN "reason_lid",
ADD COLUMN     "reasonLid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "role" DROP COLUMN "role_name",
ADD COLUMN     "name" TEXT NOT NULL;
