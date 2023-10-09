import { PrismaAuthorizationsDistributionsRepository } from "@/repositories/prisma/prisma-authorizations-distributions-repository";
import { GetByIdAuthorizationsDistribtuionsUseCase } from "../authorizations-distributions/get-authorization-distribution-by-id";

export async function makeGetAuthorizationById() {
  const prismaAuthorization = new PrismaAuthorizationsDistributionsRepository()
  const useCase = new GetByIdAuthorizationsDistribtuionsUseCase(prismaAuthorization)

  return useCase
}