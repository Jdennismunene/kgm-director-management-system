export interface BibleLesson {
  id: number;
  title: string;
  bibleReference: string;
  topic: string;
  description: string;
  manual: string;
  category: string;
  ageGroup: string;
  duration: number;
  memoryVerse: string;
  status: "Active" | "Inactive";
  dateAdded: string;
}

export const bibleLessonsData: BibleLesson[] = [
  {
    id: 1,
    title: "Knowing God",
    bibleReference: "Jeremiah 9:23-24",
    topic: "Knowing God",
    description:
      "A foundational lesson helping children understand who God is, His character, and why knowing Him is important in their daily lives.",
    manual: "Centre for Christian Living (CCL)",
    category: "Bible Study",
    ageGroup: "Children",
    duration: 45,
    memoryVerse:
      "Let him who boasts boast about this: that he understands and knows me.",
    status: "Active",
    dateAdded: "Aug 8, 2026",
  },
  {
    id: 2,
    title: "The Creation",
    bibleReference: "Genesis 1:1-31",
    topic: "Creation",
    description:
      "An introduction to God's creation and His power as the Creator of the heavens, earth, and all living things.",
    manual: "Centre for Christian Living (CCL)",
    category: "Bible Study",
    ageGroup: "Children",
    duration: 40,
    memoryVerse:
      "In the beginning God created the heavens and the earth.",
    status: "Active",
    dateAdded: "Aug 9, 2026",
  },
  {
    id: 3,
    title: "Faith in God",
    bibleReference: "Hebrews 11:1-6",
    topic: "Faith",
    description:
      "A lesson teaching children what faith means and how they can trust God even when they cannot see what He is doing.",
    manual: "Scripture Unions",
    category: "Faith",
    ageGroup: "Children & Youth",
    duration: 45,
    memoryVerse:
      "Now faith is confidence in what we hope for and assurance about what we do not see.",
    status: "Active",
    dateAdded: "Aug 11, 2026",
  },
  {
    id: 4,
    title: "Walking With God",
    bibleReference: "Genesis 5:21-24",
    topic: "Christian Living",
    description:
      "A practical lesson about developing a close relationship with God through obedience, prayer, faith, and daily fellowship.",
    manual: "Scripture Unions",
    category: "Christian Living",
    ageGroup: "Youth",
    duration: 45,
    memoryVerse:
      "Enoch walked faithfully with God; then he was no more, because God took him away.",
    status: "Active",
    dateAdded: "Aug 12, 2026",
  },
  {
    id: 5,
    title: "The Love of God",
    bibleReference: "John 3:16",
    topic: "God's Love",
    description:
      "A lesson helping children understand God's great love for humanity and how His love is demonstrated through Jesus Christ.",
    manual: "Deliverance Church Kasarani International - Zimmerman",
    category: "Gospel",
    ageGroup: "All Ages",
    duration: 40,
    memoryVerse:
      "For God so loved the world that he gave his one and only Son.",
    status: "Active",
    dateAdded: "Aug 13, 2026",
  },
  {
    id: 6,
    title: "Prayer",
    bibleReference: "Matthew 6:5-13",
    topic: "Prayer",
    description:
      "An introduction to prayer and how children can communicate with God, depend on Him, and develop a consistent prayer life.",
    manual: "Deliverance Church Kasarani International - Zimmerman",
    category: "Spiritual Growth",
    ageGroup: "Children",
    duration: 45,
    memoryVerse:
      "Call to me and I will answer you and tell you great and unsearchable things you do not know.",
    status: "Active",
    dateAdded: "Aug 14, 2026",
  },
];