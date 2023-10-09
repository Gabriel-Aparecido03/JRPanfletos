import { PrismaReportsDistributionsRepository } from "@/repositories/prisma/prisma-reports-distributions-repository"
import { GetAllReportDistributionUseCase } from "../reports-distributions/get-all-report-distribution"

export async function MakeGetAllReportDistributionUseCase() {
  const prismaReportsDistributionsRepository = new PrismaReportsDistributionsRepository()
  const useCase = new GetAllReportDistributionUseCase(prismaReportsDistributionsRepository)

  return useCase
}