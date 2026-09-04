import prisma from "../src/lib/prisma.js";

async function main() {
  console.log("🌱 Starting database seed...");

  // =========================
  // BRANCHES
  // =========================

  const branches = [
    "Main Church",
    "Shiloh Worship Centre",
    "Ukombozi Restoration Center",
  ];

  for (const name of branches) {
    await prisma.branch.upsert({
      where: { name },
      update: {},
      create: {
        name,
      },
    });
  }

  console.log("✅ Branches seeded successfully.");

  // =========================
  // GRADES
  // =========================

  const grades = [
    "PP1",
    "PP2",
    "Grade 1",
    "Grade 2",
    "Grade 3",
    "Grade 4",
    "Grade 5",
    "Grade 6",
    "Grade 7",
    "Grade 8",
    "Grade 9",
    "Grade 10",
  ];

  for (const name of grades) {
    await prisma.grade.upsert({
      where: { name },
      update: {},
      create: {
        name,
        status: "ACTIVE",
      },
    });
  }

  console.log("✅ Grades seeded successfully.");

  console.log("🎉 Database seed completed!");
}

main()
  .catch((error) => {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });