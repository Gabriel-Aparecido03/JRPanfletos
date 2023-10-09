import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { RegisterUserUseCase } from "../users/register-user";
 
export async function makeRegisterUsersUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const useCase = new RegisterUserUseCase(prismaUsersRepository)

  return useCase
}