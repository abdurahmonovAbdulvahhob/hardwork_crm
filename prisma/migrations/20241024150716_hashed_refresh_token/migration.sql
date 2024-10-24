/*
  Warnings:

  - A unique constraint covering the columns `[login]` on the table `stuff` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "stuff_login_key" ON "stuff"("login");
