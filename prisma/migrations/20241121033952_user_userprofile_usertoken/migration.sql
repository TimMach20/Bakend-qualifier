/*
  Warnings:

  - You are about to drop the column `dni` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `lastname` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `dni` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `lastname` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `photo` on the `Teacher` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userProfileId]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userProfileId]` on the table `Teacher` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userProfileId` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userProfileId` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('TEACHER', 'STUDENT');

-- DropIndex
DROP INDEX "Student_dni_key";

-- DropIndex
DROP INDEX "Teacher_dni_key";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "dni",
DROP COLUMN "lastname",
DROP COLUMN "name",
ADD COLUMN     "userProfileId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "description",
DROP COLUMN "dni",
DROP COLUMN "lastname",
DROP COLUMN "name",
DROP COLUMN "password",
DROP COLUMN "photo",
ADD COLUMN     "userProfileId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "role" "ROLE" NOT NULL,
    "dni" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3),
    "deleted" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserToken" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "revoked" TIMESTAMP(3),
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3),

    CONSTRAINT "UserToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserProfile" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "description" TEXT,
    "photo" TEXT,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3),

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_dni_key" ON "User"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "UserToken_token_key" ON "UserToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_userId_key" ON "UserProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Student_userProfileId_key" ON "Student"("userProfileId");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_userProfileId_key" ON "Teacher"("userProfileId");

-- AddForeignKey
ALTER TABLE "UserToken" ADD CONSTRAINT "UserToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "UserProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "UserProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
