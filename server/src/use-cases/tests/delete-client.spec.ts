import { InMemoryClientsRepository } from "@/repositories/in-memory/in-memory-clients-repoistory";
import { beforeEach, describe, expect, it } from "vitest";
import { DeleteClientUseCase } from "../clients/delete-client";
import { InvalidCredentialsError } from "../erros/invalid-credentials-error";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";

let clientsRepository : InMemoryClientsRepository
let sut : DeleteClientUseCase
let usersRepository : InMemoryUsersRepository
describe('Delete client use case',()=>{

  beforeEach(()=>{
    clientsRepository = new InMemoryClientsRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new DeleteClientUseCase(clientsRepository)
  })

  it("should be to delete a client",async()=>{

    usersRepository.items.push({
      cpf_number : "cpf-test",
      created_at : new Date(),
      email : "email-test",
      id : "id-test-user",
      name : "name-test",
      office : "office-test",
      password_hash : "passoword-hash-test",
      role : "COMMOM",
      updated_at : null,
      work_card_number : "work-card-number-test"
    })

    clientsRepository.items.push({
      cnpj : "cnpj-01",
      created_at : new Date(),
      email : "email-01",
      id : "id-01",
      phone : "phone-01",
      socialName : "social-name-01",
      updated_at : null,
      user_created_id : "id-test-user"
    })
    const response = await sut.execute("id-01")
    expect(response).toBeUndefined()
  })

  it("not should be to delete a client with non exists id",async()=>{
    usersRepository.items.push({
      cpf_number : "cpf-test",
      created_at : new Date(),
      email : "email-test",
      id : "id-test",
      name : "name-test",
      office : "office-test",
      password_hash : "passoword-hash-test",
      role : "COMMOM",
      updated_at : null,
      work_card_number : "work-card-number-test"
    })

    clientsRepository.items.push({
      cnpj : "cnpj-01",
      created_at : new Date(),
      email : "email-01",
      id : "id-01",
      phone : "phone-01",
      socialName : "social-name-01",
      updated_at : null,
      user_created_id : "id-test-user"
    })

    expect(async()=>{
      await sut.execute("id-02")
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})