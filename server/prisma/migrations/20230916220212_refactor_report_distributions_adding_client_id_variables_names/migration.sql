/*
  Warnings:

  - You are about to drop the column `firstPhotoUrl` on the `distributions_reports` table. All the data in the column will be lost.
  - You are about to drop the column `secondPhotoUrl` on the `distributions_reports` table. All the data in the column will be lost.
  - You are about to drop the column `thirdPhotoUrl` on the `distributions_reports` table. All the data in the column will be lost.
  - You are about to drop the `Sector` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Streets` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `client_id` to the `distributions_reports` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_photo_url` to the `distributions_reports` table without a default value. This is not possible if the table is not empty.
  - Added the required column `second_photo_url` to the `distributions_reports` table without a default value. This is not possible if the table is not empty.
  - Added the required column `third_photo_url` to the `distributions_reports` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_creation_id` to the `distributions_reports` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Streets" DROP CONSTRAINT "Streets_sector_id_fkey";

-- DropForeignKey
ALTER TABLE "distributions_reports" DROP CONSTRAINT "distributions_reports_sector_id_fkey";

-- AlterTable
ALTER TABLE "distributions_reports" DROP COLUMN "firstPhotoUrl",
DROP COLUMN "secondPhotoUrl",
DROP COLUMN "thirdPhotoUrl",
ADD COLUMN     "client_id" TEXT NOT NULL,
ADD COLUMN     "first_photo_url" TEXT NOT NULL,
ADD COLUMN     "second_photo_url" TEXT NOT NULL,
ADD COLUMN     "third_photo_url" TEXT NOT NULL,
ADD COLUMN     "user_creation_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "Sector";

-- DropTable
DROP TABLE "Streets";

-- CreateTable
CREATE TABLE "sectors" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "sectors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "streets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sector_id" TEXT NOT NULL,

    CONSTRAINT "streets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "streets_name_key" ON "streets"("name");

-- AddForeignKey
ALTER TABLE "distributions_reports" ADD CONSTRAINT "distributions_reports_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "distributions_reports" ADD CONSTRAINT "distributions_reports_user_creation_id_fkey" FOREIGN KEY ("user_creation_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "distributions_reports" ADD CONSTRAINT "distributions_reports_sector_id_fkey" FOREIGN KEY ("sector_id") REFERENCES "sectors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "streets" ADD CONSTRAINT "streets_sector_id_fkey" FOREIGN KEY ("sector_id") REFERENCES "sectors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
