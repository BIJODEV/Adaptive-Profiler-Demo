import React, { useMemo } from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";
import { motion } from "framer-motion";

export default function FlowVisualizer({ stage }) {
  const { nodes, edges } = useMemo(() => {
    // Common nodes
    const baseNodes = [
      {
        id: "user",
        type: "default",
        position: { x: 0, y: 100 },
        data: { label: "👨‍💻 User" },
      },
      {
        id: "waf",
        type: "default",
        position: { x: 250, y: 100 },
        data: { label: "🌐 WAF (Signatures)" },
      },
      {
        id: "profiler",
        type: "default",
        position: { x: 250, y: 250 },
        data: { label: "🧩 Adaptive Profiler" },
      },
      {
        id: "app",
        type: "default",
        position: { x: 600, y: 100 },
        data: { label: "🖥️ Application" },
      },
    ];

    if (stage === "current") {
      return {
        nodes: baseNodes.filter(n => n.id !== "profiler"),
        edges: [
          {
            id: "e1",
            source: "user",
            target: "waf",
            animated: true,
            style: { stroke: "green", strokeWidth: 3 },
            label: "Traffic",
          },
          {
            id: "e2",
            source: "waf",
            target: "app",
            animated: true,
            style: { stroke: "green", strokeWidth: 3 },
            label: "Filtered by signatures",
          },
        ],
      };
    }

    if (stage === "transition") {
      return {
        nodes: baseNodes.filter(n => n.id !== "app"), // show profiler focus
        edges: [
          {
            id: "e1",
            source: "user",
            target: "waf",
            animated: true,
            style: { stroke: "green", strokeWidth: 3 },
            label: "Traffic",
          },
          {
            id: "e2",
            source: "waf",
            target: "app",
            animated: true,
            style: { stroke: "orange", strokeWidth: 3, strokeDasharray: "5,5" },
            label: "Partially enforced",
          },
          {
            id: "e3",
            source: "waf",
            target: "profiler",
            animated: true,
            style: { stroke: "purple", strokeWidth: 3, strokeDasharray: "3,3" },
            label: "Telemetry feed",
          },
        ],
      };
    }

    if (stage === "target") {
      return {
        nodes: baseNodes,
        edges: [
          {
            id: "e1",
            source: "user",
            target: "waf",
            animated: true,
            style: { stroke: "green", strokeWidth: 3 },
            label: "Traffic",
          },
          {
            id: "e2",
            source: "waf",
            target: "app",
            animated: true,
            style: { stroke: "green", strokeWidth: 3 },
            label: "Filtered by signatures + Adaptive Profile",
          },
          {
            id: "e3",
            source: "waf",
            target: "profiler",
            animated: true,
            style: { stroke: "purple", strokeWidth: 3, strokeDasharray: "3,3" },
            label: "Telemetry feed",
          },
          {
            id: "e4",
            source: "profiler",
            target: "waf",
            animated: true,
            style: { stroke: "blue", strokeWidth: 3, strokeDasharray: "3,3" },
            label: "Feedback / Adaptive rules",
          },
        ],
      };
    }

    return { nodes: [], edges: [] };
  }, [stage]);

  return (
    <motion.div
      key={stage}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow border border-gray-200 p-2"
      style={{ height: 400 }}
    >
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background gap={16} color="#e2e8f0" />
        <Controls showInteractive={false} />
      </ReactFlow>
    </motion.div>
  );
}
