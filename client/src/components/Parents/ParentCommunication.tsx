import { Bell, CheckCircle2, Mail, MessageSquare, Send, X } from "lucide-react";
import { useEffect, useState } from "react";

import type { Parent } from "../../data/parentsData";

interface ParentCommunicationProps {
  parent: Parent;
}

interface CommunicationItem {
  id: number;
  type: "Notification" | "Email" | "Message";
  title: string;
  message: string;
  date: string;
  status: "Sent" | "Delivered" | "Read";
}

const ParentCommunication = ({ parent }: ParentCommunicationProps) => {
  const [communications, setCommunications] = useState<CommunicationItem[]>([
    {
      id: 1,
      type: "Notification",
      title: "Attendance Reminder",
      message: `Attendance reminder sent to ${parent.name}.`,
      date: "Aug 18, 2026",
      status: "Read",
    },
    {
      id: 2,
      type: "Email",
      title: "Sunday School Event",
      message: "Information about the upcoming Sunday School event was sent.",
      date: "Aug 15, 2026",
      status: "Delivered",
    },
    {
      id: 3,
      type: "Message",
      title: "Child Progress Update",
      message: "A child progress update was shared with the parent.",
      date: "Aug 10, 2026",
      status: "Read",
    },
  ]);

  // Message modal
  const [showMessageModal, setShowMessageModal] = useState(false);

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  // Notification
  const [notification, setNotification] = useState<string | null>(null);

  // Automatically hide notification
  useEffect(() => {
    if (!notification) return;

    const timer = setTimeout(() => {
      setNotification(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [notification]);

  const handleSendMessage = () => {
    if (!subject.trim() || !message.trim()) return;

    const newCommunication: CommunicationItem = {
      id: Date.now(),
      type: "Message",
      title: subject.trim(),
      message: message.trim(),
      date: "Aug 20, 2026",
      status: "Sent",
    };

    setCommunications((prev) => [newCommunication, ...prev]);

    setSubject("");
    setMessage("");
    setShowMessageModal(false);

    setNotification(`Message sent successfully to ${parent.name}.`);
  };

  const getIcon = (type: CommunicationItem["type"]) => {
    if (type === "Email") {
      return <Mail size={18} />;
    }

    if (type === "Message") {
      return <MessageSquare size={18} />;
    }

    return <Bell size={18} />;
  };

  const getIconStyle = (type: CommunicationItem["type"]) => {
    if (type === "Email") {
      return "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400";
    }

    if (type === "Message") {
      return "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400";
    }

    return "bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400";
  };

  return (
    <div className="space-y-6">
      {/* Success Notification */}
      {notification && (
        <div className="fixed right-6 top-6 z-100 w-[calc(100%-3rem)] max-w-sm">
          <div className="flex items-start gap-3 rounded-xl border border-green-200 bg-white p-4 shadow-lg dark:border-green-900/50 dark:bg-gray-800">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
              <CheckCircle2 size={19} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                Success
              </p>

              <p className="mt-0.5 text-sm text-gray-600 dark:text-gray-300">
                {notification}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setNotification(null)}
              className="rounded-lg p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Communication
          </h3>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            View communication history with {parent.name}.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowMessageModal(true)}
          className="inline-flex w-fit items-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
        >
          <Send size={16} />
          Send Message
        </button>
      </div>

      {/* Communication Summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total Communications
          </p>

          <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
            {communications.length}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">Read</p>

          <p className="mt-2 text-2xl font-bold text-green-600 dark:text-green-400">
            {communications.filter((item) => item.status === "Read").length}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Latest Communication
          </p>

          <p className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">
            {communications[0]?.date || "No activity"}
          </p>
        </div>
      </div>

      {/* Communication History */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <MessageSquare
              size={18}
              className="text-teal-600 dark:text-teal-400"
            />

            <h3 className="font-semibold text-gray-900 dark:text-white">
              Communication History
            </h3>
          </div>
        </div>

        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {communications.map((item) => (
            <div key={item.id} className="flex gap-4 px-6 py-5">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${getIconStyle(
                  item.type,
                )}`}
              >
                {getIcon(item.type)}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                      {item.title}
                    </h4>

                    <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                      {item.type}
                    </p>
                  </div>

                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    {item.date}
                  </span>
                </div>

                <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
                  {item.message}
                </p>

                <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-green-600 dark:text-green-400">
                  <CheckCircle2 size={14} />
                  {item.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      <div className="rounded-2xl border border-teal-100 bg-teal-50/50 p-5 dark:border-teal-900/40 dark:bg-teal-900/10">
        <div className="flex gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400">
            <MessageSquare size={18} />
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
              Parent Contact
            </h4>

            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              {parent.phone}
              {parent.email && ` • ${parent.email}`}
            </p>

            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Messages and notifications will be sent using the parent's
              registered contact information.
            </p>
          </div>
        </div>
      </div>

      {/* Send Message Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 z-90 flex items-center justify-center bg-black/50 px-4 py-6">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl dark:bg-gray-800">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Send Message
                </h3>

                <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                  Send a message to {parent.name}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowMessageModal(false);
                  setSubject("");
                  setMessage("");
                }}
                className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
              >
                <X size={19} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-5 px-6 py-6">
              {/* Recipient */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Recipient
                </label>

                <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
                  {parent.name}
                  <span className="ml-2 text-xs text-gray-400">
                    {parent.phone}
                  </span>
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Subject
                </label>

                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Enter message subject..."
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500"
                />
              </div>

              {/* Message */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Message
                </label>

                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  placeholder="Write your message..."
                  className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4 dark:border-gray-700">
              <button
                type="button"
                onClick={() => {
                  setShowMessageModal(false);
                  setSubject("");
                  setMessage("");
                }}
                className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSendMessage}
                disabled={!subject.trim() || !message.trim()}
                className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Send size={16} />
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParentCommunication;
