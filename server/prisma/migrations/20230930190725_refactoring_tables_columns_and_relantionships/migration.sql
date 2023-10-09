/*
  Warnings:

  - You are about to drop the `distributions_authorizations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `distributions_reports` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "distributions_authorizations" DROP CONSTRAINT "distributions_authorizations_client_id_fkey";

-- DropForeignKey
ALTER TABLE "distributions_authorizations" DROP CONSTRAINT "distributions_authorizations_creation_user_id_fkey";

-- DropForeignKey
ALTER TABLE "distributions_reports" DROP CONSTRAINT "distributions_reports_authorization_id_fkey";

-- DropForeignKey
ALTER TABLE "distributions_reports" DROP CONSTRAINT "distributions_reports_client_id_fkey";

-- DropForeignKey
ALTER TABLE "distributions_reports" DROP CONSTRAINT "distributions_reports_sector_id_fkey";

-- DropForeignKey
ALTER TABLE "distributions_reports" DROP CONSTRAINT "distributions_reports_user_creation_id_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "updated_at" TIMESTAMP(3);

-- DropTable
DROP TABLE "distributions_authorizations";

-- DropTable
DROP TABLE "distributions_reports";

-- CreateTable
CREATE TABLE "authorizations_of_distributions" (
    "id" TEXT NOT NULL,
    "creation_user_id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "value_of_thousand_in_cents" INTEGER NOT NULL,

    CONSTRAINT "authorizations_of_distributions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "authorizations_has_sectors" (
    "id" TEXT NOT NULL,
    "sector_id" TEXT NOT NULL,
    "authorization_of_distribution_id" TEXT NOT NULL,

    CONSTRAINT "authorizations_has_sectors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reports_of_distributions" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "first_photo_url" TEXT NOT NULL,
    "second_photo_url" TEXT NOT NULL,
    "third_photo_url" TEXT NOT NULL,
    "authorization_id" TEXT NOT NULL,

    CONSTRAINT "reports_of_distributions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "reports_of_distributions_authorization_id_key" ON "reports_of_distributions"("authorization_id");

-- AddForeignKey
ALTER TABLE "authorizations_of_distributions" ADD CONSTRAINT "authorizations_of_distributions_creation_user_id_fkey" FOREIGN KEY ("creation_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "authorizations_of_distributions" ADD CONSTRAINT "authorizations_of_distributions_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "authorizations_has_sectors" ADD CONSTRAINT "authorizations_has_sectors_authorization_of_distribution_i_fkey" FOREIGN KEY ("authorization_of_distribution_id") REFERENCES "authorizations_of_distributions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "authorizations_has_sectors" ADD CONSTRAINT "authorizations_has_sectors_sector_id_fkey" FOREIGN KEY ("sector_id") REFERENCES "sectors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports_of_distributions" ADD CONSTRAINT "reports_of_distributions_authorization_id_fkey" FOREIGN KEY ("authorization_id") REFERENCES "authorizations_of_distributions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
