import { MakeGetAllReportDistributionUseCase } from "@/use-cases/factories/make-get-all-reports-distributions-use-case";
import { FastifyRequest, FastifyReply } from "fastify";

export async function getAll(_: FastifyRequest,reply:FastifyReply ) {
  const getAll = await MakeGetAllReportDistributionUseCase()
  const response = await getAll.execute()

  return reply.status(200).send({ response })
}