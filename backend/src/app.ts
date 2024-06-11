import express from "express"
import {
  getAllCars,
  createCar,
  getACar,
  deleteCar,
  updateCar,
} from "./controllers/cars.controller"

const app = express()

app.use(express.json())
app.route("/api/v1/cars").get(getAllCars).post(createCar)
app.route("/api/v1/cars/:id").get(getACar).patch(updateCar).delete(deleteCar)

export default app
