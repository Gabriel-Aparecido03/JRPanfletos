import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { DeleteUserUseCase } from "../users/delete-user";

export async function makeDeleteUsersUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const useCase = new DeleteUserUseCase(prismaUsersRepository)

  return useCase
}