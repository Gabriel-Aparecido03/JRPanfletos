/*
  Warnings:

  - You are about to drop the column `report_id` on the `distributions_authorizations` table. All the data in the column will be lost.
  - You are about to drop the `distribution_reports_has_sector` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `authorization_id` to the `distributions_reports` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstPhotoUrl` to the `distributions_reports` table without a default value. This is not possible if the table is not empty.
  - Added the required column `secondPhotoUrl` to the `distributions_reports` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sector_id` to the `distributions_reports` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thirdPhotoUrl` to the `distributions_reports` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "distribution_reports_has_sector" DROP CONSTRAINT "distribution_reports_has_sector_distribution_id_fkey";

-- DropForeignKey
ALTER TABLE "distribution_reports_has_sector" DROP CONSTRAINT "distribution_reports_has_sector_sector_id_fkey";

-- DropForeignKey
ALTER TABLE "distributions_authorizations" DROP CONSTRAINT "distributions_authorizations_report_id_fkey";

-- AlterTable
ALTER TABLE "distributions_authorizations" DROP COLUMN "report_id";

-- AlterTable
ALTER TABLE "distributions_reports" ADD COLUMN     "authorization_id" TEXT NOT NULL,
ADD COLUMN     "firstPhotoUrl" TEXT NOT NULL,
ADD COLUMN     "secondPhotoUrl" TEXT NOT NULL,
ADD COLUMN     "sector_id" TEXT NOT NULL,
ADD COLUMN     "thirdPhotoUrl" TEXT NOT NULL;

-- DropTable
DROP TABLE "distribution_reports_has_sector";

-- CreateTable
CREATE TABLE "Streets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sector_id" TEXT NOT NULL,

    CONSTRAINT "Streets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Streets_name_key" ON "Streets"("name");

-- AddForeignKey
ALTER TABLE "distributions_reports" ADD CONSTRAINT "distributions_reports_sector_id_fkey" FOREIGN KEY ("sector_id") REFERENCES "Sector"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "distributions_reports" ADD CONSTRAINT "distributions_reports_authorization_id_fkey" FOREIGN KEY ("authorization_id") REFERENCES "distributions_authorizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Streets" ADD CONSTRAINT "Streets_sector_id_fkey" FOREIGN KEY ("sector_id") REFERENCES "Sector"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
