import { useState } from "react";
import FlowVisualizer from "./components/FlowVisualizer";
import BackendArchitecture from "./components/BackendArchitecture";
import StageStepper from "./components/StageStepper";

const STAGES = {
  current: {
    id: "current",
    title: "Current State: Signature-Driven WAF",
    description:
      "Most Cloud WAFs rely heavily on static signatures and rule sets. Engineers lack visibility into actual application behavior — no telemetry, no profiling.",
    businessImpact:
      "Frequent false positives, and engineers spending time tuning static rules without real context.",
    risks: [
      "Blind to new/unknown attacks",
      "High false positives → business disruption",
      "No application-level insights"
    ],
    benefits: [
      "Quick blocking of known threats",
      "Standardized security posture"
    ],
  },
  transition: {
    id: "transition",
    title: "Transition: Adaptive Profiler Introduced",
    description:
      "An Adaptive Profiler observes live traffic, builds behavioral baselines, and identifies anomalies without relying only on signatures.",
    businessImpact:
      "Fewer false positives, faster detection of novel attack patterns, and improved visibility for engineers.",
    risks: [
      "Initial learning phase requires monitoring",
      "Potential noise until baseline is stable"
    ],
    benefits: [
      "Dynamic learning of application behavior",
      "Context-aware detections",
      "Telemetry shared with engineers"
    ],
  },
  target: {
    id: "target",
    title: "Target State: Adaptive Security with Telemetry",
    description:
      "WAF and Adaptive Profiler work together, providing engineers with real-time telemetry, anomaly detection, and automated defenses.",
    businessImpact:
      "Reduced operational overhead, faster incident response, and continuous alignment with evolving application behavior.",
    risks: ["Ongoing tuning required for complex apps"],
    benefits: [
      "Visibility into application traffic",
      "Reduced false positives",
      "Real-time anomaly detection",
      "Lower OPEX for security teams"
    ],
  },
};

function App() {
  const [stage, setStage] = useState("current");
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [viewMode, setViewMode] = useState("flow");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Adaptive Profiling Demo
      </h1>
      
      {/* View Mode Toggle */}
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setViewMode("flow")}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            viewMode === "flow" 
              ? "bg-blue-600 text-white shadow" 
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          User Flow View
        </button>
        <button
          onClick={() => setViewMode("architecture")}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            viewMode === "architecture" 
              ? "bg-blue-600 text-white shadow" 
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Backend Architecture
        </button>
      </div>

      {/* Stage Stepper - Only show in Flow View */}
      {viewMode === "flow" && (
        <StageStepper stage={stage} setStage={setStage} />
      )}

      {/* Stage Content */}
      <div className="mt-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left side: Diagram - CONDITIONAL RENDERING */}
        {viewMode === "flow" ? (
          <FlowVisualizer stage={stage} />
        ) : (
          <BackendArchitecture 
            stage={stage} 
            onComponentSelect={setSelectedComponent}
          />
        )}

        {/* Right side: Details - ENHANCED */}
        <div className="bg-white shadow rounded-lg p-4 border border-gray-200">
          {/* Conditional Title based on View Mode */}
          {viewMode === "flow" ? (
            <h2 className="text-xl font-semibold mb-2">{STAGES[stage].title}</h2>
          ) : (
            <h2 className="text-xl font-semibold mb-2">Backend Architecture Overview</h2>
          )}
          
          {/* Selected Component Info - Only in Architecture View */}
          {viewMode === "architecture" && selectedComponent && (
            <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-800 flex items-center gap-2">
                <span>🔍</span>
                Selected: {selectedComponent.data.label}
              </h3>
              <p className="text-sm text-blue-600 mt-1">{selectedComponent.data.subtitle}</p>
              <p className="text-xs text-blue-500 mt-2">
                Click different components to learn about their roles
              </p>
            </div>
          )}
          
          {/* Conditional Content based on View Mode */}
          {viewMode === "flow" ? (
            // Flow View Content
            <>
              <p className="text-gray-600 mb-4">{STAGES[stage].description}</p>

              <h3 className="font-semibold text-gray-700">Business Impact</h3>
              <p className="text-gray-600 mb-3">{STAGES[stage].businessImpact}</p>

              <h3 className="font-semibold text-gray-700">Risks</h3>
              <ul className="list-disc list-inside text-gray-600 mb-3">
                {STAGES[stage].risks.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>

              <h3 className="font-semibold text-gray-700">Benefits</h3>
              <ul className="list-disc list-inside text-gray-600">
                {STAGES[stage].benefits.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </>
          ) : (
            // Architecture View Content
            <>
              <p className="text-gray-600 mb-4">
                This diagram shows the backend architecture of the Adaptive Profiling system, 
                built with Cloudflare Workers, D1 Database, and KV storage.
              </p>

              <h3 className="font-semibold text-gray-700">Key Components:</h3>
              <ul className="list-disc list-inside text-gray-600 mb-3">
                <li><strong>Data Plane:</strong> Processes incoming requests in real-time</li>
                <li><strong>Reconciler:</strong> Batch processes data and updates insights</li>
                <li><strong>Control Plane:</strong> Provides management interface and APIs</li>
                <li><strong>D1 Database:</strong> Persistent storage for profiling data</li>
                <li><strong>KV Storage:</strong> Ephemeral cache for raw observations</li>
              </ul>

              <h3 className="font-semibold text-gray-700">Data Flow:</h3>
              <p className="text-gray-600 mb-3">
                Requests flow through the Data Plane, which stores data in both D1 and KV. 
                The Reconciler processes KV data to update D1 with insights, and the Control 
                Plane queries D1 to display analytics.
              </p>

              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-700 mb-2">Architecture Focus:</h4>
                <p className="text-sm text-gray-600">
                  {stage === "current" && "Basic data collection and storage components"}
                  {stage === "transition" && "KV storage and reconciler introduced for adaptive learning"}
                  {stage === "target" && "Full adaptive profiling pipeline with control plane"}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Copyright Footer */}
      <footer className="bg-white border-t border-gray-200 py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Adaptive Profiling Demo. Built with React, React Flow, and Tailwind CSS by Bijo Dev.
          </p>
          <p className="text-gray-400 text-xs mt-1">
            This demo showcases adaptive security profiling architecture using Cloudflare Workers ecosystem.
          </p>
        </div>
      </footer>
    </div>
    
  );
}

export default App;