import { Car } from "../interfaces/car.interface"
import * as carService from "../services/car.service"
import catchAsync from "../utils/catchAsync"

export const getAllCars = catchAsync(async (req, res) => {
  const cars = await carService.getAllCars()
  res.status(200).json(cars)
})

export const createCar = catchAsync(async (req, res) => {
  const newCar: Car = req.body
  const createdCar = await carService.createCar(newCar)
  res.status(201).json(createdCar)
})

export const getACar = catchAsync(async (req, res) => {
  const carId = parseInt(req.params.id)
  const car = await carService.getACar(carId)
  if (!car) {
    return res.status(404).json({ error: "Car not found" })
  }
  res.status(200).json(car)
})

export const updateCar = catchAsync(async (req, res) => {
  // !<input type="hidden" name="id" value={id} /> Bu sekilde body icinden getirilebilir veya ContextApi kullanilir
  const bodyCarId = req.body.id
  const carId = parseInt(req.params.id)
  if (carId !== bodyCarId) {
    return res.status(400).send("Blog ID'si eşleşmiyor")
  }
  const updatedCar: Car = req.body
  const car = await carService.updateCar(carId, updatedCar)
  res.json(car)
})

export const deleteCar = catchAsync(async (req, res) => {
  const carId = parseInt(req.params.id)
  await carService.deleteCar(carId)
  res.status(204).send()
})
