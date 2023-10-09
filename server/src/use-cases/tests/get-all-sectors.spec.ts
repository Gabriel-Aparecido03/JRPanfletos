import { InMemorySectorsRepository } from "@/repositories/in-memory/in-memory-sectors-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { GetAllSectorsUseCase } from "../sectors/get-all-sectors";

let sectorsRepository: InMemorySectorsRepository
let sut : GetAllSectorsUseCase

describe("Get All sectors use case",()=>{

  beforeEach(()=>{
    sectorsRepository = new InMemorySectorsRepository()
    sut = new GetAllSectorsUseCase(sectorsRepository)
  })

  it("should be get all sectors",async()=>{
    sectorsRepository.items.push({
      id : "id-01",
      name : "name-01"
    })
    const response = await sut.execute()
    expect(response).toHaveLength(1)
    expect(response).toEqual([
      expect.objectContaining({ name : "name-01"})
    ])
  })
})