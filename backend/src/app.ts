import express from "express"
import morgan from "morgan" // Morgan'ı import edin

import {
  getAllCars,
  createCar,
  getACar,
  deleteCar,
  updateCar,
} from "./controllers/cars.controller"
import { authMiddleware } from "./middlewares/auth.middleware"
import { testMiddleware } from "./middlewares/test.middleware"
import { testCarMiddleware } from "./middlewares/testCar.middleware"

const app = express()

app.use(morgan("dev")) // Morgan'ı kullanarak HTTP isteklerini loglama

app.use(express.json())
app.use(express.urlencoded({ extended: true })) //gelen POST isteklerin gövdesindeki Form verilerini otomatik olarak ayrıştırılmasını sağlar.

// authMiddleware'i sadece /api/v1/cars yollarında kullan
app.use("/api/v1/cars", authMiddleware, testMiddleware)
app.route("/api/v1/cars").get(getAllCars).post(createCar)

//app.use("/api/v1/cars/:id", verifyCarId)
app
  .route("/api/v1/cars/:id")
  .get(testCarMiddleware, getACar)
  .post(updateCar)
  //  .patch(updateCar)
  .delete(deleteCar)

export default app

// import express from "express"
// import {
//   getAllCars,
//   createCar,
//   getACar,
//   deleteCar,
//   updateCar,
// } from "./controllers/cars.controller"
// import { authMiddleware } from "./middlewares/auth.middleware"
// import { loggerMiddleware } from "./middlewares/logger.middleware"
// import { verifyCarId } from "./middlewares/verifyCarId.middleware"

// const app = express()

// // Gelen isteklerin gövdesindeki JSON verilerini ayrıştırır
// app.use(express.json())

// // Form verilerini ayrıştırır (genellikle kullanılmayabilir)
// app.use(express.urlencoded({ extended: true }))

// // /api/v1/cars için ortak middleware'ler
// app.use("/api/v1/cars", authMiddleware, loggerMiddleware)

// // /api/v1/cars için tüm HTTP yöntemlerine rota tanımlar
// app.route("/api/v1/cars").get(getAllCars).post(createCar)

// // /api/v1/cars/:id için rota tanımlar ve verifyCarId middleware'i
// app
//   .route("/api/v1/cars/:id")
//   .get(verifyCarId, getACar) // verifyCarId middleware'i eklendi
//   .patch(verifyCarId, updateCar) // verifyCarId middleware'i eklendi
//   .delete(verifyCarId, deleteCar) // verifyCarId middleware'i eklendi

// export default app
