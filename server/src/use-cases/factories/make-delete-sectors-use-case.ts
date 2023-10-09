import { PrismaSectorsRepository } from "@/repositories/prisma/prisma-sectors-repository";
import { DeleteSectorsUseCase } from "../sectors/delete-sector";

export async function MakeDeleteSectorsUseCase() {
  const prismaSectorsRepository = new PrismaSectorsRepository()
  const useCase = new DeleteSectorsUseCase(prismaSectorsRepository)
  return useCase
}