import { PrismaSectorsRepository } from "@/repositories/prisma/prisma-sectors-repository";
import { UpdateSectorsUseCase } from "../sectors/update-sector";

export async function MakeUpdateSectorsUseCase() {
  const prismaSectorsRepository = new PrismaSectorsRepository()
  const useCase = new UpdateSectorsUseCase(prismaSectorsRepository)
  return useCase
}