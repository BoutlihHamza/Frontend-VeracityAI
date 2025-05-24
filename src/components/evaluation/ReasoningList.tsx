import React from 'react';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

interface ReasoningListProps {
  reasoning: string[];
  level: 'suspect' | 'doubtful' | 'credible';
}

const ReasoningList: React.FC<ReasoningListProps> = ({ reasoning, level }) => {
  const getIcon = () => {
    switch (level) {
      case 'credible':
        return <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />;
      case 'doubtful':
        return <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0" />;
      case 'suspect':
        return <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5">
      <div className="flex items-center mb-4">
        {getIcon()}
        <h3 className="ml-2 text-lg font-semibold text-gray-900 dark:text-white">Analysis Reasoning</h3>
      </div>
      
      <ul className="space-y-3">
        {reasoning.map((reason, index) => (
          <li key={index} className="flex">
            <span className="mr-2">•</span>
            <p className="text-gray-700 dark:text-gray-300">{reason}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReasoningList;