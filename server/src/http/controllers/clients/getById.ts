import { makeGetAuthorizationById } from "@/use-cases/factories/make-get-authorization-by-id";
import { makeClientById } from "@/use-cases/factories/make-get-client-by-id";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getById(request: FastifyRequest,reply:FastifyReply ) {
  const getByIdParamsSchema = z.object({
    id : z.string().uuid(),
  })

  const data = getByIdParamsSchema.parse(request.body)

  try {
    const executer = await makeClientById()
    await executer.execute(data.id)
  }
  catch (err) {
    return reply.status(409).send(err)
  }

  return reply.status(201).send()
}