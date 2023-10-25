import { ClientsRepository } from "@/repositories/clients-repository";
import { ClientAlreadyExistsError } from "../erros/client-already-exists-error";
import { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "../erros/invalid-credentials-error";

interface updateClientRequest {
  id : string;
  email :string;
  phone : string;
  userActionId: string;
}

export class UpdateClientUseCase {

  constructor (
    private clientsRepository: ClientsRepository ,
    private usersRepository : UsersRepository
    ) {}

  async execute(data : updateClientRequest) {
    const clientUsingThisEmail = await this.clientsRepository.findByEmail(data.email)
    const isRepeatedEmail = !clientUsingThisEmail === null && clientUsingThisEmail?.id === data.id
    if(isRepeatedEmail) {
      throw new ClientAlreadyExistsError()
    }

    const userExist = await this.usersRepository.findById(data.userActionId)
    if(!userExist) {
      throw new InvalidCredentialsError()
    }

    const client = await this.clientsRepository.update(data)

    return client
  }
}