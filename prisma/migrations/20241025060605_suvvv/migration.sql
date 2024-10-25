/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `branch` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "group" ADD COLUMN     "branchId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "branch_name_key" ON "branch"("name");

-- AddForeignKey
ALTER TABLE "group" ADD CONSTRAINT "group_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;
