import { PrismaClientsRepository } from "@/repositories/prisma/prisma-clients-repository";
import { GetClientById } from "../clients/get-client-by-id";

export async function makeClientById() {
  const prismaClientsRepository = new PrismaClientsRepository()
  const useCase = new GetClientById(prismaClientsRepository)

  return useCase
}