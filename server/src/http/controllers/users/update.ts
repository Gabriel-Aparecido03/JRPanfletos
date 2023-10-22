import { makeUpdateUsersUseCase } from "@/use-cases/factories/make-update-users-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function update(request: FastifyRequest,reply:FastifyReply ) {
  const updateBodySchema = z.object({
    role: z.enum(["ADMIN","COMMOM"]).default("COMMOM"),
    office: z.string().min(1).max(20).optional(),
    email: z.string().email().optional(),
    password: z.string().optional(),
    id:z.string().uuid(),
    user_action_id : z.string().uuid()
  })
  const data = updateBodySchema.parse(request.body)
  try {
    const update = await makeUpdateUsersUseCase()
    await update.execute(data)
  }
  catch (err) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}