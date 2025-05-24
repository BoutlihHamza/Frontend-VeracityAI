import React, { useState } from 'react';
import { format } from 'date-fns';
import { ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import Card from '../common/Card';
import { InformationInput, CredibilityResult } from '../../types';

interface BatchResultItemProps {
  index: number;
  input: InformationInput;
  result?: CredibilityResult;
  error?: string;
  success: boolean;
}

const BatchResultItem: React.FC<BatchResultItemProps> = ({
  index,
  input,
  result,
  error,
  success
}) => {
  const [expanded, setExpanded] = useState(false);
  
  // Helper to get color based on credibility level
  const getLevelColor = (level?: 'suspect' | 'doubtful' | 'credible') => {
    if (!level) return 'text-gray-500';
    
    switch (level) {
      case 'suspect': return 'text-red-500';
      case 'doubtful': return 'text-yellow-500';
      case 'credible': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };
  
  // Truncate content
  const truncatedContent = input.content.length > 100 
    ? `${input.content.substring(0, 100)}...` 
    : input.content;
  
  return (
    <Card className="overflow-visible">
      <div>
        <div className="flex justify-between items-center">
          <h4 className="text-lg font-medium text-gray-900 dark:text-white">
            Result #{index + 1}
          </h4>
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>
        
        <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
          {truncatedContent}
        </div>
        
        {!success ? (
          <div className="mt-4 flex items-center text-red-500">
            <AlertCircle size={16} className="mr-2" />
            <span>{error || 'Evaluation failed'}</span>
          </div>
        ) : (
          <div className="mt-4 flex justify-between items-center">
            <div className="flex items-center">
              <div className="mr-6">
                <div className="text-sm text-gray-500 dark:text-gray-400">Score</div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">
                  {result?.score || 'N/A'}
                </div>
              </div>
              
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Level</div>
                <div className={`text-xl font-bold capitalize ${getLevelColor(result?.level)}`}>
                  {result?.level || 'N/A'}
                </div>
              </div>
            </div>
            
            {result?.timestamp && (
              <div className="text-xs text-gray-500">
                {format(new Date(result.timestamp), 'PP')}
              </div>
            )}
          </div>
        )}
        
        {expanded && success && result && (
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white mb-2">Score Breakdown</h5>
                <ul className="space-y-1">
                  <li className="flex justify-between text-sm">
                    <span className="text-gray-500">Source:</span>
                    <span className="font-medium">{result.breakdown.sourceScore}</span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span className="text-gray-500">Citations:</span>
                    <span className="font-medium">{result.breakdown.citationScore}</span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span className="text-gray-500">Language:</span>
                    <span className="font-medium">{result.breakdown.languageScore}</span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span className="text-gray-500">Contradictions:</span>
                    <span className="font-medium">{result.breakdown.contradictionScore}</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white mb-2">Analysis Reasoning</h5>
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  {result.reasoning.map((reason, i) => (
                    <li key={i} className="flex">
                      <span className="mr-2">•</span>
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="mt-4 text-sm text-gray-500">
              Confidence: <span className="font-medium">{result.confidence.toFixed(1)}%</span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default BatchResultItem;