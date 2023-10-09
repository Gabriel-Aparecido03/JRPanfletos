import { FastifyInstance } from "fastify"
import { getAllDistributionAuthorizaton } from "./getAll"
import { register } from "./register"
import { deleteDistributionAuthorizaton } from "./delete"
import { getById } from "./getById"
import { verifyJwt } from "@/http/middlewares/verify-jwt"

export async function authorizationsRoutes(app: FastifyInstance) {
  app.addHook('onRequest',verifyJwt)

  app.post('/authorization',register)
  app.get('/all-authorizations',getAllDistributionAuthorizaton)
  app.delete('/authorization/:id',deleteDistributionAuthorizaton)
  app.get('/authorization/:id',getById)
}
