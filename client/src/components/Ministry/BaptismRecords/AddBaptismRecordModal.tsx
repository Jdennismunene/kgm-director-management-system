import { useState } from "react";
import { X } from "lucide-react";

import type {
  BaptismRecord,
  BaptismRecordStatus,
  CertificateStatus,
} from "../../../data/baptismRecordsData";

interface AddBaptismRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (record: BaptismRecord) => void;
}

const AddBaptismRecordModal = ({
  isOpen,
  onClose,
  onAdd,
}: AddBaptismRecordModalProps) => {
  const [personName, setPersonName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState<"Male" | "Female">("Male");

  const [parentGuardian, setParentGuardian] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [baptismDate, setBaptismDate] = useState("");
  const [baptismLocation, setBaptismLocation] = useState("");
  const [minister, setMinister] = useState("");
  const [branch, setBranch] = useState("");

  const [baptismNumber, setBaptismNumber] = useState("");
  const [status, setStatus] = useState<BaptismRecordStatus>("Pending");
  const [certificateStatus, setCertificateStatus] =
    useState<CertificateStatus>("Pending");

  const [notes, setNotes] = useState("");

  if (!isOpen) {
    return null;
  }

  const resetForm = () => {
    setPersonName("");
    setDateOfBirth("");
    setGender("Male");

    setParentGuardian("");
    setPhone("");
    setEmail("");

    setBaptismDate("");
    setBaptismLocation("");
    setMinister("");
    setBranch("");

    setBaptismNumber("");
    setStatus("Pending");
    setCertificateStatus("Pending");

    setNotes("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const calculateAge = (date: string) => {
    if (!date) {
      return 0;
    }

    const birthDate = new Date(`${date}T00:00:00`);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return Math.max(age, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !personName.trim() ||
      !dateOfBirth ||
      !parentGuardian.trim() ||
      !phone.trim() ||
      !baptismDate ||
      !minister.trim() ||
      !branch
    ) {
      return;
    }

    const newRecord: BaptismRecord = {
      id: Date.now(),

      personName: personName.trim(),
      age: calculateAge(dateOfBirth),
      gender,

      dateOfBirth,

      parentGuardian: parentGuardian.trim(),
      phone: phone.trim(),
      email: email.trim(),

      baptismDate,
      baptismLocation: baptismLocation.trim(),
      minister: minister.trim(),
      branch,

      baptismNumber:
        baptismNumber.trim() ||
        `BAP-${new Date().getFullYear()}-${Date.now().toString().slice(-3)}`,

      status,
      certificateStatus,

      notes: notes.trim(),
    };

    onAdd(newRecord);
    resetForm();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white shadow-xl dark:bg-gray-800">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Add Baptism Record
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Record a new baptism and certificate details.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-gray-200"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Person Name */}
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Person Name *
              </label>

              <input
                type="text"
                value={personName}
                onChange={(e) => setPersonName(e.target.value)}
                placeholder="Enter full name"
                required
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Date of Birth *
              </label>

              <input
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Gender *
              </label>

              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as "Male" | "Female")}
                required
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            {/* Parent / Guardian */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Parent / Guardian *
              </label>

              <input
                type="text"
                value={parentGuardian}
                onChange={(e) => setParentGuardian(e.target.value)}
                placeholder="Enter parent or guardian"
                required
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Phone *
              </label>

              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 0712345678"
                required
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="parent@example.com"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
              />
            </div>

            {/* Baptism Date */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Baptism Date *
              </label>

              <input
                type="date"
                value={baptismDate}
                onChange={(e) => setBaptismDate(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Branch */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Branch *
              </label>

              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select branch</option>
                <option value="Main Church">Main Church</option>
                <option value="Shiloh Worship Centre">
                  Shiloh Worship Centre
                </option>
                <option value="Ukombozi Restoration Center">
                  Ukombozi Restoration Center
                </option>
              </select>
            </div>

            {/* Baptism Location */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Baptism Location
              </label>

              <input
                type="text"
                value={baptismLocation}
                onChange={(e) => setBaptismLocation(e.target.value)}
                placeholder="e.g. Main Church"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
              />
            </div>

            {/* Minister */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Baptizing Minister *
              </label>

              <input
                type="text"
                value={minister}
                onChange={(e) => setMinister(e.target.value)}
                placeholder="Enter minister's name"
                required
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
              />
            </div>

            {/* Baptism Number */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Baptism Number
              </label>

              <input
                type="text"
                value={baptismNumber}
                onChange={(e) => setBaptismNumber(e.target.value)}
                placeholder="e.g. BAP-2026-006"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
              />
            </div>

            {/* Status */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Status *
              </label>

              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value as BaptismRecordStatus)
                }
                required
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <option value="Pending">Pending</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Baptized">Baptized</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            {/* Certificate Status */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Certificate Status *
              </label>

              <select
                value={certificateStatus}
                onChange={(e) =>
                  setCertificateStatus(e.target.value as CertificateStatus)
                }
                required
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <option value="Issued">Issued</option>
                <option value="Pending">Pending</option>
                <option value="Not Required">Not Required</option>
              </select>
            </div>

            {/* Notes */}
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Notes
              </label>

              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Add any additional notes..."
                className="w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 border-t border-gray-200 pt-5 dark:border-gray-700">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Add Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBaptismRecordModal;
