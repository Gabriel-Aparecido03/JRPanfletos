import { makeDeleteClientsUseCase } from "@/use-cases/factories/make-delete-clients-use-case";
import console from "console";
import console from "console";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function deleteClient(request: FastifyRequest,reply:FastifyReply ) {
  const deleteBodySchema = z.object({
    id : z.string().uuid()
  })
  const { id } = deleteBodySchema.parse(request.params)
  try {
    const deleteClient = await makeDeleteClientsUseCase()
    await deleteClient.execute(id)
  }
  catch (err) {
    console.log(err)
    return reply.status(409).send(err)
  }

  return reply.status(200).send()
}