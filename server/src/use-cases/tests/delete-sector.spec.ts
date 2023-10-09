import { InMemorySectorsRepository } from "@/repositories/in-memory/in-memory-sectors-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { DeleteSectorsUseCase } from "../sectors/delete-sector";
import { ResourceNotFound } from "../erros/resource-not-found-error";

let sectorsRepository: InMemorySectorsRepository
let sut : DeleteSectorsUseCase

describe("Delete sector use case",()=>{

  beforeEach(()=>{
    sectorsRepository = new InMemorySectorsRepository()
    sut = new DeleteSectorsUseCase(sectorsRepository)
  })

  it("should be delete a sector",async()=>{
    sectorsRepository.items.push({
      id : "id-01",
      name : "name-01"
    })

    const response = await sut.execute("id-01")
    expect(response).toBeUndefined()
  })

  it("not should be delete a sector with non exists id",async()=>{
    sectorsRepository.items.push({
      id : "id-01",
      name : "name-01"
    })

    expect(async ()=>{
      await sut.execute("id-02")
    }).rejects.toBeInstanceOf(ResourceNotFound)
  })
})