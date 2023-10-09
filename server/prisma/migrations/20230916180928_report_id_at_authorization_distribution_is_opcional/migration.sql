-- DropForeignKey
ALTER TABLE "distributions_authorizations" DROP CONSTRAINT "distributions_authorizations_report_id_fkey";

-- AlterTable
ALTER TABLE "distributions_authorizations" ALTER COLUMN "report_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "distributions_authorizations" ADD CONSTRAINT "distributions_authorizations_report_id_fkey" FOREIGN KEY ("report_id") REFERENCES "distributions_reports"("id") ON DELETE SET NULL ON UPDATE CASCADE;
