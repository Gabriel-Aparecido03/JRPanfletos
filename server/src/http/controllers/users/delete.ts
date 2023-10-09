import { makeDeleteUsersUseCase } from "@/use-cases/factories/make-delete-users-use-case";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function deleteUser(request: FastifyRequest,reply:FastifyReply ) {
  const deleteBodySchema = z.object({
    id : z.string().uuid(),
    userActionId : z.string().uuid()
  })

  const { id,userActionId } = deleteBodySchema.parse(request.params)

  try {
    const deleteUser = await makeDeleteUsersUseCase()
    await deleteUser.execute({ id , user_action_id : userActionId })
  }
  
  catch (err) {
    return reply.status(409).send(err)
  }

  return reply.status(200).send()
}