import { Sector } from "@prisma/client";

export interface SectorsRepository {
  create(name:string) : Promise< Sector >
  update(data: { name : string; id : string}) : Promise < Sector >
  delete(id:string): Promise<void>

  getAll(): Promise<Sector[]>
  getById(id:string) : Promise< Sector | null >
}