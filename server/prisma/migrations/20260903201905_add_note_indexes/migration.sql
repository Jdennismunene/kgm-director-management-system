-- CreateIndex
CREATE INDEX "Note_childId_idx" ON "Note"("childId");

-- CreateIndex
CREATE INDEX "Note_date_idx" ON "Note"("date");

-- CreateIndex
CREATE INDEX "Note_pinned_idx" ON "Note"("pinned");

-- CreateIndex
CREATE INDEX "Note_type_idx" ON "Note"("type");
