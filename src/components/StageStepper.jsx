/* StageStepper.jsx */
import React from "react";

const stages = [
  { id: "current", label: "Current State" },
  { id: "transition", label: "Transition" },
  { id: "target", label: "Target State" },
];

export default function StageStepper({ stage, setStage }) {
  return (
    <div className="flex items-center gap-4 bg-white p-3 rounded-lg shadow border border-gray-200">
      {stages.map((s, idx) => (
        <button
          key={s.id}
          onClick={() => setStage(s.id)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200
            ${stage === s.id
              ? "bg-blue-600 text-white shadow"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}
