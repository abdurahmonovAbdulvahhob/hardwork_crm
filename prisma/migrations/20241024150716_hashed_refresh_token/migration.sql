/*
  Warnings:

  - A unique constraint covering the columns `[login]` on the table `staff` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "staff_login_key" ON "staff"("login");
