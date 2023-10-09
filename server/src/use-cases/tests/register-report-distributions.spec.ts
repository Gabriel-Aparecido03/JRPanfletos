import { ReportsDistributionsRepository } from "@/repositories/reports-distributions-repository"
import { DeleteReportDistributionUseCase } from "../reports-distributions/delete-report-distribution"
import { InMemoryReportsDistributionsRepository } from "@/repositories/in-memory/in-memory-reports-distributions-repository"
import { beforeEach, describe, expect, it } from "vitest"
import { InvalidCredentialsError } from "../erros/invalid-credentials-error"
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository"
import { InMemoryAuthorizationsDistributionsRepository } from "@/repositories/in-memory/in-memory-authorizations-distributions-repository"
import { RegisterReportDistributionsUseCase } from "../reports-distributions/register-report-distributions"

let reportDistributionsRepository: InMemoryReportsDistributionsRepository
let usersRepository : InMemoryUsersRepository
let authorizationsRepository : InMemoryAuthorizationsDistributionsRepository
let sut : RegisterReportDistributionsUseCase

describe('Register report distributions',()=>{

  beforeEach(()=>{
    reportDistributionsRepository = new InMemoryReportsDistributionsRepository()
    usersRepository = new InMemoryUsersRepository(),
    authorizationsRepository = new InMemoryAuthorizationsDistributionsRepository()

    sut = new RegisterReportDistributionsUseCase(
      reportDistributionsRepository,
      usersRepository,
      authorizationsRepository
    )
  })

  it("should be register a report distribution",async()=>{

    usersRepository.items.push({
      cpf_number : "cpf-test",
      created_at : new Date(),
      email : "email-test",
      id : "id-user",
      name : "name-test",
      office : "office-test",
      password_hash : "passoword-hash-test",
      role : "COMMOM",
      updated_at : null,
      work_card_number : "work-card-number-test"
    })

    authorizationsRepository.items.push({
      client_id : "client-id",
      created_at : new Date(),
      creation_user_id : "user-id",
      id : "id-authorization",
      sectorsOfDistributions : [
        "01","02"
      ],
      value_of_thousand_in_cents : 100
    })
    
    const response = await sut.execute({
      authorization_id : "id-authorization",
      first_photo_url : "fake-url",
      second_photo_url : "fake-url",
      third_photo_url : "fake-url",
      user_created_id : "id-user"
    })

    expect(response.id).toEqual(expect.any(String))
  })

  it("not should be register a report distribution with authorization non exists",async()=>{
    usersRepository.items.push({
      cpf_number : "cpf-test",
      created_at : new Date(),
      email : "email-test",
      id : "id-user",
      name : "name-test",
      office : "office-test",
      password_hash : "passoword-hash-test",
      role : "COMMOM",
      updated_at : null,
      work_card_number : "work-card-number-test"
    })

    authorizationsRepository.items.push({
      client_id : "client-id",
      created_at : new Date(),
      creation_user_id : "user-id",
      id : "id-authorization",
      sectorsOfDistributions : [
        "01","02"
      ],
      value_of_thousand_in_cents : 100
    })


    expect(async() => {
      await sut.execute({
        authorization_id : "id-authorization-error",
        first_photo_url : "fake-url",
        second_photo_url : "fake-url",
        third_photo_url : "fake-url",
        user_created_id : "id-user"
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  
  it("not should be register a report distribution with authorization non exists",async()=>{
    usersRepository.items.push({
      cpf_number : "cpf-test",
      created_at : new Date(),
      email : "email-test",
      id : "id-user",
      name : "name-test",
      office : "office-test",
      password_hash : "passoword-hash-test",
      role : "COMMOM",
      updated_at : null,
      work_card_number : "work-card-number-test"
    })

    authorizationsRepository.items.push({
      client_id : "client-id",
      created_at : new Date(),
      creation_user_id : "user-id",
      id : "id-authorization",
      sectorsOfDistributions : [
        "01","02"
      ],
      value_of_thousand_in_cents : 100
    })

    expect(async() => {
      await sut.execute({
        authorization_id : "id-authorization",
        first_photo_url : "fake-url",
        second_photo_url : "fake-url",
        third_photo_url : "fake-url",
        user_created_id : "id-user-error"
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})