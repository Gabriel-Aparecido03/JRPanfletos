/*
  Warnings:

  - You are about to drop the `streets` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "streets" DROP CONSTRAINT "streets_sector_id_fkey";

-- DropTable
DROP TABLE "streets";
