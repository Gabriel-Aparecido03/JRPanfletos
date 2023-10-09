import { PrismaSectorsRepository } from "@/repositories/prisma/prisma-sectors-repository";
import { RegisterSectorsUseCase } from "../sectors/register-sector";

export async function MakeRegisterSectorsUseCase() {
  const prismaSectorsRepository = new PrismaSectorsRepository()
  const useCase = new RegisterSectorsUseCase(prismaSectorsRepository)
  return useCase
}