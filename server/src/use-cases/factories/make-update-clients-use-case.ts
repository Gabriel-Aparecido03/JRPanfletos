import { PrismaClientsRepository } from "@/repositories/prisma/prisma-clients-repository";
import { UpdateClientUseCase } from "../clients/update-client";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";

export async function makeUpdateClientsUseCase() {
  const prismaClientsRepository = new PrismaClientsRepository()
  const prismaUsersRepository = new PrismaUsersRepository()
  const useCase = new UpdateClientUseCase(prismaClientsRepository,prismaUsersRepository)

  return useCase
}