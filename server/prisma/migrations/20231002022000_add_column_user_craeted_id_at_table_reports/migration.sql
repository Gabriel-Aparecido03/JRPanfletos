/*
  Warnings:

  - Added the required column `user_created_id` to the `reports_of_distributions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "authorizations_has_sectors" ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "reports_of_distributions" ADD COLUMN     "user_created_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "authorizations_has_sectors" ADD CONSTRAINT "authorizations_has_sectors_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports_of_distributions" ADD CONSTRAINT "reports_of_distributions_user_created_id_fkey" FOREIGN KEY ("user_created_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
