import { PrismaReportsDistributionsRepository } from "@/repositories/prisma/prisma-reports-distributions-repository";
import { GetByIdReportDistributionUseCase } from "../reports-distributions/get-by-id-report-distribution";

export async function makeGetReportById() {
  const prismaReports = new PrismaReportsDistributionsRepository()
  const useCase = new GetByIdReportDistributionUseCase(prismaReports)

  return useCase
}