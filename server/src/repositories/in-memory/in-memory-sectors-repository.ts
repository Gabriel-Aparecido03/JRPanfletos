import { Sector } from "@prisma/client";
import { SectorsRepository } from "../sectors-repository";
import { randomUUID } from "crypto";

export class InMemorySectorsRepository implements SectorsRepository {

  public items: Sector[] = []

  async create(name: string) {
    const item = {
      id : randomUUID(),
      name
    }

    this.items.push(item)
    return item
  }

  async update(data: { name: string; id: string; }) {
    const itemSelected = this.items.findIndex(item => item.id === data.id)
    this.items[itemSelected].name = data.name
    return this.items[itemSelected]
  }

  async delete(id: string) {
    const itemSelected = this.items.findIndex(item => item.id === id)
    this.items.splice(itemSelected,1)
  }

  async getAll() {
    return this.items
  }

  async getById(id: string) {
    const itemSelected = this.items.find(item => item.id === id)
    if(!itemSelected) {
      return null
    }
    return itemSelected
  }
  
}