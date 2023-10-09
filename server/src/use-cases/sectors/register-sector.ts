import { SectorsRepository } from "@/repositories/sectors-repository";
import { ResourceNotFound } from "../erros/resource-not-found-error";

export class RegisterSectorsUseCase {

  constructor( private sectorsRepository:SectorsRepository) {}

  async execute(name : string) {
    const sector  = await this.sectorsRepository.create(name)
    return sector
  }
}