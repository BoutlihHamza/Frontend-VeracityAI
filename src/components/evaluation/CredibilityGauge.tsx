import React from 'react';
import { motion } from 'framer-motion';

interface CredibilityGaugeProps {
  score: number;
  level: 'suspect' | 'doubtful' | 'credible';
}

const CredibilityGauge: React.FC<CredibilityGaugeProps> = ({ score, level }) => {
  // Calculate rotation based on score (0-100)
  const rotation = (score / 100) * 180 - 90;
  
  // Determine color based on level
  const colors = {
    suspect: 'rgb(239, 68, 68)',    // red-500
    doubtful: 'rgb(234, 179, 8)',   // yellow-500
    credible: 'rgb(34, 197, 94)'    // green-500
  };
  
  const levelColor = colors[level];
  
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-64 h-32 overflow-hidden">
        {/* Gauge background */}
        <div className="absolute top-0 w-64 h-64 rounded-full border-16 border-gray-200 dark:border-gray-700" />
        
        {/* Gauge levels */}
        <div className="absolute top-0 w-64 h-64">
          <div className="absolute top-0 left-0 w-full h-full rounded-full border-16 border-transparent border-t-red-500 transform -rotate-90" />
          <div className="absolute top-0 left-0 w-full h-full rounded-full border-16 border-transparent border-t-yellow-500 transform -rotate-30" />
          <div className="absolute top-0 left-0 w-full h-full rounded-full border-16 border-transparent border-t-green-500 transform rotate-30" />
        </div>
        
        {/* Gauge needle */}
        <motion.div 
          className="absolute top-0 left-1/2 w-1 h-32 bg-gray-800 dark:bg-white origin-bottom"
          initial={{ rotate: -90 }}
          animate={{ rotate: rotation }}
          transition={{ type: 'spring', stiffness: 50, damping: 15 }}
        />
        
        {/* Center point */}
        <div className="absolute top-[128px] left-1/2 w-6 h-6 rounded-full bg-gray-800 dark:bg-white transform -translate-x-1/2 -translate-y-1/2" />
      </div>
      
      {/* Score display */}
      <div className="mt-4 text-center">
        <div className="text-4xl font-bold" style={{ color: levelColor }}>
          {score}
        </div>
        <div className="text-lg font-semibold capitalize mt-1" style={{ color: levelColor }}>
          {level}
        </div>
      </div>
    </div>
  );
};

export default CredibilityGauge;