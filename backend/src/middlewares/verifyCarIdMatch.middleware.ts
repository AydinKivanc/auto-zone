import catchAsync from "../utils/catchAsync"

export const verifyCarIdMatch = catchAsync((req, res, next) => {
  const bodyCarId = req.body.id
  const carId = parseInt(req.params.id)

  if (carId !== bodyCarId) {
    return res.status(400).send("No car with this id")
  }

  next()
})
// TODO req.body.id getirmek icin <input type="hidden" name="id" value={id} /> Bu sekilde body icinden getirilebilir veya ContextApi kullanilir
