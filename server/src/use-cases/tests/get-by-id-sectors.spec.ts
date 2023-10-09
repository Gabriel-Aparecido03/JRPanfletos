import { InMemorySectorsRepository } from "@/repositories/in-memory/in-memory-sectors-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { GetByIdSectorsUseCase } from "../sectors/get-sector-by-id";
import { ResourceNotFound } from "../erros/resource-not-found-error";

let sectorsRepository: InMemorySectorsRepository
let sut : GetByIdSectorsUseCase

describe("Get by id sector use case",()=>{

  beforeEach(()=>{
    sectorsRepository = new InMemorySectorsRepository()
    sut = new GetByIdSectorsUseCase(sectorsRepository)
  })

  it("should be get by id sector",async()=>{
    sectorsRepository.items.push({
      id : "id-01",
      name : "name-01"
    })
    const response = await sut.execute("id-01")
    expect(response.id).toEqual("id-01")
  })

  it("not should be get by id sector with non id",async()=>{
    sectorsRepository.items.push({
      id : "id-01",
      name : "name-01"
    })

    expect(async () =>{
     await sut.execute("id-02")
    }).rejects.toBeInstanceOf(ResourceNotFound)
  })
})