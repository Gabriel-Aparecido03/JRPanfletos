import { InMemoryClientsRepository } from "@/repositories/in-memory/in-memory-clients-repoistory";
import { beforeEach, describe, expect, it } from "vitest";
import { InvalidCredentialsError } from "../erros/invalid-credentials-error";
import { RegisterClientUseCase } from "../clients/register-client";
import { ClientAlreadyExistsError } from "../erros/client-already-exists-error";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";

let clientsRepository : InMemoryClientsRepository
let usersRepository : InMemoryUsersRepository
let sut : RegisterClientUseCase

describe('Register client use case',()=>{

  beforeEach(()=>{
    clientsRepository = new InMemoryClientsRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterClientUseCase(clientsRepository,usersRepository)
  })

  it("should be to register a client",async()=>{
    usersRepository.items.push({
      cpf_number : "cpf-test",
      created_at : new Date(),
      email : "email-test",
      id : "user-created-id-01",
      name : "name-test",
      office : "office-test",
      password_hash : "passoword-hash-test",
      role : "COMMOM",
      updated_at : null,
      work_card_number : "work-card-number-test"
    })

    const { cnpj } = await sut.execute({
      cnpj : "86067149000103",
      email : "email-01",
      phone : "phone-01",
      socialName : "social-name-01",
      userCreatedId : "user-created-id-01"
    })

    expect(cnpj).toEqual("86067149000103")
  })

  it("not should be to register a client with invalid cnpj",async()=>{
    usersRepository.items.push({
      cpf_number : "cpf-test",
      created_at : new Date(),
      email : "email-test",
      id : "user-created-id-01",
      name : "name-test",
      office : "office-test",
      password_hash : "passoword-hash-test",
      role : "COMMOM",
      updated_at : null,
      work_card_number : "work-card-number-test"
    })

    expect(async()=>{
      await sut.execute({
        cnpj : "invalid cnpj",
        email : "email-01",
        phone : "phone-01",
        socialName : "social-name-01",
        userCreatedId : "user-created-id-01"
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it("not should be to register a client with repeated cnpj",async()=>{

    usersRepository.items.push({
      cpf_number : "cpf-test",
      created_at : new Date(),
      email : "email-test",
      id : "user-created-id-01",
      name : "name-test",
      office : "office-test",
      password_hash : "passoword-hash-test",
      role : "COMMOM",
      updated_at : null,
      work_card_number : "work-card-number-test"
    })

    clientsRepository.items.push({
      cnpj : "86067149000103",
      created_at : new Date(),
      email : "email-01",
      id : "id-01",
      phone : "phone-01",
      socialName : "social-name-01",
      updated_at : null,
      user_created_id : "user-created-id-01"
    })

    expect(async()=>{
      await sut.execute({
        cnpj : "86067149000103",
        email : "email-02",
        phone : "phone-01",
        socialName : "social-name-01",
        userCreatedId : "user-created-id-01"
      })
    }).rejects.toBeInstanceOf(ClientAlreadyExistsError)
  })

  it("not should be to register a client with repeated email",async()=>{

    usersRepository.items.push({
      cpf_number : "cpf-test",
      created_at : new Date(),
      email : "email-test",
      id : "user-created-id-01",
      name : "name-test",
      office : "office-test",
      password_hash : "passoword-hash-test",
      role : "COMMOM",
      updated_at : null,
      work_card_number : "work-card-number-test"
    })
    
    clientsRepository.items.push({
      cnpj : "86067149000103",
      created_at : new Date(),
      email : "email-01",
      id : "id-01",
      phone : "phone-01",
      socialName : "social-name-01",
      updated_at : null,
      user_created_id : "user-created-id-01"
    })

    expect(async()=>{
      await sut.execute({
        cnpj : "18690318000107",
        email : "email-01",
        phone : "phone-01",
        socialName : "social-name-01",
        userCreatedId : "user-created-id-01"
      })
    }).rejects.toBeInstanceOf(ClientAlreadyExistsError)
  })
})