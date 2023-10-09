import { PrismaAuthorizationsDistributionsRepository } from "@/repositories/prisma/prisma-authorizations-distributions-repository";
import { DeleteAuthorizationsDistribtuionsUseCase } from "../authorizations-distributions/delete-authorization-distribution";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { PrismaSectorsRepository } from "@/repositories/prisma/prisma-sectors-repository";
import { PrismaClientsRepository } from "@/repositories/prisma/prisma-clients-repository";
import { RegisterAuthorizationsDistribtuionsUseCase } from "../authorizations-distributions/register-authorizations-distributions";

export async function makeRegisterAuthorizationsDistributionsUseCase() {
  const prismaAuthorizationRepository = new PrismaAuthorizationsDistributionsRepository()
  const prismaUsersRepository = new PrismaUsersRepository()
  const prismaSectorsRepository = new PrismaSectorsRepository()
  const prismaClients = new PrismaClientsRepository()

  const useCase = new RegisterAuthorizationsDistribtuionsUseCase(
    prismaUsersRepository,
    prismaSectorsRepository,
    prismaClients,
    prismaAuthorizationRepository
  )

  return useCase
}