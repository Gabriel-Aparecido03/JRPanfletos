import { makeGetAllAuthorizationsDistributionsUseCase } from "@/use-cases/factories/make-get-all-authorizations-distributions-use-case";
import { FastifyReply } from "fastify";

export async function getAllDistributionAuthorizaton(_:any,reply:FastifyReply ) {

  const items = await makeGetAllAuthorizationsDistributionsUseCase()
  const response = await items.execute()

  return reply.status(200).send({ auhtorizationOfDistributions : response})
}