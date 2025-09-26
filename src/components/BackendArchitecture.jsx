// components/BackendArchitecture.jsx
import React, { useMemo, useState } from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";
import { motion } from "framer-motion";
import CustomNode from "./CustomNode";
import FeaturePanel from "./FeaturePanel";

const nodeTypes = {
  custom: CustomNode,
};

export default function BackendArchitecture({ stage, onComponentSelect }) {
  const [selectedComponent, setSelectedComponent] = useState(null);

  const { nodes, edges } = useMemo(() => {
    // Simplified layout focusing on 3 main components
    const baseNodes = [
      {
        id: "incomingRequest",
        type: "custom",
        position: { x: 10, y: 5 },
        data: { 
          type: "external",
          emoji: "📨",
          label: "Incoming",
          subtitle: "Requests"
        },
      },
      {
        id: "dataPlane",
        type: "custom",
        position: { x: 150, y: 5 },
        data: { 
          type: "dataPlane",
          emoji: "⚡",
          label: "Data Plane",
          subtitle: "Edge Worker"
        },
      },
      {
        id: "d1Database",
        type: "custom",
        position: { x: 310, y: 50 },
        data: { 
          type: "database",
          emoji: "💾",
          label: "D1 Database",
          subtitle: "Persistent Storage"
        },
      },
      {
        id: "kvStorage",
        type: "custom",
        position: { x: 300, y: 120 },
        data: { 
          type: "storage",
          emoji: "🗂️",
          label: "KV Store",
          subtitle: "Ephemeral Cache"
        },
      },
      {
        id: "reconciler",
        type: "custom",
        position: { x: 100, y: 120 },
        data: { 
          type: "reconciler",
          emoji: "🧠",
          label: "Reconciler",
          subtitle: "Batch Processor"
        },
      },
      {
        id: "controlPlane",
        type: "custom",
        position: { x: 450, y: 80 },
        data: { 
          type: "controlPlane",
          emoji: "🎮",
          label: "Control Plane",
          subtitle: "Admin UI/API"
        },
      }
    ];

    const baseEdges = [
      // Data Plane flows
      { 
        id: "e1", 
        source: "incomingRequest", 
        target: "dataPlane", 
        label: "Process",
        animated: true,
        labelStyle: { fontSize: 8 },
        style: { strokeWidth: 2, stroke: "#3B82F6" }
      },
      { 
        id: "e2", 
        source: "dataPlane", 
        target: "d1Database", 
        label: "Store Data",
        animated: true,
        labelStyle: { fontSize: 8 },
        style: { strokeWidth: 1.5, stroke: "#10B981" }
      },
      { 
        id: "e3", 
        source: "dataPlane", 
        target: "kvStorage", 
        label: "Cache Raw",
        animated: true,
        labelStyle: { fontSize: 8 },
        style: { strokeWidth: 1.5, stroke: "#F59E0B" }
      },
      
      // Reconciler flows
      { 
        id: "e4", 
        source: "kvStorage", 
        target: "reconciler", 
        label: "Analyze",
        animated: true,
        labelStyle: { fontSize: 8 },
        style: { strokeWidth: 1.5, stroke: "#8B5CF6", strokeDasharray: "3,3" }
      },
      { 
        id: "e5", 
        source: "reconciler", 
        target: "d1Database", 
        label: "Update",
        animated: true,
        labelStyle: { fontSize: 8 },
        style: { strokeWidth: 1.5, stroke: "#8B5CF6" }
      },
      
      // Control Plane flows
      { 
        id: "e6", 
        source: "d1Database", 
        target: "controlPlane", 
        label: "Query",
        animated: true,
        labelStyle: { fontSize: 8 },
        style: { strokeWidth: 1.5, stroke: "#EF4444" }
      },
      { 
        id: "e7", 
        source: "controlPlane", 
        target: "dataPlane", 
        label: "Config",
        animated: true,
        labelStyle: { fontSize: 8 },
        style: { strokeWidth: 1.5, stroke: "#EF4444", strokeDasharray: "3,3" }
      },
    ];

    const stageHighlights = {
      current: ['dataPlane', 'd1Database'],
      transition: ['dataPlane', 'kvStorage', 'reconciler'],
      target: ['dataPlane', 'reconciler', 'controlPlane', 'd1Database', 'kvStorage']
    };

    const highlightedNodes = stageHighlights[stage] || [];

    return {
      nodes: baseNodes.map(node => ({
        ...node,
        data: {
          ...node.data,
          highlight: highlightedNodes.includes(node.id)
        }
      })),
      edges: baseEdges
    };
  }, [stage]);

  const onNodeClick = (event, node) => {
    setSelectedComponent(node);
    onComponentSelect?.(node);
  };

  return (
    <div className="relative" style={{ height: 400 }}>
      <motion.div
        key={stage}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded border border-gray-200 h-full"
      >
        <ReactFlow 
          nodes={nodes} 
          edges={edges} 
          nodeTypes={nodeTypes}
          onNodeClick={onNodeClick}
          fitView
          minZoom={0.7}
          maxZoom={2}
          defaultViewport={{ x: 10, y: 10, zoom: 0.9 }}
        >
          <Background gap={8} color="#f1f5f9" size={0.5} />
          <Controls 
            showInteractive={false}
            position="bottom-right"
            style={{ transform: 'scale(0.8)' }}
          />
        </ReactFlow>
      </motion.div>
      
      <FeaturePanel 
        selectedComponent={selectedComponent}
        onClose={() => setSelectedComponent(null)}
      />
    </div>
  );
}