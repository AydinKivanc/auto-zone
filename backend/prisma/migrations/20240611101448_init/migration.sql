-- CreateTable
CREATE TABLE "Cars" (
    "id" SERIAL NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "mileage" INTEGER NOT NULL,
    "fuel_type" TEXT NOT NULL,
    "transmission" TEXT NOT NULL,
    "condition" TEXT NOT NULL,

    CONSTRAINT "Cars_pkey" PRIMARY KEY ("id")
);
