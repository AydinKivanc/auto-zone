import { PrismaClient } from "@prisma/client"
import { Car } from "../interfaces/car.interface"

const prisma = new PrismaClient()

export const getAllCars = async (): Promise<Car[]> => {
  return await prisma.cars.findMany()
}

export const createCar = async (newCar: Car): Promise<Car> => {
  return await prisma.cars.create({ data: newCar })
}

export const getACar = async (carId: number): Promise<Car | null> => {
  return await prisma.cars.findUnique({ where: { id: carId } })
}

//! PATCH icin uygun versiyonu
// export const updateCar = async (
//   carId: number,
//   updatedCar: Car
// ): Promise<Car> => {
//   return await prisma.cars.update({ where: { id: carId }, data: updatedCar })
// }
export const updateCar = async (
  carId: number,
  updatedCar: Car
): Promise<Car> => {
  return await prisma.cars.update({ where: { id: carId }, data: updatedCar })
}

export const deleteCar = async (carId: number): Promise<void> => {
  await prisma.cars.delete({ where: { id: carId } })
}
