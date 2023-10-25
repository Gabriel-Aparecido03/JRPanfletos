import { MakeDeleteReportDistributionUseCase } from "@/use-cases/factories/make-delete-report-distribution-use-case";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function deleteReportDistributio(request: FastifyRequest,reply:FastifyReply ) {
  const deleteBodySchema = z.object({
    id : z.string().uuid()
  })

  const { id } = deleteBodySchema.parse(request.params)
  
  try {
    const deleteClient = await MakeDeleteReportDistributionUseCase()
    await deleteClient.execute( id )
  }
  catch (err) {
    return reply.status(409).send(err)
  }

  return reply.status(200).send()
}