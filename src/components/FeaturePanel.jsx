// components/FeaturePanel.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const componentDetails = {
  dataPlane: {
    title: "Data Plane Worker",
    description: "Frontline collector that inspects every request in real-time",
    features: [
      "Normalizes endpoints (scope, path, method)",
      "Calculates entropy and stability scores", 
      "Publishes raw observations to KV",
      "Handles request body, headers, and files"
    ],
    tech: ["Cloudflare Workers", "JavaScript"],
  },
  reconciler: {
    title: "Data Reconciler Worker",
    description: "The brain that analyzes patterns and decides what's trustworthy",
    features: [
      "Aggregates observations from KV storage",
      "Calculates stability scores and frequency analysis",
      "Detects anomalies and behavioral patterns",
      "Promotes consistent fields to D1 database",
      "Suppresses noisy/unreliable data"
    ],
    tech: ["CRON Triggers", "Batch Processing", "D1 Database"],
  },
  controlPlane: {
    title: "Control Plane",
    description: "The overseer providing visibility and management capabilities",
    features: [
      "Admin dashboard for profiling insights",
      "Manual override capabilities for fine-tuning",
      "Scope control and configuration management",
      "Real-time metrics and analytics dashboard",
      "API for external integrations"
    ],
    tech: ["React Dashboard", "REST API", "Authentication"],
  },
  database: {
    title: "D1 Database",
    description: "Persistent storage for trusted profiling data",
    features: [
      "Stores normalized endpoints and parameters",
      "Maintains field metadata history and trends",
      "SQL-based querying capabilities for analysis",
      "Backup and recovery built-in"
    ],
    tech: ["Cloudflare D1", "SQLite"],
  },
  storage: {
    title: "KV Storage",
    description: "High-performance ephemeral storage for raw observations",
    features: [
      "TTL-based automatic expiration (~1 hour)",
      "High-throughput read/write operations",
      "Distributed global storage network",
      "Cost-effective transient data handling"
    ],
    tech: ["Cloudflare KV", "Key-Value Store"],
  },
  processing: {
    title: "Normalization Engine",
    description: "Standardizes incoming request data for consistent processing",
    features: [
      "Extracts scope, path, and method from requests",
      "Standardizes endpoint formatting",
      "Validates and sanitizes input parameters",
      "Prepares data for storage and analysis"
    ],
    tech: ["Data Processing", "Validation Logic"],
  },
  external: {
    title: "Incoming Request",
    description: "External HTTP requests from tenants and applications",
    features: [
      "Multi-tenant request handling",
      "Application-specific routing",
      "Request validation and filtering",
      "Traffic monitoring and metrics"
    ],
    tech: ["HTTP Protocol", "Load Balancing"],
  }
};

export default function FeaturePanel({ selectedComponent, onClose }) {
  // Debug: log the selected component to see what data we're getting
  console.log('Selected Component:', selectedComponent);
  
  // Get the correct details based on the node's type
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