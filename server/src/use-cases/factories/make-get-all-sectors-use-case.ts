import { PrismaSectorsRepository } from "@/repositories/prisma/prisma-sectors-repository";
import { GetAllSectorsUseCase } from "../sectors/get-all-sectors";

export async function MakeGetAllSectorsUseCase() {
  const prismaSectorsRepository = new PrismaSectorsRepository()
  const useCase = new GetAllSectorsUseCase(prismaSectorsRepository)
  return useCase
}