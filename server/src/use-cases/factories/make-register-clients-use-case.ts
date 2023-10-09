import { PrismaClientsRepository } from "@/repositories/prisma/prisma-clients-repository";
import { RegisterClientUseCase } from "../clients/register-client";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";


export async function makeRegisterClientsUseCase() {
  const prismaClientsRepository = new PrismaClientsRepository()
  const prismaUsersRepository = new PrismaUsersRepository()
  const useCase = new RegisterClientUseCase(prismaClientsRepository,prismaUsersRepository)

  return useCase
}