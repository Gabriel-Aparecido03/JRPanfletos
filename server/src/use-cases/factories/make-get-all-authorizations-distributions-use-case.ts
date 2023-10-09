import { PrismaAuthorizationsDistributionsRepository } from "@/repositories/prisma/prisma-authorizations-distributions-repository";
import { GetAllAuthorizationsDistribtuionsUseCase } from "../authorizations-distributions/get-all-authorizations-distributions";

export async function makeGetAllAuthorizationsDistributionsUseCase() {
  const prismaAuthorizationRepository = new PrismaAuthorizationsDistributionsRepository()
  const useCase = new GetAllAuthorizationsDistribtuionsUseCase(prismaAuthorizationRepository)

  return useCase
}