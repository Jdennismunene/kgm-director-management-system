import type { Child } from "../../services/childService";

interface ChildProfilePrintProps {
  child: Child;
}

const ChildProfilePrint = ({ child }: ChildProfilePrintProps) => {
  return (
    <div className="hidden p-8 text-black print:block">
      <div className="mb-6 border-b border-gray-300 pb-4">
        <h1 className="text-2xl font-bold">Child Profile</h1>

        <p className="mt-1 text-sm text-gray-600">
          Sunday School Management System
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">{child.name}</h2>
      </div>

      <div className="space-y-3 text-sm">
        <p>
          <strong>Age:</strong> {child.age} years
        </p>

        <p>
          <strong>Grade:</strong> {child.grade?.name ?? "—"}
        </p>

        <p>
          <strong>Branch:</strong> {child.branch?.name ?? "—"}
        </p>

        <p>
          <strong>Parent / Guardian:</strong> {child.parent?.name ?? "—"}
        </p>

        <p>
          <strong>Phone:</strong> {child.parent?.phone ?? "—"}
        </p>

        <p>
          <strong>Email:</strong> {child.parent?.email ?? "—"}
        </p>

        <p>
          <strong>Status:</strong> {child.status}
        </p>

        <p>
          <strong>Registered:</strong>{" "}
          {child.createdAt
            ? new Date(child.createdAt).toLocaleDateString()
            : "—"}
        </p>
      </div>

      <div className="mt-10 border-t border-gray-300 pt-4 text-xs text-gray-500">
        Printed Child Profile
      </div>
    </div>
  );
};

export default ChildProfilePrint;
