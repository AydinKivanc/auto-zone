import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import { Car } from "../interfaces/car.interface"
import { ErrorResponse } from "../interfaces/error.interface"

const prisma = new PrismaClient()

// Get all cars
export const getAllCars = async (
  req: Request,
  res: Response<Car[] | ErrorResponse>
) => {
  try {
    const cars = await prisma.cars.findMany()
    res.json(cars)
    console.log("getAllCars is working successfully")
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal Server Error" })
  }
}

// Create a new car
export const createCar = async (
  req: Request,
  res: Response<Car | ErrorResponse>
) => {
  try {
    const newCar: Car = req.body
    const createdCar = await prisma.cars.create({ data: newCar })
    res.status(201).json(createdCar)
    console.log("createCar is working successfully")
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal Server Error" })
  }
}

// Get a car by ID
export const getACar = async (
  req: Request,
  res: Response<Car | ErrorResponse>
) => {
  const carId = parseInt(req.params.id) // Assuming the car ID is sent as a request parameter
  try {
    const car = await prisma.cars.findUnique({
      where: { id: carId },
    })
    if (!car) {
      return res.status(404).json({ error: "Car not found" })
    }
    res.json(car)
    console.log("getACar is working successfully")
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal Server Error" })
  }
}

// Update a car by ID
export const updateCar = async (
  req: Request,
  res: Response<Car | ErrorResponse>
) => {
  const carId = parseInt(req.params.id)
  try {
    const updatedCar: Car = req.body
    const car = await prisma.cars.update({
      where: { id: carId },
      data: updatedCar,
    })
    res.json(car)
    console.log("updateCar is working successfully")
  } catch (error: any) {
    console.error(error)
    if (error.code === "P2025") {
      res.status(404).json({ error: "Car not found" })
    } else {
      res.status(500).json({ error: "Internal Server Error" })
    }
  }
}

// Delete a car by ID
export const deleteCar = async (req: Request, res: Response<ErrorResponse>) => {
  const carId = parseInt(req.params.id)
  try {
    await prisma.cars.delete({
      where: { id: carId },
    })
    res.status(204).send() // No Content
    console.log("Car deleted")
  } catch (error: any) {
    console.error(error)
    if (error.code === "P2025") {
      res.status(404).json({ error: "Car not found" })
    } else {
      res.status(500).json({ error: "Internal Server Error" })
    }
  }
}
