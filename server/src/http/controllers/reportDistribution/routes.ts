import { FastifyInstance } from "fastify";
import { deleteReportDistributio } from "./delete";
import { register } from "./register";
import { getAll } from "./get-all";
import { getById } from "./getById";
import { verifyJwt } from "@/http/middlewares/verify-jwt";

export async function reportRoutes(app: FastifyInstance) {
  app.addHook('onRequest',verifyJwt)

  app.post('/reports',register)
  app.get('/all-reports',getAll)
  app.delete('/reports/:id',deleteReportDistributio)
  app.get('/report/:id',getById) 
}
