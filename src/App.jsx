import { useState } from "react";
import FlowVisualizer from "./components/FlowVisualizer";
import StageStepper from "./components/StageStepper";

const STAGES = {
  current: {
    id: "current",
    title: "Current State: Signature-Driven WAF",
    description:
      "Most Cloud WAFs rely heavily on static signatures and rule sets. Engineers lack visibility into actual application behavior — no telemetry, no profiling.",
    businessImpact:
      "Missed zero-day attacks, frequent false positives, and engineers spending time tuning static rules without real context.",
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Adaptive Profiling Demo
      </h1>

      {/* Stage Stepper */}
      <StageStepper stage={stage} setStage={setStage} />

      {/* Stage Content */}
      <div className="mt-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left side: Diagram */}
        <FlowVisualizer stage={stage} />

        {/* Right side: Details */}
        <div className="bg-white shadow rounded-lg p-4 border border-gray-200">
          <h2 className="text-xl font-semibold mb-2">{STAGES[stage].title}</h2>
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
        </div>
      </div>
    </div>
  );
}

export default App;
