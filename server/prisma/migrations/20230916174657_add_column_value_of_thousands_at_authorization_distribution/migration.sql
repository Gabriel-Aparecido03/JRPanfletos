/*
  Warnings:

  - Added the required column `value_of_thousand_in_cents` to the `distributions_authorizations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "distributions_authorizations" ADD COLUMN     "value_of_thousand_in_cents" INTEGER NOT NULL;
