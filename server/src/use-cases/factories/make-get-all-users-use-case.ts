import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { GetAllUsersUseCase } from "../users/get-all-users";

export async function makeGetAllUsersUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const useCase = new GetAllUsersUseCase(prismaUsersRepository)

  return useCase
} 