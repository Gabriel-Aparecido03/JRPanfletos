import { PrismaSectorsRepository } from "@/repositories/prisma/prisma-sectors-repository";
import { GetByIdSectorsUseCase } from "../sectors/get-sector-by-id";

export async function makeGetSectorById() {
  const prismaSectorRepository = new PrismaSectorsRepository()
  const useCase = new GetByIdSectorsUseCase(prismaSectorRepository)

  return useCase
}