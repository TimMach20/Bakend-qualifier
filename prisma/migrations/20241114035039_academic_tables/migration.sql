-- CreateEnum
CREATE TYPE "DEGREE" AS ENUM ('FIRST_SEMESTER', 'SECOND_SEMESTER', 'THIRD_SEMESTER', 'FOURTH_SEMESTER');

-- CreateEnum
CREATE TYPE "SECTION" AS ENUM ('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H');

-- CreateEnum
CREATE TYPE "PERIOD" AS ENUM ('FIRST_PERIOD', 'SECOND_PERIOD', 'THIRD_PERIOD');

-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "dni" TEXT NOT NULL,
    "courseId" INTEGER NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Teacher" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "dni" TEXT NOT NULL,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "degree" "DEGREE" NOT NULL,
    "section" "SECTION" NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AcademicMatter" (
    "id" SERIAL NOT NULL,
    "matter" TEXT NOT NULL,
    "teacherId" INTEGER NOT NULL,

    CONSTRAINT "AcademicMatter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AcademicMatterOnCourses" (
    "academicmatterId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AcademicMatterOnCourses_pkey" PRIMARY KEY ("academicmatterId","courseId")
);

-- CreateTable
CREATE TABLE "Score" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "academicmatterId" INTEGER NOT NULL,
    "period" "PERIOD" NOT NULL,

    CONSTRAINT "Score_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_dni_key" ON "Student"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_dni_key" ON "Teacher"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "Course_degree_section_key" ON "Course"("degree", "section");

-- CreateIndex
CREATE UNIQUE INDEX "Score_studentId_academicmatterId_period_key" ON "Score"("studentId", "academicmatterId", "period");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademicMatter" ADD CONSTRAINT "AcademicMatter_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademicMatterOnCourses" ADD CONSTRAINT "AcademicMatterOnCourses_academicmatterId_fkey" FOREIGN KEY ("academicmatterId") REFERENCES "AcademicMatter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademicMatterOnCourses" ADD CONSTRAINT "AcademicMatterOnCourses_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_academicmatterId_fkey" FOREIGN KEY ("academicmatterId") REFERENCES "AcademicMatter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
