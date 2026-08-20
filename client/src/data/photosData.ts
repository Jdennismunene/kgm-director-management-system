export interface PhotoResource {
  id: number;

  title: string;

  description: string;

  category:
    | "Photography"
    | "VBS"
    | "Competition"
    | "Baptism"
    | "Church Events"
    | "Other";

  event: string;

  fileName: string;

  fileSize: string;

  imageUrl: string;

  dateAdded: string;

  eventDate: string;

  location: string;

  photographer: string;

  status: "Active" | "Archived";
}

export const photosData: PhotoResource[] = [
  {
    id: 1,
    title: "VBS 2026 Opening Day",
    description:
      "Photos captured during the opening day of the 2026 Vocational Bible School program.",
    category: "VBS",
    event: "VBS 2026",
    fileName: "vbs-2026-opening-day.jpg",
    fileSize: "4.8 MB",
    imageUrl:
      "https://images.unsplash.com/photo-1504159506876-f8338247a14a?auto=format&fit=crop&w=1200&q=80",
    dateAdded: "Aug 12, 2026",
    eventDate: "Aug 10, 2026",
    location: "Main Church",
    photographer: "Media Team",
    status: "Active",
  },

  {
    id: 2,
    title: "VBS Teaching Session",
    description:
      "Photo collection from one of the teaching sessions during the Vocational Bible School.",
    category: "VBS",
    event: "VBS 2026",
    fileName: "vbs-teaching-session.jpg",
    fileSize: "5.2 MB",
    imageUrl:
      "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1200&q=80",
    dateAdded: "Aug 12, 2026",
    eventDate: "Aug 11, 2026",
    location: "Main Church",
    photographer: "Media Team",
    status: "Active",
  },

  {
    id: 3,
    title: "Bible Competition Finals",
    description: "Photos from the final stage of the church Bible competition.",
    category: "Competition",
    event: "Bible Quiz Competition 2026",
    fileName: "bible-competition-finals.jpg",
    fileSize: "6.1 MB",
    imageUrl:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80",
    dateAdded: "Jul 28, 2026",
    eventDate: "Jul 26, 2026",
    location: "Shiloh Worship Centre",
    photographer: "Media Team",
    status: "Active",
  },

  {
    id: 4,
    title: "Bible Competition Participants",
    description:
      "Group photographs of children and participants who took part in the Bible competition.",
    category: "Competition",
    event: "Bible Quiz Competition 2026",
    fileName: "competition-participants.jpg",
    fileSize: "5.6 MB",
    imageUrl:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
    dateAdded: "Jul 28, 2026",
    eventDate: "Jul 26, 2026",
    location: "Shiloh Worship Centre",
    photographer: "Media Team",
    status: "Active",
  },

  {
    id: 5,
    title: "Baptism Service 2026",
    description:
      "Official photographs captured during the 2026 baptism service.",
    category: "Baptism",
    event: "Baptism Service - July 2026",
    fileName: "baptism-service-2026.jpg",
    fileSize: "7.4 MB",
    imageUrl:
      "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=1200&q=80",
    dateAdded: "Jul 15, 2026",
    eventDate: "Jul 12, 2026",
    location: "Main Church",
    photographer: "Church Media Team",
    status: "Active",
  },

  {
    id: 6,
    title: "Baptism Group Photo",
    description:
      "Group photograph of members who participated in the baptism service.",
    category: "Baptism",
    event: "Baptism Service - July 2026",
    fileName: "baptism-group-photo.jpg",
    fileSize: "6.8 MB",
    imageUrl:
      "https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&w=1200&q=80",
    dateAdded: "Jul 15, 2026",
    eventDate: "Jul 12, 2026",
    location: "Main Church",
    photographer: "Church Media Team",
    status: "Active",
  },

  {
    id: 7,
    title: "Sunday School Photography",
    description:
      "Collection of photographs taken during a Sunday School session.",
    category: "Photography",
    event: "Sunday School Session",
    fileName: "sunday-school-session.jpg",
    fileSize: "3.9 MB",
    imageUrl:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80",
    dateAdded: "Jun 22, 2026",
    eventDate: "Jun 21, 2026",
    location: "Ukombozi Restoration Center",
    photographer: "Media Team",
    status: "Active",
  },

  {
    id: 8,
    title: "Children Ministry Event",
    description:
      "Photos documenting a children ministry gathering and activities.",
    category: "Photography",
    event: "Children Ministry Gathering",
    fileName: "children-ministry-event.jpg",
    fileSize: "4.5 MB",
    imageUrl:
      "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&w=1200&q=80",
    dateAdded: "Jun 18, 2026",
    eventDate: "Jun 14, 2026",
    location: "Main Church",
    photographer: "Media Team",
    status: "Active",
  },

  {
    id: 9,
    title: "Church Leadership Gathering",
    description:
      "Photography from a church leadership gathering and ministry meeting.",
    category: "Church Events",
    event: "Church Leadership Gathering",
    fileName: "leadership-gathering.jpg",
    fileSize: "4.1 MB",
    imageUrl:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80",
    dateAdded: "May 30, 2026",
    eventDate: "May 29, 2026",
    location: "Main Church",
    photographer: "Media Team",
    status: "Active",
  },

  {
    id: 10,
    title: "VBS 2025 Closing Ceremony",
    description:
      "Archived photographs from the closing ceremony of the 2025 Vocational Bible School.",
    category: "VBS",
    event: "VBS 2025",
    fileName: "vbs-2025-closing.jpg",
    fileSize: "8.2 MB",
    imageUrl:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80",
    dateAdded: "Aug 20, 2025",
    eventDate: "Aug 17, 2025",
    location: "Main Church",
    photographer: "Media Team",
    status: "Archived",
  },

  {
    id: 11,
    title: "2025 Baptism Service",
    description: "Archived photographs documenting the 2025 baptism service.",
    category: "Baptism",
    event: "Baptism Service - July 2025",
    fileName: "baptism-2025.jpg",
    fileSize: "7.1 MB",
    imageUrl:
      "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=1200&q=80",
    dateAdded: "Jul 20, 2025",
    eventDate: "Jul 18, 2025",
    location: "Main Church",
    photographer: "Church Media Team",
    status: "Archived",
  },

  {
    id: 12,
    title: "2025 Competition Day",
    description:
      "Archived photographs from the church competition held in 2025.",
    category: "Competition",
    event: "Bible Quiz Competition 2025",
    fileName: "competition-2025.jpg",
    fileSize: "6.4 MB",
    imageUrl:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
    dateAdded: "Jun 28, 2025",
    eventDate: "Jun 26, 2025",
    location: "Shiloh Worship Centre",
    photographer: "Media Team",
    status: "Archived",
  },
];
