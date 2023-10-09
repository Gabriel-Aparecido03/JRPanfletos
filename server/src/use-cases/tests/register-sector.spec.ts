import { InMemorySectorsRepository } from "@/repositories/in-memory/in-memory-sectors-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { RegisterSectorsUseCase } from "../sectors/register-sector";

let sectorsRepository: InMemorySectorsRepository
let sut : RegisterSectorsUseCase

describe("Regsiter sector use case",()=>{

  beforeEach(()=>{
    sectorsRepository = new InMemorySectorsRepository()
    sut = new RegisterSectorsUseCase(sectorsRepository)
  })

  it("should be to register a sector",async()=>{
    const response = await sut.execute("id-01")
    expect(response?.name).toEqual("id-01")
  })
})