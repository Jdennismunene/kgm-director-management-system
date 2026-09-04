-- CreateEnum
CREATE TYPE "LessonStatus" AS ENUM ('COMPLETED', 'IN_PROGRESS');

-- CreateTable
CREATE TABLE "Lesson" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "progress" INTEGER NOT NULL,
    "status" "LessonStatus" NOT NULL,
    "score" INTEGER,
    "teacher" TEXT NOT NULL,
    "childId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Lesson_childId_idx" ON "Lesson"("childId");

-- CreateIndex
CREATE INDEX "Lesson_date_idx" ON "Lesson"("date");

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Child"("id") ON DELETE CASCADE ON UPDATE CASCADE;
