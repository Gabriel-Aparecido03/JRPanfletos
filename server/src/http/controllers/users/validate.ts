import { makeGetUserById } from "@/use-cases/factories/make-get-user-by-id"
import { FastifyRequest, FastifyReply } from "fastify"

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const isValid = await request.jwtVerify()
  if(!isValid) {
    return reply.status(401).send()
  }
  return reply.status(200)
}
