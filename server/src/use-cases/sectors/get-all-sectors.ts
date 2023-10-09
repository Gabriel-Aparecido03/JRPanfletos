import { SectorsRepository } from "@/repositories/sectors-repository"

export class GetAllSectorsUseCase {
  constructor( private sectorsRepository:SectorsRepository) {}

  async execute() {
    const sectors = await this.sectorsRepository.getAll()
    return sectors
  }
}