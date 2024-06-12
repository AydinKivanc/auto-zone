import { Request, Response, NextFunction } from "express"
import { PrismaClient } from "@prisma/client"
import { ErrorResponse } from "../interfaces/error.interface"
import { Car } from "../interfaces/car.interface"
import catchAsync from "../utils/catchAsync"

//const prisma = new PrismaClient()

export const testCarMiddleware = catchAsync(async (req, res, next) => {
  console.log("Get Car By Id Middleware Denemesi")
  next()
})

// export const getAllCars = async (
//   req: Request,
//   res: Response<Car[] | ErrorResponse>
// ) => {
//   try {
//     const cars = await prisma.cars.findMany()
//     res.status(200).json(cars)
//     console.log("getAllCars is working successfully")
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ error: "Internal Server Error" })
//   }
// }
