import { makeGetReportById } from "@/use-cases/factories/make-get-report-by-id";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getById(request: FastifyRequest,reply:FastifyReply ) {
  const getByIdParamsSchema = z.object({
    id : z.string().uuid(),
  })

  const data = getByIdParamsSchema.parse(request.params)

  try {
    const executer = await makeGetReportById()
    const res = await executer.execute(data.id)
   return reply.status(200).send(res)

  }
  catch (err) {
    return reply.status(409).send(err)
  }

}