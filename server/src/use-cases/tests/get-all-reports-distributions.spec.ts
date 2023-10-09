import { ReportsDistributionsRepository } from "@/repositories/reports-distributions-repository"
import { DeleteReportDistributionUseCase } from "../reports-distributions/delete-report-distribution"
import { InMemoryReportsDistributionsRepository } from "@/repositories/in-memory/in-memory-reports-distributions-repository"
import { beforeEach, describe, expect, it } from "vitest"
import { GetAllReportDistributionUseCase } from "../reports-distributions/get-all-report-distribution"

let reportDistributionsRepository: InMemoryReportsDistributionsRepository
let sut : GetAllReportDistributionUseCase

describe('Get all report distributions',()=>{

  beforeEach(()=>{
    reportDistributionsRepository = new InMemoryReportsDistributionsRepository()
    sut = new GetAllReportDistributionUseCase(reportDistributionsRepository)
  })

  it("should be get all a report distribution",async()=>{
    reportDistributionsRepository.items.push({
      authorization_id : "authorization-id-01",
      created_at : new Date(),
      first_photo_url : "fake-url",
      id : "id-01",
      second_photo_url : "fake-url",
      third_photo_url : "fake-url",
      user_created_id : "user-created-id-01"
    })
    
    const items = await sut.execute()

    expect(items).toHaveLength(1)
    expect(items).toEqual([
      expect.objectContaining({ authorization_id : "authorization-id-01"})
    ])
  })
})