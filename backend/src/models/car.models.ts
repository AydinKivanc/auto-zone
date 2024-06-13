export interface Car {
  id: number
  brand: string
  model: string
  year: number
  color: string
  price: number
  mileage: number
  fuel_type: string
  transmission: string
  condition: string
}

/*

import { PrismaClient, Cars as PrismaCar } from "@prisma/client"

// Arayüzlerinizi buraya ekleyebilirsiniz
export interface Car extends PrismaCar {}

export const prisma = new PrismaClient()

*/
