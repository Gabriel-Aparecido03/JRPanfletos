import { PrismaClientsRepository } from "@/repositories/prisma/prisma-clients-repository";
import { DeleteClientUseCase } from "../clients/delete-client";

export async function makeDeleteClientsUseCase() {
  const prismaClientsRepository = new PrismaClientsRepository()
  const useCase = new DeleteClientUseCase(prismaClientsRepository)

  return useCase
}