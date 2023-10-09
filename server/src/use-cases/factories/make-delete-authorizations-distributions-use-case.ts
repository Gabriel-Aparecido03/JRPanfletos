import { PrismaAuthorizationsDistributionsRepository } from "@/repositories/prisma/prisma-authorizations-distributions-repository";
import { DeleteAuthorizationsDistribtuionsUseCase } from "../authorizations-distributions/delete-authorization-distribution";

export async function makeDeleteAuthorizationsDistributionsUseCase() {
  const prismaAuthorizationRepository = new PrismaAuthorizationsDistributionsRepository()
  const useCase = new DeleteAuthorizationsDistribtuionsUseCase(prismaAuthorizationRepository)

  return useCase
}