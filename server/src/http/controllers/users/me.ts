import { makeGetUserById } from "@/use-cases/factories/make-get-user-by-id"
import { FastifyRequest, FastifyReply } from "fastify"

export async function me(request: FastifyRequest, reply: FastifyReply) {
  const getUserProfile = await makeGetUserById()
  const user = await getUserProfile.execute(request.user.sub)
  return reply.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  })
}
