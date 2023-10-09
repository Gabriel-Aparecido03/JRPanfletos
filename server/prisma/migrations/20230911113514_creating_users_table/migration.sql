-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'COMMOM');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('cpf');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'COMMOM',
    "cpf_number" TEXT NOT NULL,
    "workr_card_number" TEXT,
    "office" TEXT,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "craeted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
