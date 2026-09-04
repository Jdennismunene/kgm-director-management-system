import api from "./api";

// =====================================================
// DISCIPLESHIP TYPES
// =====================================================

export interface DiscipleshipRecord {
id: string;
type: string;
title: string;
description: string;
date: string | null;
completed: boolean;
mentor: string;
notes: string;
childId: string;
createdAt: string;
updatedAt: string;
}

export interface CreateDiscipleshipData {
type: string;
title: string;
description: string;
date?: string | null;
completed?: boolean;
mentor: string;
notes?: string;
}

export interface UpdateDiscipleshipData {
type?: string;
title?: string;
description?: string;
date?: string | null;
completed?: boolean;
mentor?: string;
notes?: string;
}

// =====================================================
// GET CHILD DISCIPLESHIP RECORDS
// GET /api/children/:childId/discipleship
// =====================================================

export const getChildDiscipleshipRecords = async (
childId: string,
): Promise<DiscipleshipRecord[]> => {
const response = await api.get(
`/children/${childId}/discipleship`,
);

return response.data.data;
};

// =====================================================
// GET DISCIPLESHIP RECORD BY ID
// GET /api/children/:childId/discipleship/:id
// =====================================================

export const getDiscipleshipRecordById = async (
childId: string,
id: string,
): Promise<DiscipleshipRecord> => {
const response = await api.get(
`/children/${childId}/discipleship/${id}`,
);

return response.data.data;
};

// =====================================================
// CREATE DISCIPLESHIP RECORD
// POST /api/children/:childId/discipleship
// =====================================================

export const createDiscipleshipRecord = async (
childId: string,
data: CreateDiscipleshipData,
): Promise<DiscipleshipRecord> => {
const response = await api.post(
`/children/${childId}/discipleship`,
data,
);

return response.data.data;
};

// =====================================================
// UPDATE DISCIPLESHIP RECORD
// PUT /api/children/:childId/discipleship/:id
// =====================================================

export const updateDiscipleshipRecord = async (
childId: string,
id: string,
data: UpdateDiscipleshipData,
): Promise<DiscipleshipRecord> => {
const response = await api.put(
`/children/${childId}/discipleship/${id}`,
data,
);

return response.data.data;
};

// =====================================================
// DELETE DISCIPLESHIP RECORD
// DELETE /api/children/:childId/discipleship/:id
// =====================================================

export const deleteDiscipleshipRecord = async (
childId: string,
id: string,
): Promise<void> => {
await api.delete(
`/children/${childId}/discipleship/${id}`,
);
};

// =====================================================
// SPIRITUAL DEVELOPMENT
// =====================================================

export interface SpiritualDevelopment {
id: string;
bibleKnowledge: number;
prayerLife: number;
christianCharacter: number;
childId: string;
createdAt: string;
updatedAt: string;
}

export interface UpdateSpiritualDevelopmentData {
bibleKnowledge?: number;
prayerLife?: number;
christianCharacter?: number;
}

// =====================================================
// GET SPIRITUAL DEVELOPMENT
// GET /api/children/:childId/spiritual-development
// =====================================================

export const getSpiritualDevelopment = async (
childId: string,
): Promise<SpiritualDevelopment | null> => {
const response = await api.get(
`/children/${childId}/spiritual-development`,
);

return response.data.data;
};

// =====================================================
// UPDATE SPIRITUAL DEVELOPMENT
// PUT /api/children/:childId/spiritual-development
// =====================================================

export const updateSpiritualDevelopment = async (
childId: string,
data: UpdateSpiritualDevelopmentData,
): Promise<SpiritualDevelopment> => {
const response = await api.put(
`/children/${childId}/spiritual-development`,
data,
);

return response.data.data;
};
