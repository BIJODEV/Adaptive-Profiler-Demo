// components/FeaturePanel.jsx - Updated descriptions
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const componentDetails = {
  dataPlane: {
    title: "Data Plane Worker",
    description: "Processes incoming requests and stores data in both D1 and KV",
    features: [
      "Handles real-time HTTP requests",
      "Stores processed data in D1 database",
      "Caches raw observations in KV namespace",
      "Performs initial normalization and analysis"
    ],
    tech: ["Cloudflare Workers", "Edge Computing"],
  },
  reconciler: {
    title: "Data Reconciler",
    description: "Processes KV cache and updates D1 with aggregated insights",
    features: [
      "Reads raw data from KV storage",
      "Performs entropy & stability analysis and aggregation",
      "Updates D1 with processed insights",
      "Runs on CRON schedule for efficiency"
    ],
    tech: ["CRON Triggers", "Batch Processing", "D1 Database"],
  },
  controlPlane: {
    title: "Control Plane",
    description: "Provides UI/API for viewing and managing profiling data",
    features: [
      "Queries D1 database for insights",
      "Provides admin dashboard and APIs",
      "Allows configuration of data plane",
      "Shows real-time profiling analytics"
    ],
    tech: ["React Dashboard", "REST API", "D1 Queries"],
  },
  database: {
    title: "D1 Database",
    description: "Primary persistent storage for profiling data",
    features: [
      "Stores processed endpoint data",
      "Maintains historical profiling insights",
      "Serves data to control plane UI",
      "SQL-based querying for analytics"
    ],
    tech: ["Cloudflare D1", "SQLite", "Persistent Storage"],
  },
  storage: {
    title: "KV Storage",
    description: "Temporary cache for raw request data",
    features: [
      "Stores raw observations with TTL",
      "High-speed read/write for batch processing",
      "Ephemeral storage for efficiency",
      "Feeds data to reconciler worker"
    ],
    tech: ["Cloudflare KV", "Key-Value Cache", "Ephemeral Storage"],
  },
  external: {
    title: "Incoming Requests",
    description: "HTTP traffic from applications and tenants",
    features: [
      "Multi-tenant request streams",
      "Application-specific traffic patterns",
      "Real-time request processing",
      "Source data for profiling engine"
    ],
    tech: ["HTTP/HTTPS", "Load Balanced", "Multi-tenant"],
  }
};

export default function FeaturePanel({ selectedComponent, onClose }) {
  const details = componentDetails[selectedComponent?.data?.type] || {
    title: selectedComponent?.data?.label || "Component",
    description: "Click on different components to learn about their roles",
    features: ["No detailed information available"],
    tech: ["Unknown technology"]
  };

  return (
    <AnimatePresence>
      {selectedComponent && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="absolute right-4 top-4 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-10"
        >
          <div className="p-4">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-bold text-gray-800">{details.title}</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 text-lg"
              >
                ×
              </button>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">{details.description}</p>
            
            <div className="mb-4">
              <h4 className="font-semibold text-gray-700 mb-2">Key Features:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {details.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Technology:</h4>
              <div className="flex flex-wrap gap-2">
                {details.tech.map((tech, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}