import { Car } from "../models/car.models"
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
  const car = res.locals.car
  //res.status(200).json({message:"get a car succes"})
  res.status(200).json(car)
})

export const updateCar = catchAsync(async (req, res) => {
  const carId = parseInt(req.params.id)
  const updatedCar: Car = req.body
  const car = await carService.updateCar(carId, updatedCar)
  res.json(car)
})

export const deleteCar = catchAsync(async (req, res) => {
  const carId = res.locals.carId
  await carService.deleteCar(carId)
  res.status(204).send()
})
