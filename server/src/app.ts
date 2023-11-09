import fastify from "fastify";
import { usersRoutes } from "./http/controllers/users/routes";
import { sectorRoutes } from "./http/controllers/sectors/routes";
import { authorizationsRoutes } from "./http/controllers/authorizationDistribution/routes";
import { reportRoutes } from "./http/controllers/reportDistribution/routes";
import { clientsRoutes } from "./http/controllers/clients/routes";
import fastifyJwt from "@fastify/jwt";
import { env } from "./env";
import cors from '@fastify/cors'

export const app = fastify()

app.register(cors, {
  origin : '*'
})

app.register(fastifyJwt, {
  secret : env.JWT_SECRET,
  sign : {
    expiresIn : "7d"
  }
})

app.register(usersRoutes)
app.register(clientsRoutes)
app.register(sectorRoutes)
app.register(authorizationsRoutes)
app.register(reportRoutes)