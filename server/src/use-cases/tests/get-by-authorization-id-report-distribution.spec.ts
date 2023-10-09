import { InMemoryReportsDistributionsRepository } from "@/repositories/in-memory/in-memory-reports-distributions-repository"
import { beforeEach, describe, expect, it } from "vitest"
import { InvalidCredentialsError } from "../erros/invalid-credentials-error"
import { GetByAuthorizationIdReportDistributionUseCase } from "../reports-distributions/get-by-authorization-id-report-distribution"

let reportDistributionsRepository: InMemoryReportsDistributionsRepository
let sut : GetByAuthorizationIdReportDistributionUseCase

describe('Get by auhtorization id report distributions',()=>{

  beforeEach(()=>{
    reportDistributionsRepository = new InMemoryReportsDistributionsRepository()
    sut = new GetByAuthorizationIdReportDistributionUseCase(reportDistributionsRepository)
  })

  it("should be get by auhtorization id a report distribution",async()=>{
    reportDistributionsRepository.items.push({
      authorization_id : "authorization-id-01",
      created_at : new Date(),
      first_photo_url : "fake-url",
      id : "id-01",
      second_photo_url : "fake-url",
      third_photo_url : "fake-url",
      user_created_id : "user-created-id-01"
    })
    
    const response = await sut.execute("authorization-id-01")
    expect(response.id).toEqual("id-01")
  })

  it("not should be delete a report distribution with non exists id",async()=>{
    reportDistributionsRepository.items.push({
      authorization_id : "authorization-id-01",
      created_at : new Date(),
      first_photo_url : "fake-url",
      id : "id-01",
      second_photo_url : "fake-url",
      third_photo_url : "fake-url",
      user_created_id : "user-created-id-01"
    })
    
    expect(async ()=>{
      await sut.execute("id-01-error")
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})