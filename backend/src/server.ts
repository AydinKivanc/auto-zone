import { Server } from "http"
import app from "./app"
import { PrismaClient } from "@prisma/client"
import logger from "./config/logger" // Winston logger'ı import edin

const PORT = 3000
const prisma = new PrismaClient()

let server: Server
prisma
  .$connect()
  .then(() => {
    logger.info("Connected to SQL Database")
    server = app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`)
    })
  })
  .catch(err => {
    logger.error(`Failed to connect to SQL Database: ${err.message}`)
  })

const exitHandler = async () => {
  if (server) {
    server.close(async () => {
      logger.info("Server closed")
      await prisma.$disconnect()
      process.exit(0)
    })
  } else {
    process.exit(0)
  }
}

const unexpectedErrorHandler = (error: unknown) => {
  logger.error(error)
  exitHandler()
}

process.on("uncaughtException", unexpectedErrorHandler)
process.on("unhandledRejection", unexpectedErrorHandler)

process.on("SIGINT", async () => {
  logger.info("SIGINT signal received: closing HTTP server")
  await prisma.$disconnect()
  process.exit(0)
})

process.on("SIGTERM", async () => {
  logger.info("SIGTERM signal received: closing HTTP server")
  await prisma.$disconnect()
  process.exit(0)
})

// import app from "./app"

// const PORT = 3000

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`)
// })

// import app from "./app"
// import { PrismaClient } from "@prisma/client"

// const PORT = 3000
// const prisma = new PrismaClient()

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`)
// })

// process.on("SIGINT", async () => {
//   console.log("SIGINT signal received: closing HTTP server")
//   await prisma.$disconnect()
//   process.exit(0)
// })

// process.on("SIGTERM", async () => {
//   console.log("SIGTERM signal received: closing HTTP server")
//   await prisma.$disconnect()
//   process.exit(0)
// })
