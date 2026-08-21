export type CalendarEventType =
  | "Church Service"
  | "VBS"
  | "Teachers Seminar"
  | "Teachers Bonding"
  | "Competition"
  | "Meeting"
  | "Training"
  | "Other";

export type CalendarEventStatus =
  | "Scheduled"
  | "Ongoing"
  | "Completed"
  | "Cancelled";

export interface CalendarEvent {
  id: number;
  title: string;
  description: string;
  type: CalendarEventType;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  location: string;
  branch: string;
  organizer: string;
  expectedParticipants: number;
  status: CalendarEventStatus;
}

export const calendarEventsData: CalendarEvent[] = [
  {
    id: 1,
    title: "Sunday Worship Service",
    description: "Main Sunday worship service for the congregation.",
    type: "Church Service",
    startDate: "2026-08-23",
    endDate: "2026-08-23",
    startTime: "08:00",
    endTime: "11:30",
    location: "Main Church",
    branch: "Main Church",
    organizer: "Church Administration",
    expectedParticipants: 250,
    status: "Scheduled",
  },
  {
    id: 2,
    title: "Vocational Bible Study",
    description: "Vocational Bible study and spiritual development session.",
    type: "VBS",
    startDate: "2026-08-24",
    endDate: "2026-08-24",
    startTime: "16:00",
    endTime: "18:00",
    location: "Main Church Hall",
    branch: "Main Church",
    organizer: "VBS Ministry",
    expectedParticipants: 80,
    status: "Scheduled",
  },
  {
    id: 3,
    title: "Teachers Seminar",
    description: "Training and development seminar for Sunday school teachers.",
    type: "Teachers Seminar",
    startDate: "2026-08-27",
    endDate: "2026-08-28",
    startTime: "09:00",
    endTime: "16:00",
    location: "Conference Hall",
    branch: "Main Church",
    organizer: "Children Ministry",
    expectedParticipants: 45,
    status: "Scheduled",
  },
  {
    id: 4,
    title: "Youth Competition",
    description: "Annual youth competition and fellowship activity.",
    type: "Competition",
    startDate: "2026-08-29",
    endDate: "2026-08-29",
    startTime: "09:00",
    endTime: "15:00",
    location: "Church Grounds",
    branch: "Main Church",
    organizer: "Youth Ministry",
    expectedParticipants: 120,
    status: "Scheduled",
  },
  {
    id: 5,
    title: "Teachers Bonding",
    description: "Team-building and fellowship session for teachers.",
    type: "Teachers Bonding",
    startDate: "2026-09-05",
    endDate: "2026-09-05",
    startTime: "10:00",
    endTime: "15:00",
    location: "Shiloh Worship Centre",
    branch: "Shiloh Worship Centre",
    organizer: "Children Ministry",
    expectedParticipants: 35,
    status: "Scheduled",
  },
  {
    id: 6,
    title: "Ministry Planning Meeting",
    description: "Planning meeting for upcoming ministry activities.",
    type: "Meeting",
    startDate: "2026-09-08",
    endDate: "2026-09-08",
    startTime: "14:00",
    endTime: "16:00",
    location: "Administration Office",
    branch: "Main Church",
    organizer: "Ministry Leadership",
    expectedParticipants: 15,
    status: "Scheduled",
  },
  {
    id: 7,
    title: "Teacher Training",
    description:
      "Training session covering teaching methods and ministry practices.",
    type: "Training",
    startDate: "2026-09-12",
    endDate: "2026-09-12",
    startTime: "09:00",
    endTime: "13:00",
    location: "Ukombozi Restoration Center",
    branch: "Ukombozi Restoration Center",
    organizer: "Children Ministry",
    expectedParticipants: 40,
    status: "Scheduled",
  },
  {
    id: 8,
    title: "Sunday Worship Service",
    description: "Sunday worship service for the congregation.",
    type: "Church Service",
    startDate: "2026-09-13",
    endDate: "2026-09-13",
    startTime: "08:00",
    endTime: "11:30",
    location: "Main Church",
    branch: "Main Church",
    organizer: "Church Administration",
    expectedParticipants: 250,
    status: "Scheduled",
  },
  {
    id: 9,
    title: "Vocational Bible Study",
    description: "Bible study session focused on practical Christian living.",
    type: "VBS",
    startDate: "2026-09-17",
    endDate: "2026-09-17",
    startTime: "16:00",
    endTime: "18:00",
    location: "Main Church Hall",
    branch: "Main Church",
    organizer: "VBS Ministry",
    expectedParticipants: 75,
    status: "Scheduled",
  },
  {
    id: 10,
    title: "Church Leadership Meeting",
    description: "Leadership meeting to review church activities and plans.",
    type: "Meeting",
    startDate: "2026-09-22",
    endDate: "2026-09-22",
    startTime: "14:00",
    endTime: "16:00",
    location: "Board Room",
    branch: "Main Church",
    organizer: "Church Leadership",
    expectedParticipants: 20,
    status: "Scheduled",
  },
];
