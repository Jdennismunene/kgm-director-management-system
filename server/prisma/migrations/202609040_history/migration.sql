CREATE TYPE "HistoryType" AS ENUM (
  'PAYMENT',
  'LESSON',
  'NOTE',
  'ATTENDANCE',
  'DOCUMENT',
  'PROFILE',
  'DISCIPLESHIP'
);

CREATE TABLE "History" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "HistoryType" NOT NULL,
    "user" TEXT NOT NULL,
    "childId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "History_childId_idx" ON "History"("childId");
CREATE INDEX "History_type_idx" ON "History"("type");
CREATE INDEX "History_createdAt_idx" ON "History"("createdAt");

ALTER TABLE "History"
ADD CONSTRAINT "History_childId_fkey"
FOREIGN KEY ("childId")
REFERENCES "Child"("id")
ON DELETE CASCADE
ON UPDATE CASCADE;