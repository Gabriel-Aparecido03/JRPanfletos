import { InMemoryAuthorizationsDistributionsRepository } from "@/repositories/in-memory/in-memory-authorizations-distributions-repository";
import { InMemoryClientsRepository } from "@/repositories/in-memory/in-memory-clients-repoistory";
import { InMemorySectorsRepository } from "@/repositories/in-memory/in-memory-sectors-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { beforeEach, describe,expect,it } from "vitest";
import { RegisterAuthorizationsDistribtuionsUseCase } from "../authorizations-distributions/register-authorizations-distributions";
import { InvalidCredentialsError } from "../erros/invalid-credentials-error";

let usersRepository : InMemoryUsersRepository
let clientsRepository : InMemoryClientsRepository
let sectorsRepositiory : InMemorySectorsRepository
let authorizationsDestributionsRepository : InMemoryAuthorizationsDistributionsRepository;
let sut : RegisterAuthorizationsDistribtuionsUseCase

describe("Register authorizations use case",()=>{
  
  beforeEach(()=>{

    usersRepository = new InMemoryUsersRepository()
    clientsRepository = new InMemoryClientsRepository()
    sectorsRepositiory = new InMemorySectorsRepository()
    authorizationsDestributionsRepository = new InMemoryAuthorizationsDistributionsRepository()

    sut = new RegisterAuthorizationsDistribtuionsUseCase(
      usersRepository,
      sectorsRepositiory,
      clientsRepository,
      authorizationsDestributionsRepository
    )
    
  })

  it("should be to create an authorizations distributions",async() => {
    clientsRepository.items.push({
      cnpj : "cnpj-01",
      created_at : new Date(),
      email : "email-01",
      id : "id-01-client",
      phone : "phone-01",
      socialName : "social-name-01",
      updated_at : null,
      user_created_id : "user-created-id-01"
    })

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

    sectorsRepositiory.items.push({
      id : "id-test-sector",
      name : "name-sector"
    })

    const response = await sut.execute({
      client_created_id : "id-01-client",
      sectorsOfDistributions : ["id-test-sector"],
      user_created_id : "id-test-user",
      value_of_thousand_in_cents : 1000
    })

    expect(response.client_id).toEqual("id-01-client")
    
  })

  it("not should be to create an authorizations distributions with non exist user id",async() => {
    clientsRepository.items.push({
      cnpj : "cnpj-01",
      created_at : new Date(),
      email : "email-01",
      id : "id-01-client",
      phone : "phone-01",
      socialName : "social-name-01",
      updated_at : null,
      user_created_id : "user-created-id-01"
    })

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

    sectorsRepositiory.items.push({
      id : "id-test-sector",
      name : "name-sector"
    })

    expect(async () => {
      await sut.execute({
        client_created_id : "id-01-client",
        sectorsOfDistributions : ["id-test-sector"],
        user_created_id : "id-test-user-error",
        value_of_thousand_in_cents : 1000
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it("not should be to create an authorizations distributions with non exist client id",async() => {
    clientsRepository.items.push({
      cnpj : "cnpj-01",
      created_at : new Date(),
      email : "email-01",
      id : "id-01-client",
      phone : "phone-01",
      socialName : "social-name-01",
      updated_at : null,
      user_created_id : "user-created-id-01"
    })

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

    sectorsRepositiory.items.push({
      id : "id-test-sector",
      name : "name-sector"
    })

    expect(async () => {
      await sut.execute({
        client_created_id : "id-01-client-error",
        sectorsOfDistributions : ["id-test-sector"],
        user_created_id : "id-test-user",
        value_of_thousand_in_cents : 1000
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it("not should be to create an authorizations distributions with non exist sectors id",async() => {
    clientsRepository.items.push({
      cnpj : "cnpj-01",
      created_at : new Date(),
      email : "email-01",
      id : "id-01-client",
      phone : "phone-01",
      socialName : "social-name-01",
      updated_at : null,
      user_created_id : "user-created-id-01"
    })

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

    sectorsRepositiory.items.push({
      id : "id-test-sector",
      name : "name-sector"
    })

    expect(async () => {
      await sut.execute({
        client_created_id : "id-01-client",
        sectorsOfDistributions : ["id-test-sector-error"],
        user_created_id : "id-test-user",
        value_of_thousand_in_cents : 1000
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})