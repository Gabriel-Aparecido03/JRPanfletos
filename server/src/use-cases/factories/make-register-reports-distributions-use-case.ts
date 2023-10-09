import { PrismaReportsDistributionsRepository } from "@/repositories/prisma/prisma-reports-distributions-repository"
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { PrismaAuthorizationsDistributionsRepository } from "@/repositories/prisma/prisma-authorizations-distributions-repository"
import { RegisterReportDistributionsUseCase } from "../reports-distributions/register-report-distributions"

export async function MakeRegisterReportDistributionUseCase() {
  const prismaReportsDistributionsRepository = new PrismaReportsDistributionsRepository()
  const prismaUsersRepository = new PrismaUsersRepository()
  const prismaAuthorization = new PrismaAuthorizationsDistributionsRepository()
  const useCase = new RegisterReportDistributionsUseCase(
    prismaReportsDistributionsRepository,
    prismaUsersRepository,
    prismaAuthorization
  )

  return useCase
}