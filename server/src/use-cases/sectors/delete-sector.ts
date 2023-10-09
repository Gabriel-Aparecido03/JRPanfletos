import { SectorsRepository } from "@/repositories/sectors-repository";
import { ResourceNotFound } from "../erros/resource-not-found-error";

export class DeleteSectorsUseCase {

  constructor( private sectorsRepository:SectorsRepository) {}

  async execute(id : string) {
    const sectorExists = await this.sectorsRepository.getById(id)
    if(!sectorExists) {
      throw new ResourceNotFound()
    }

    await this.sectorsRepository.delete(id)
  }
}