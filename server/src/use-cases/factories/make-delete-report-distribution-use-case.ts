import { PrismaReportsDistributionsRepository } from "@/repositories/prisma/prisma-reports-distributions-repository"
import { DeleteReportDistributionUseCase } from "../reports-distributions/delete-report-distribution"

export async function MakeDeleteReportDistributionUseCase() {
  const prismaReportsDistributionsRepository = new PrismaReportsDistributionsRepository()
  const useCase = new DeleteReportDistributionUseCase(prismaReportsDistributionsRepository)

  return useCase
}