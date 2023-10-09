import { prisma } from "@/lib/prisma";
import { SectorsRepository } from "../sectors-repository";

export class PrismaSectorsRepository implements SectorsRepository {

  async create(name: string) {
    const sector = await prisma.sector.create({
      data : {
        name
      }
    })

    return sector
  }
  async update({ name,id}: { name: string; id: string; }) {

    const sector = await prisma.sector.update({
      where : {
        id
      },
      data : {
        name
      }
    })

    return sector
  }

  async delete(id: string) {
    await prisma.sector.delete({ where : { id }})
  }

  async getAll() {
    const sectors = await prisma.sector.findMany()
    return sectors
  }

  async getById(id: string) {
    const sector = await prisma.sector.findUnique({
      where : {
        id
      }
    })

    return sector
  }
  
}