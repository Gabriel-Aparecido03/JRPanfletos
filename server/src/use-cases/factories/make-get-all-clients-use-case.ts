import { PrismaClientsRepository } from "@/repositories/prisma/prisma-clients-repository";
import { GetAllClientsUseCase } from "../clients/get-all-clients";

export async function makeGetAllClientsUseCase() {
  const prismaUsersRepository = new PrismaClientsRepository()
  const useCase = new GetAllClientsUseCase(prismaUsersRepository)

  return useCase
}