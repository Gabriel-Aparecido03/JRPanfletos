import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { UpdateUserUseCase } from "../users/update-user";

export async function makeUpdateUsersUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const useCase = new UpdateUserUseCase(prismaUsersRepository)

  return useCase
}