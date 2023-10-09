/*
  Warnings:

  - You are about to drop the column `workr_card_number` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cpf_number]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[work_card_number]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `work_card_number` to the `users` table without a default value. This is not possible if the table is not empty.
  - Made the column `office` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "workr_card_number",
ADD COLUMN     "work_card_number" TEXT NOT NULL,
ALTER COLUMN "office" SET NOT NULL;

-- DropEnum
DROP TYPE "DocumentType";

-- CreateTable
CREATE TABLE "distributions_authorizations" (
    "id" TEXT NOT NULL,
    "creation_user_id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "report_id" TEXT NOT NULL,

    CONSTRAINT "distributions_authorizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "distributions_reports" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "distributions_reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "distribution_reports_has_sector" (
    "id" TEXT NOT NULL,
    "sector_id" TEXT NOT NULL,
    "distribution_id" TEXT NOT NULL,

    CONSTRAINT "distribution_reports_has_sector_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sector" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Sector_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_cpf_number_key" ON "users"("cpf_number");

-- CreateIndex
CREATE UNIQUE INDEX "users_work_card_number_key" ON "users"("work_card_number");

-- AddForeignKey
ALTER TABLE "distributions_authorizations" ADD CONSTRAINT "distributions_authorizations_creation_user_id_fkey" FOREIGN KEY ("creation_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "distributions_authorizations" ADD CONSTRAINT "distributions_authorizations_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "distributions_authorizations" ADD CONSTRAINT "distributions_authorizations_report_id_fkey" FOREIGN KEY ("report_id") REFERENCES "distributions_reports"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "distribution_reports_has_sector" ADD CONSTRAINT "distribution_reports_has_sector_distribution_id_fkey" FOREIGN KEY ("distribution_id") REFERENCES "distributions_reports"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "distribution_reports_has_sector" ADD CONSTRAINT "distribution_reports_has_sector_sector_id_fkey" FOREIGN KEY ("sector_id") REFERENCES "Sector"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
