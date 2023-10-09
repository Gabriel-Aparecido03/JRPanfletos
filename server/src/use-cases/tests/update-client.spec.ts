import { InMemoryClientsRepository } from "@/repositories/in-memory/in-memory-clients-repoistory";
import { beforeEach, describe, expect, it } from "vitest";
import { DeleteClientUseCase } from "../clients/delete-client";
import { nvalidCredentialsError } from "../erros/invalid-credentials-error";
import { GetClientById } from "../clients/get-client-by-id";
import { ResourceNotFound } from "../erros/resource-not-found-error";
import { RegisterClientUseCase } from "../clients/register-client";
import { ClientAlreadyExistsError } from "../erros/client-already-exists-error";
import { UpdateClientUseCase } from "../clients/update-client";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";

let clientsRepository : InMemoryClientsRepository
let usersRepository : InMemoryUsersRepository
let sut : UpdateClientUseCase

describe('Update client use case',()=>{

  beforeEach(()=>{
    clientsRepository = new InMemoryClientsRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new UpdateClientUseCase(clientsRepository,usersRepository)
  })

  it("should be to update a client",async()=>{

    usersRepository.items.push({
      cpf_number : "cpf-test",
      created_at : new Date(),
      email : "email-test",
      id : "id-test-user",
      name : "name-test",
      office : "office-test",
      password_hash : "passoword-hash-test",
      role : "ADMIN",
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

    
    const { email } = await sut.execute({
      email : "email-01-new",
      phone : "phone-01",
      id : "id-01",
      userActionId : "id-test-user"
    })

    expect(email).toEqual("email-01-new")
  })

  it("not should be to register a client with repeated email",async()=>{
    usersRepository.items.push({
      cpf_number : "cpf-test",
      created_at : new Date(),
      email : "email-test",
      id : "id-test-user",
      name : "name-test",
      office : "office-test",
      password_hash : "passoword-hash-test",
      role : "ADMIN",
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

    clientsRepository.items.push({
      cnpj : "cnpj-02",
      created_at : new Date(),
      email : "email-02",
      id : "id-02",
      phone : "phone-02",
      socialName : "social-name-02",
      updated_at : null,
      user_created_id : "id-test-user"
    })

    expect(async()=>{
      await sut.execute({
        email : "email-02",
        phone : "phone-01",
        id : "id-01",
        userActionId : "id-test-user"
      })
    }).rejects.toBeInstanceOf(ClientAlreadyExistsError)
  })
})