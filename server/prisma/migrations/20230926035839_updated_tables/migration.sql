/*
  Warnings:

  - A unique constraint covering the columns `[authorization_id]` on the table `distributions_reports` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `sectors` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "distributions_reports_authorization_id_key" ON "distributions_reports"("authorization_id");

-- CreateIndex
CREATE UNIQUE INDEX "sectors_name_key" ON "sectors"("name");
