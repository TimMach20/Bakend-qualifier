/*
  Warnings:

  - You are about to drop the `AcademicMatterOnCourses` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `modified` on table `UserToken` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "AcademicMatterOnCourses" DROP CONSTRAINT "AcademicMatterOnCourses_academicmatterId_fkey";

-- DropForeignKey
ALTER TABLE "AcademicMatterOnCourses" DROP CONSTRAINT "AcademicMatterOnCourses_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_courseId_fkey";

-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "courseId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "UserToken" ALTER COLUMN "modified" SET NOT NULL;

-- DropTable
DROP TABLE "AcademicMatterOnCourses";

-- CreateTable
CREATE TABLE "AcademicMatterOnCourse" (
    "academicmatterId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AcademicMatterOnCourse_pkey" PRIMARY KEY ("academicmatterId","courseId")
);

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademicMatterOnCourse" ADD CONSTRAINT "AcademicMatterOnCourse_academicmatterId_fkey" FOREIGN KEY ("academicmatterId") REFERENCES "AcademicMatter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademicMatterOnCourse" ADD CONSTRAINT "AcademicMatterOnCourse_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
