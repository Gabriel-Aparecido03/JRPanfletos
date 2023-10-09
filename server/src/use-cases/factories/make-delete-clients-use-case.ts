import { PrismaClientsRepository } from "@/repositories/prisma/prisma-clients-repository";
import { DeleteClientUseCase } from "../clients/delete-client";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";

export async function makeDeleteClientsUseCase() {
  const prismaClientsRepository = new PrismaClientsRepository()
  const prismaUsersRepository = new PrismaUsersRepository()
  const useCase = new DeleteClientUseCase(prismaClientsRepository,prismaUsersRepository)

  return useCase
}