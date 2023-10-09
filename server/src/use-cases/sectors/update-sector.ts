import { SectorsRepository } from "@/repositories/sectors-repository";
import { ResourceNotFound } from "../erros/resource-not-found-error";
import { InvalidCredentialsError } from "../erros/invalid-credentials-error";

export class UpdateSectorsUseCase {

  constructor( private sectorsRepository:SectorsRepository) {}

  async execute({ id, name} : { name :string;id:string}) {
    const sectorExists  = await this.sectorsRepository.getById(id)
    if(!sectorExists) {
      throw new InvalidCredentialsError()
    }
    const sector = await this.sectorsRepository.update({ id , name})
    return sector
  }
}