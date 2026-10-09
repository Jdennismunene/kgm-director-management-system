import { Calendar, Mail, Phone, User, Users, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTeachers } from "../../context/TeachersContext";
import { getGrades } from "../../services/gradeService";
import type { Teacher } from "../../services/teacherService";
interface Grade {
  id: string;
  name: string;
}
const AddTeacher = () => {
  const { addTeacher } = useTeachers();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedGradeIds, setSelectedGradeIds] = useState<string[]>([]);
  const [status, setStatus] = useState<Teacher["status"]>("ACTIVE");
  const [joinedDate, setJoinedDate] = useState("");
  const [notes, setNotes] = useState("");
  const [grades, setGrades] = useState<Grade[]>([]);
  const [loadingGrades, setLoadingGrades] = useState(true);
  const [error, setError] = useState("");
  /* * Load Grades */ useEffect(() => {
    const loadGrades = async () => {
      try {
        setLoadingGrades(true);
        const data = await getGrades();
        setGrades(data);
      } catch (error) {
        console.error("Error loading grades:", error);
        setError("Failed to load grades.");
      } finally {
        setLoadingGrades(false);
      }
    };
    loadGrades();
  }, []);
  /* * Handle Grade Selection */ const handleClassChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const gradeId = e.target.value;
    if (gradeId && !selectedGradeIds.includes(gradeId)) {
      setSelectedGradeIds((prev) => [...prev, gradeId]);
    }
    e.target.value = "";
  };
  /* * Remove Selected Grade */ const removeClass = (gradeId: string) => {
    setSelectedGradeIds((prev) => prev.filter((id) => id !== gradeId));
  };
  /* * Get Grade Name */ const getGradeName = (gradeId: string) => {
    return grades.find((grade) => grade.id === gradeId)?.name ?? gradeId;
  };
  /* * Submit Form */ const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    /* * Validation */ if (!name.trim()) {
      setError("Please enter the teacher's full name.");
      return;
    }
    if (!email.trim()) {
      setError("Please enter the teacher's email address.");
      return;
    }
    if (!phone.trim()) {
      setError("Please enter the teacher's phone number.");
      return;
    }
    if (selectedGradeIds.length === 0) {
      setError("Please assign at least one grade to the teacher.");
      return;
    }
    if (!joinedDate) {
      setError("Please select the teacher's joined date.");
      return;
    }
    /* * Create Teacher */ try {
      await addTeacher({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        status,
        joinedDate,
        gradeIds: selectedGradeIds,
      });
      /* * Go back to Teachers page */ navigate("/teachers", {
        state: { notification: "Teacher added successfully." },
      });
    } catch (error) {
      console.error("Error creating teacher:", error);
      setError(
        "Failed to add teacher. Please check the details and try again.",
      );
    }
  };
  return (
    <div className="min-h-full bg-gray-50 p-6 dark:bg-gray-900">
      {" "}
      {/* Header */}{" "}
      <div className="mb-6">
        {" "}
        <div className="mb-2 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          {" "}
          <span>Teachers</span> <span>/</span>{" "}
          <span className="text-gray-700 dark:text-gray-300">
            {" "}
            Add Teacher{" "}
          </span>{" "}
        </div>{" "}
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {" "}
          Add New Teacher{" "}
        </h1>{" "}
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {" "}
          Create a teacher profile and assign their teaching
          responsibilities.{" "}
        </p>{" "}
      </div>{" "}
      {/* Error Message */}{" "}
      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-400">
          {" "}
          {error}{" "}
        </div>
      )}{" "}
      <form onSubmit={handleSubmit}>
        {" "}
        {/* Personal Information */}{" "}
        <div className="mb-6 rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
          {" "}
          <div className="border-b border-gray-200 px-6 py-5 dark:border-gray-700">
            {" "}
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">
              {" "}
              Personal Information{" "}
            </h2>{" "}
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {" "}
              Enter the teacher's basic contact information.{" "}
            </p>{" "}
          </div>{" "}
          <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">
            {" "}
            {/* Full Name */}{" "}
            <div>
              {" "}
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                {" "}
                Full Name{" "}
              </label>{" "}
              <div className="relative">
                {" "}
                <User
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />{" "}
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter teacher's full name"
                  required
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-gray-700 outline-none transition focus:border-[#365452] focus:ring-1 focus:ring-[#365452] dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder:text-gray-500"
                />{" "}
              </div>{" "}
            </div>{" "}
            {/* Email */}{" "}
            <div>
              {" "}
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                {" "}
                Email Address{" "}
              </label>{" "}
              <div className="relative">
                {" "}
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />{" "}
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="teacher@example.com"
                  required
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-gray-700 outline-none transition focus:border-[#365452] focus:ring-1 focus:ring-[#365452] dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder:text-gray-500"
                />{" "}
              </div>{" "}
            </div>{" "}
            {/* Phone */}{" "}
            <div>
              {" "}
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                {" "}
                Phone Number{" "}
              </label>{" "}
              <div className="relative">
                {" "}
                <Phone
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />{" "}
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+254 7XX XXX XXX"
                  required
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-gray-700 outline-none transition focus:border-[#365452] focus:ring-1 focus:ring-[#365452] dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder:text-gray-500"
                />{" "}
              </div>{" "}
            </div>{" "}
            {/* Joined Date */}{" "}
            <div>
              {" "}
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                {" "}
                Joined Date{" "}
              </label>{" "}
              <div className="relative">
                {" "}
                <Calendar
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />{" "}
                <input
                  type="date"
                  value={joinedDate}
                  onChange={(e) => setJoinedDate(e.target.value)}
                  required
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-gray-700 outline-none transition focus:border-[#365452] focus:ring-1 focus:ring-[#365452] dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                />{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        {/* Teaching Information */}{" "}
        <div className="mb-6 rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
          {" "}
          <div className="border-b border-gray-200 px-6 py-5 dark:border-gray-700">
            {" "}
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">
              {" "}
              Teaching Information{" "}
            </h2>{" "}
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {" "}
              Assign Grade and set the teacher's current status.{" "}
            </p>{" "}
          </div>{" "}
          <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">
            {" "}
            {/* Grade */}{" "}
            <div className="md:col-span-2">
              {" "}
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                {" "}
                Grade Assigned{" "}
              </label>{" "}
              <div className="relative">
                {" "}
                <Users
                  size={18}
                  className="absolute left-3 top-3 text-gray-400"
                />{" "}
                <select
                  defaultValue=""
                  onChange={handleClassChange}
                  disabled={loadingGrades}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-gray-700 outline-none transition focus:border-[#365452] focus:ring-1 focus:ring-[#365452] disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                >
                  {" "}
                  <option value="" disabled>
                    {" "}
                    {loadingGrades ? "Loading grades..." : "Select Grade"}{" "}
                  </option>{" "}
                  {grades.map((grade) => (
                    <option
                      key={grade.id}
                      value={grade.id}
                      disabled={selectedGradeIds.includes(grade.id)}
                    >
                      {" "}
                      {grade.name}{" "}
                    </option>
                  ))}{" "}
                </select>{" "}
              </div>{" "}
              {/* Selected Grades */}{" "}
              {selectedGradeIds.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {" "}
                  {selectedGradeIds.map((gradeId) => (
                    <span
                      key={gradeId}
                      className="flex items-center gap-1.5 rounded-md bg-[#365452]/10 px-3 py-1.5 text-xs font-medium text-[#365452] dark:bg-[#8eb0ac]/10 dark:text-[#8eb0ac]"
                    >
                      {" "}
                      {getGradeName(gradeId)}{" "}
                      <button
                        type="button"
                        onClick={() => removeClass(gradeId)}
                        className="rounded-full transition hover:bg-black/10"
                      >
                        {" "}
                        <X size={13} />{" "}
                      </button>{" "}
                    </span>
                  ))}{" "}
                </div>
              )}{" "}
            </div>{" "}
            {/* Status */}{" "}
            <div>
              {" "}
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                {" "}
                Status{" "}
              </label>{" "}
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as Teacher["status"])}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-[#365452] focus:ring-1 focus:ring-[#365452] dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
              >
                {" "}
                <option value="ACTIVE">Active</option>{" "}
                <option value="INACTIVE">Inactive</option>{" "}
              </select>{" "}
            </div>{" "}
            {/* Notes */}{" "}
            <div className="md:col-span-2">
              {" "}
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                {" "}
                Additional Notes{" "}
              </label>{" "}
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                placeholder="Add any additional information about this teacher..."
                className="w-full resize-none rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-[#365452] focus:ring-1 focus:ring-[#365452] dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder:text-gray-500"
              />{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        {/* Actions */}{" "}
        <div className="flex items-center justify-end gap-3 pb-6">
          {" "}
          <button
            type="button"
            onClick={() => navigate("/teachers")}
            className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            {" "}
            Cancel{" "}
          </button>{" "}
          <button
            type="submit"
            disabled={loadingGrades}
            className="rounded-lg bg-[#365452] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#2c4543] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {" "}
            Add Teacher{" "}
          </button>{" "}
        </div>{" "}
      </form>{" "}
    </div>
  );
};
export default AddTeacher;
