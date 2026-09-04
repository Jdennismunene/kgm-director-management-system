-- CreateTable
CREATE TABLE "DiscipleshipRecord" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3),
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "mentor" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "childId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DiscipleshipRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpiritualDevelopment" (
    "id" TEXT NOT NULL,
    "bibleKnowledge" INTEGER NOT NULL DEFAULT 0,
    "prayerLife" INTEGER NOT NULL DEFAULT 0,
    "christianCharacter" INTEGER NOT NULL DEFAULT 0,
    "childId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SpiritualDevelopment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DiscipleshipRecord_childId_idx" ON "DiscipleshipRecord"("childId");

-- CreateIndex
CREATE INDEX "DiscipleshipRecord_date_idx" ON "DiscipleshipRecord"("date");

-- CreateIndex
CREATE INDEX "DiscipleshipRecord_completed_idx" ON "DiscipleshipRecord"("completed");

-- CreateIndex
CREATE UNIQUE INDEX "SpiritualDevelopment_childId_key" ON "SpiritualDevelopment"("childId");

-- AddForeignKey
ALTER TABLE "DiscipleshipRecord" ADD CONSTRAINT "DiscipleshipRecord_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Child"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpiritualDevelopment" ADD CONSTRAINT "SpiritualDevelopment_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Child"("id") ON DELETE CASCADE ON UPDATE CASCADE;
