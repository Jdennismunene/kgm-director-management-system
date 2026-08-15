import type { Child } from "../../data/childrenData";

interface ChildProfilePrintProps {
  child: Child;
}

const ChildProfilePrint = ({ child }: ChildProfilePrintProps) => {
  return (
    <div className="hidden print:block p-8 text-black">
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
          <strong>Class:</strong> {child.className}
        </p>

        <p>
          <strong>Branch:</strong> {child.branch}
        </p>

        <p>
          <strong>Parent / Guardian:</strong> {child.parent}
        </p>

        <p>
          <strong>Phone:</strong> {child.phone}
        </p>

        <p>
          <strong>Status:</strong> {child.status}
        </p>
      </div>

      <div className="mt-10 border-t border-gray-300 pt-4 text-xs text-gray-500">
        Printed Child Profile
      </div>
    </div>
  );
};

export default ChildProfilePrint;
