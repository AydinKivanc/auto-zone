-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('BASIC', 'ADMIN', 'BUSINESS_OWNER', 'BRANCH_MANAGER', 'STAFF', 'INTERN');

-- CreateEnum
CREATE TYPE "TokenType" AS ENUM ('ACCESS', 'REFRESH', 'RESET_PASSWORD', 'VERIFY_EMAIL');

-- CreateEnum
CREATE TYPE "AddressType" AS ENUM ('HOME', 'WORK', 'OTHER');

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "addressId" INTEGER,
    "contactDetailsId" INTEGER,
    "healthNotes" TEXT,
    "references" TEXT,
    "notes" TEXT,
    "role" "Roles" NOT NULL DEFAULT 'BASIC',
    "isEmailVerified" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Token" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "type" "TokenType" NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "blacklisted" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "addressType" "AddressType",
    "line1" TEXT,
    "line2" TEXT,
    "country" TEXT,
    "city" TEXT,
    "postcode" TEXT,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactDetails" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "phoneNumber" TEXT,
    "mobileNumber" TEXT,

    CONSTRAINT "ContactDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3),
    "contactDetailsId" INTEGER,
    "whereDidYouHearUs" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isUser" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER,

    CONSTRAINT "Customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomersAddressConnections" (
    "customerId" INTEGER NOT NULL,
    "addressId" INTEGER NOT NULL,

    CONSTRAINT "CustomersAddressConnections_pkey" PRIMARY KEY ("customerId","addressId")
);

-- CreateTable
CREATE TABLE "Suppliers" (
    "id" SERIAL NOT NULL,
    "companyName" TEXT NOT NULL,
    "contactDetailsId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Suppliers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SupplierTypes" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "SupplierTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SupplierTypeConnections" (
    "supplierId" INTEGER NOT NULL,
    "supplierTypeId" INTEGER NOT NULL,

    CONSTRAINT "SupplierTypeConnections_pkey" PRIMARY KEY ("supplierId","supplierTypeId")
);

-- CreateTable
CREATE TABLE "SupplierAddressConnections" (
    "supplierId" INTEGER NOT NULL,
    "addressId" INTEGER NOT NULL,

    CONSTRAINT "SupplierAddressConnections_pkey" PRIMARY KEY ("supplierId","addressId")
);

-- CreateTable
CREATE TABLE "SupplierContacts" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "supplierId" INTEGER NOT NULL,

    CONSTRAINT "SupplierContacts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_userName_key" ON "Users"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "Users_addressId_key" ON "Users"("addressId");

-- CreateIndex
CREATE UNIQUE INDEX "Users_contactDetailsId_key" ON "Users"("contactDetailsId");

-- CreateIndex
CREATE UNIQUE INDEX "ContactDetails_email_key" ON "ContactDetails"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ContactDetails_mobileNumber_key" ON "ContactDetails"("mobileNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Customers_contactDetailsId_key" ON "Customers"("contactDetailsId");

-- CreateIndex
CREATE UNIQUE INDEX "Customers_userId_key" ON "Customers"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Suppliers_contactDetailsId_key" ON "Suppliers"("contactDetailsId");

-- CreateIndex
CREATE UNIQUE INDEX "SupplierTypes_type_key" ON "SupplierTypes"("type");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_contactDetailsId_fkey" FOREIGN KEY ("contactDetailsId") REFERENCES "ContactDetails"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customers" ADD CONSTRAINT "Customers_contactDetailsId_fkey" FOREIGN KEY ("contactDetailsId") REFERENCES "ContactDetails"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customers" ADD CONSTRAINT "Customers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomersAddressConnections" ADD CONSTRAINT "CustomersAddressConnections_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomersAddressConnections" ADD CONSTRAINT "CustomersAddressConnections_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Suppliers" ADD CONSTRAINT "Suppliers_contactDetailsId_fkey" FOREIGN KEY ("contactDetailsId") REFERENCES "ContactDetails"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplierTypeConnections" ADD CONSTRAINT "SupplierTypeConnections_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Suppliers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplierTypeConnections" ADD CONSTRAINT "SupplierTypeConnections_supplierTypeId_fkey" FOREIGN KEY ("supplierTypeId") REFERENCES "SupplierTypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplierAddressConnections" ADD CONSTRAINT "SupplierAddressConnections_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Suppliers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplierAddressConnections" ADD CONSTRAINT "SupplierAddressConnections_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplierContacts" ADD CONSTRAINT "SupplierContacts_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Suppliers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
