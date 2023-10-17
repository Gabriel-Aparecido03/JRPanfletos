-- DropForeignKey
ALTER TABLE "authorizations_has_sectors" DROP CONSTRAINT "authorizations_has_sectors_sector_id_fkey";

-- DropForeignKey
ALTER TABLE "authorizations_of_distributions" DROP CONSTRAINT "authorizations_of_distributions_client_id_fkey";

-- DropForeignKey
ALTER TABLE "authorizations_of_distributions" DROP CONSTRAINT "authorizations_of_distributions_creation_user_id_fkey";

-- DropForeignKey
ALTER TABLE "clients" DROP CONSTRAINT "clients_user_created_id_fkey";

-- DropForeignKey
ALTER TABLE "reports_of_distributions" DROP CONSTRAINT "reports_of_distributions_authorization_id_fkey";

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_user_created_id_fkey" FOREIGN KEY ("user_created_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "authorizations_of_distributions" ADD CONSTRAINT "authorizations_of_distributions_creation_user_id_fkey" FOREIGN KEY ("creation_user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "authorizations_of_distributions" ADD CONSTRAINT "authorizations_of_distributions_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "authorizations_has_sectors" ADD CONSTRAINT "authorizations_has_sectors_sector_id_fkey" FOREIGN KEY ("sector_id") REFERENCES "sectors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports_of_distributions" ADD CONSTRAINT "reports_of_distributions_authorization_id_fkey" FOREIGN KEY ("authorization_id") REFERENCES "authorizations_of_distributions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
