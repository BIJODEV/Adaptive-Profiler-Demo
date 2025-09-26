// components/CustomNode.jsx with Lucide Icons
import React from 'react';
import { Handle, Position } from 'reactflow';
import { motion } from 'framer-motion';
import { Database, Cpu, Server, Cloud, Network, Settings } from 'lucide-react';

const nodeTypes = {
  dataPlane: 'bg-blue-50 border-blue-300',
  reconciler: 'bg-purple-50 border-purple-300',
  controlPlane: 'bg-green-50 border-green-300',
  database: 'bg-orange-50 border-orange-300',
  storage: 'bg-red-50 border-red-300',
  external: 'bg-gray-50 border-gray-300'
};

const sizeConfig = {
  dataPlane: 'min-w-[100px] max-w-[110px] p-2',
  reconciler: 'min-w-[100px] max-w-[110px] p-2', 
  controlPlane: 'min-w-[100px] max-w-[110px] p-2',
  database: 'min-w-[70px] max-w-[80px] p-1',
  storage: 'min-w-[70px] max-w-[80px] p-1',
  external: 'min-w-[90px] max-w-[100px] p-2'
};

const IconWrapper = ({ icon: Icon, color = "currentColor", size = 20 }) => (
  <div className="flex justify-center">
    <Icon size={size} color={color} />
  </div>
);

export default function CustomNode({ data, selected }) {
  const nodeStyle = nodeTypes[data.type] || 'bg-gray-50 border-gray-300';
  const sizeStyle = sizeConfig[data.type] || 'min-w-[90px] max-w-[100px] p-2';
  
  const renderIcon = () => {
    const iconProps = { size: data.type === 'database' || data.type === 'storage' ? 16 : 20 };
    
    switch (data.type) {
      case 'database':
        return <IconWrapper icon={Database} color="#F59E0B" {...iconProps} />;
      case 'storage':
        return <IconWrapper icon={Cpu} color="#EF4444" {...iconProps} />;
      case 'dataPlane':
        return <IconWrapper icon={Cloud} color="#3B82F6" {...iconProps} />;
      case 'reconciler':
        return <IconWrapper icon={Server} color="#8B5CF6" {...iconProps} />;
      case 'controlPlane':
        return <IconWrapper icon={Settings} color="#10B981" {...iconProps} />;
      case 'external':
        return <IconWrapper icon={Network} color="#6B7280" {...iconProps} />;
      default:
        return <div className="text-md mb-0.5">{data.emoji}</div>;
    }
  };

  return (
    <motion.div
      className={`rounded border shadow-xs ${sizeStyle} ${nodeStyle} ${
        selected ? 'ring-1 ring-blue-500' : ''
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Handle type="target" position={Position.Top} className="w-1 h-1" />
      
      <div className="text-center">
        {renderIcon()}
        <div className={`font-medium ${
          data.type === 'database' || data.type === 'storage' ? 'text-[9px]' : 'text-xs'
        } leading-tight mt-1`}>
          {data.label}
        </div>
        {data.subtitle && (
          <div className={`${
            data.type === 'database' || data.type === 'storage' ? 'text-[8px]' : 'text-xs'
          } text-gray-500 leading-tight mt-0.5`}>
            {data.subtitle}
          </div>
        )}
      </div>
      
      <Handle type="source" position={Position.Bottom} className="w-1 h-1" />
    </motion.div>
  );
}