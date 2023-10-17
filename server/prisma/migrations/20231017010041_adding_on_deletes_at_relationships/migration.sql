-- DropForeignKey
ALTER TABLE "authorizations_has_sectors" DROP CONSTRAINT "authorizations_has_sectors_authorization_of_distribution_i_fkey";

-- DropForeignKey
ALTER TABLE "reports_of_distributions" DROP CONSTRAINT "reports_of_distributions_user_created_id_fkey";

-- AddForeignKey
ALTER TABLE "authorizations_has_sectors" ADD CONSTRAINT "authorizations_has_sectors_authorization_of_distribution_i_fkey" FOREIGN KEY ("authorization_of_distribution_id") REFERENCES "authorizations_of_distributions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports_of_distributions" ADD CONSTRAINT "reports_of_distributions_user_created_id_fkey" FOREIGN KEY ("user_created_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
