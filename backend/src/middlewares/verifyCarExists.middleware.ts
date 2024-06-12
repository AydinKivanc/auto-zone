import * as carService from "../services/car.service"
import catchAsync from "../utils/catchAsync"

export const verifyCarExists = catchAsync(async (req, res, next) => {
  const carId = parseInt(req.params.id)
  const car = await carService.getACar(carId)

  if (!car) {
    return res.status(404).json({ error: "Car not found" })
  }

  // Car found, attach it to the request object
  //req.car = car
  res.locals.car = car
  res.locals.carId = carId
  next()
})
