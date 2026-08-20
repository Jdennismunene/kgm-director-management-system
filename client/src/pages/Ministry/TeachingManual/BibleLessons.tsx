import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import BibleLessonsPageHeader from "../../../components/Ministry/BibleLessons/BibleLessonsPageHeader";
import BibleLessonsSummaryCards from "../../../components/Ministry/BibleLessons/BibleLessonsSummaryCards";
import BibleLessonsFilterBar from "../../../components/Ministry/BibleLessons/BibleLessonsFilterBar";
import BibleLessonsGrid from "../../../components/Ministry/BibleLessons/BibleLessonsGrid";
import BibleLessonsPagination from "../../../components/Ministry/BibleLessons/BibleLessonsPagination";
import AddBibleLessonModal from "../../../components/Ministry/BibleLessons/AddBibleLessonModal";
import EditBibleLessonModal from "../../../components/Ministry/BibleLessons/EditBibleLessonModal";
import DeleteBibleLessonModal from "../../../components/Ministry/BibleLessons/DeleteBibleLessonModal";

import {
  bibleLessonsData,
  type BibleLesson,
} from "../../../data/bibleLessonsData";

const BibleLessons = () => {
  const navigate = useNavigate();
  const [lessons, setLessons] = useState<BibleLesson[]>(() => [
    ...bibleLessonsData,
  ]);

  const [showAddLessonModal, setShowAddLessonModal] = useState(false);
  const [editingLesson, setEditingLesson] = useState<BibleLesson | null>(null);

  const [deletingLesson, setDeletingLesson] = useState<BibleLesson | null>(
    null,
  );

  const [successMessage, setSuccessMessage] = useState("");

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("All Topics");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedAgeGroup, setSelectedAgeGroup] = useState("All Age Groups");
  const [selectedStatus, setSelectedStatus] = useState("All Status");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  // --------------------------------------------------
  // Filter Lessons
  // --------------------------------------------------

  const filteredLessons = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    return lessons.filter((lesson) => {
      const matchesSearch =
        !search ||
        lesson.title.toLowerCase().includes(search) ||
        lesson.topic.toLowerCase().includes(search) ||
        lesson.bibleReference.toLowerCase().includes(search) ||
        lesson.manual.toLowerCase().includes(search) ||
        lesson.description.toLowerCase().includes(search);

      const matchesTopic =
        selectedTopic === "All Topics" || lesson.topic === selectedTopic;

      const matchesCategory =
        selectedCategory === "All Categories" ||
        lesson.category === selectedCategory;

      const matchesAgeGroup =
        selectedAgeGroup === "All Age Groups" ||
        lesson.ageGroup === selectedAgeGroup;

      const matchesStatus =
        selectedStatus === "All Status" || lesson.status === selectedStatus;

      return (
        matchesSearch &&
        matchesTopic &&
        matchesCategory &&
        matchesAgeGroup &&
        matchesStatus
      );
    });
  }, [
    lessons,
    searchTerm,
    selectedTopic,
    selectedCategory,
    selectedAgeGroup,
    selectedStatus,
  ]);

  // --------------------------------------------------
  // Pagination
  // --------------------------------------------------

  const totalItems = filteredLessons.length;

  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentLessons = filteredLessons.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  // --------------------------------------------------
  // Filter Handlers
  // --------------------------------------------------

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleTopicChange = (value: string) => {
    setSelectedTopic(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setCurrentPage(1);
  };

  const handleAgeGroupChange = (value: string) => {
    setSelectedAgeGroup(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
    setCurrentPage(1);
  };

  const handleEditLesson = (lesson: BibleLesson) => {
    setEditingLesson(lesson);
  };

  const handleSaveLesson = (updatedLesson: BibleLesson) => {
    setLessons((currentLessons) =>
      currentLessons.map((lesson) =>
        lesson.id === updatedLesson.id ? updatedLesson : lesson,
      ),
    );

    setEditingLesson(null);
    setSuccessMessage("Bible lesson updated successfully.");

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const handleDeleteLesson = () => {
    if (!deletingLesson) return;

    setLessons((currentLessons) =>
      currentLessons.filter((lesson) => lesson.id !== deletingLesson.id),
    );

    setDeletingLesson(null);
    setSuccessMessage("Bible lesson deleted successfully.");

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  return (
    <div className="mx-4 mt-3 space-y-6 pb-3">
      {successMessage && (
        <div className="fixed right-5 top-5 z-60 rounded-xl border border-green-200 bg-white px-5 py-3 shadow-lg dark:border-green-900/50 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
              ✓
            </div>

            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              {successMessage}
            </p>
          </div>
        </div>
      )}
      {/* Page Header */}
      <BibleLessonsPageHeader onAddLesson={() => setShowAddLessonModal(true)} />

      {/* Summary Cards */}
      <BibleLessonsSummaryCards lessons={lessons} />

      {/* Filters */}
      <BibleLessonsFilterBar
        searchTerm={searchTerm}
        selectedTopic={selectedTopic}
        selectedCategory={selectedCategory}
        selectedAgeGroup={selectedAgeGroup}
        selectedStatus={selectedStatus}
        onSearchChange={handleSearchChange}
        onTopicChange={handleTopicChange}
        onCategoryChange={handleCategoryChange}
        onAgeGroupChange={handleAgeGroupChange}
        onStatusChange={handleStatusChange}
      />

      {/* Lessons */}
      <BibleLessonsGrid
        lessons={currentLessons}
        onView={(lesson) => navigate(`/ministry/lessons/bible/${lesson.id}`)}
        onEdit={handleEditLesson}
        onDelete={setDeletingLesson}
      />

      {/* Pagination */}
      <BibleLessonsPagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        startIndex={startIndex}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={(value) => {
          setItemsPerPage(value);
          setCurrentPage(1);
        }}
      />

      {showAddLessonModal && (
        <AddBibleLessonModal
          onClose={() => setShowAddLessonModal(false)}
          onSave={(newLesson) => {
            setLessons((prev) => [newLesson, ...prev]);
            setShowAddLessonModal(false);
            setCurrentPage(1);
          }}
        />
      )}

      {editingLesson && (
        <EditBibleLessonModal
          lesson={editingLesson}
          onClose={() => setEditingLesson(null)}
          onSave={handleSaveLesson}
        />
      )}

      {deletingLesson && (
        <DeleteBibleLessonModal
          lesson={deletingLesson}
          onClose={() => setDeletingLesson(null)}
          onConfirm={handleDeleteLesson}
        />
      )}
    </div>
  );
};

export default BibleLessons;
