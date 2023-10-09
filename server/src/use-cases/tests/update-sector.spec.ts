import { InMemorySectorsRepository } from "@/repositories/in-memory/in-memory-sectors-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { UpdateSectorsUseCase } from "../sectors/update-sector";
import { InvalidCredentialsError } from "../erros/invalid-credentials-error";

let sectorsRepository: InMemorySectorsRepository
let sut : UpdateSectorsUseCase

describe("Get by id sector use case",()=>{

  beforeEach(()=>{
    sectorsRepository = new InMemorySectorsRepository()
    sut = new UpdateSectorsUseCase(sectorsRepository)
  })

  it("should be get by id sector",async()=>{
    sectorsRepository.items.push({
      id : "id-01",
      name : "name-01"
    })
    const response = await sut.execute({ id : "id-01" , name : "name-02-new"})
    expect(response.name).toEqual("name-02-new")
  })

  it("not should be get by id sector with non id",async()=>{
    sectorsRepository.items.push({
      id : "id-01",
      name : "name-01"
    })

    expect(async () =>{
      await sut.execute({ id : "id-02" , name : "name-02-new"})
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})