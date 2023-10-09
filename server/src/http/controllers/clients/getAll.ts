import { makeGetAllClientsUseCase } from "@/use-cases/factories/make-get-all-clients-use-case";
import {  FastifyReply } from "fastify";

export async function getAllClients(_: any,reply:FastifyReply ) {
  const getAll = await makeGetAllClientsUseCase()
  const response = await getAll.execute()

  return reply.status(200).send(({ clients : response }))
}