import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { GetUserByIdUseCase } from "../users/get-user-by-id";

export async function makeGetUserById() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const useCase = new GetUserByIdUseCase(prismaUsersRepository)

  return useCase
}