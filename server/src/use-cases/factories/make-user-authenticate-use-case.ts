import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { AuthenticateUserUseCase } from "../users/authenticate";

export async function makeUserAuhtenticationUseCase() {
  const prismaUserRepository = new PrismaUsersRepository()
  const useCase = new AuthenticateUserUseCase(prismaUserRepository)

  return useCase
}