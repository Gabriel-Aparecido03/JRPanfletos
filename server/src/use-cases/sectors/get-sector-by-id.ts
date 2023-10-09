import { SectorsRepository } from "@/repositories/sectors-repository"
import { ResourceNotFound } from "../erros/resource-not-found-error"

export class GetByIdSectorsUseCase {
  constructor( private sectorsRepository:SectorsRepository) {}

  async execute(id:string) {
    const sector = await this.sectorsRepository.getById(id)
    if(!sector) {
      throw new ResourceNotFound()
    }
    return sector
  }
}