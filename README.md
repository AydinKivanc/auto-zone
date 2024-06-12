import { Request, Response, NextFunction } from "express"

import { PrismaClient } from "@prisma/client"

import { ErrorResponse } from "../interfaces/error.interface"

const prisma = new PrismaClient()

export const verifyCarId = async (

req: Request,

res: Response<ErrorResponse>,

next: NextFunction

) => {

const carId = parseInt(req.params.id)

if (isNaN(carId)) {

    return res.status(400).json({ error: "Invalid car ID" })

}

try {

    const car = await prisma.cars.findUnique({

      where: { id: carId },

    })



    if (!car) {

      return res.status(404).json({ error: "Car not found" })

    }



    // Car object'i request'e ekleyelim

    //;(req as ExtendedRequest).car = car

    req.car = car

    next()

} catch (error) {

    console.error(error)

    res.status(500).json({ error: "Internal Server Error" })

}

}

req.car = car satirina geldigimde req ustunde iken alttaki not geliyor

    req.car = car

.car ise alttaki yazi geliyor

(property) Request<ParamsDictionary, any, any, QueryString.ParsedQs, Record<string, any>>.car?: Car | undefined

ve bu middleware i aktif edince alttaki hata yi aliyorum

[INFO] 19:11:14 Restarting: /Users/kivancaydin/00-Yazilim/BACKEND/UDEMIG/Ben/auto-zone/backend/src/controllers/cars.controller.ts has been modified

[ERROR] 19:11:15 ⨯ Unable to compile TypeScript:

src/middlewares/verifyCarId.middleware.ts(29,9): error TS2339: Property 'car' does not exist on type 'Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>'.

controller im alttadir

export const getACar = async (

req: Request & { car: Car }, // Extend Request with car property (assuming middleware adds it)

res: Response<Car | ErrorResponse>

) => {

const car = req.car // Access car data added by verifyCarId middleware

res.status(200).json(car)

console.log("getACar is working successfully")

}

app.ts de

import { verifyCarId } from "./middlewares/verifyCarId.middleware"

app.use("/api/v1/cars/:id", verifyCarId)

ayrica backend/types/express.d.ts

import { Car } from "../interfaces/car.interface"

declare module "express" {

interface Request {

    car?: Car

}

}

tsconfig.json

{

"compilerOptions": {

    "sourceMap": true,

    "outDir": "dist",

    "strict": true,

    "lib": ["esnext"],

    "esModuleInterop": true,

    "moduleResolution": "node",

    "target": "es6",

    "rootDir": "."

},

"include": ["src/**/*.ts", "src/types/*.d.ts", "src/types/expresss"],

"exclude": ["node_modules", "**/*.spec.ts"]

}

Bu hatayi nasil duzeltirim Turkce yanitlarmisin
