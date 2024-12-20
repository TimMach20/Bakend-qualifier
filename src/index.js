import express from 'express'
import http from 'http'
import cors from 'cors'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { typeDefs } from './typeDefs.js'
import { resolvers } from './resolvers.js'
import { prisma } from './database.js'
import { PORT } from './config/properties.js'

/* eslint-disable no-console */

process.on('beforeExit', async () => {
  // Cerrar la conexión de Prisma al finalizar la aplicación
  await prisma.$disconnect()
  console.log('Prisma disconnected')
})

// Manejar señales para cerrar la conexión antes de salir
process.on('SIGINT', async () => {
  await prisma.$disconnect()
  console.log('Prisma disconnected on SIGINT')
  process.exit()
})

process.on('SIGTERM', async () => {
  await prisma.$disconnect()
  console.log('Prisma disconnected on SIGTERM')
  process.exit()
})

const app = express()
const httpServer = http.createServer(app)
const server = new ApolloServer({
  resolvers,
  typeDefs,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
})
await server.start()

app.use(
  '/graphql',
  cors(),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token })
  })
)

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve))

console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`)
