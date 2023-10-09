import { makeGetAllUsersUseCase } from "@/use-cases/factories/make-get-all-users-use-case";
import { FastifyReply } from "fastify";

export async function getAllUsers(_:any,reply:FastifyReply ) {

  const getAll = await makeGetAllUsersUseCase()
  const response = await getAll.execute()

  return reply.status(200).send({ users : response })
}