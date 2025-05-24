import React, { useState } from 'react';
import { format } from 'date-fns';
import { ChevronDown, ChevronUp, RefreshCw } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import { HistoryItem as HistoryItemType } from '../../types';

interface HistoryItemProps {
  item: HistoryItemType;
  onReEvaluate: (input: HistoryItemType['input']) => void;
  isLoading: boolean;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ 
  item, 
  onReEvaluate,
  isLoading
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
  
  // Format timestamp
  const formattedTime = format(new Date(item.timestamp), 'PPpp');
  
  // Truncate content
  const truncatedContent = item.input.content.length > 100 
    ? `${item.input.content.substring(0, 100)}...` 
    : item.input.content;
  
  return (
    <Card className="overflow-visible">
      <div>
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            {formattedTime}
          </div>
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>
        
        <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {truncatedContent}
        </div>
        
        {item.result ? (
          <div className="mt-4 flex justify-between items-center">
            <div className="flex items-center">
              <div className="mr-6">
                <div className="text-sm text-gray-500 dark:text-gray-400">Score</div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">
                  {item.result.score}
                </div>
              </div>
              
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Level</div>
                <div className={`text-xl font-bold capitalize ${getLevelColor(item.result.level)}`}>
                  {item.result.level}
                </div>
              </div>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              leftIcon={<RefreshCw size={14} />}
              onClick={() => onReEvaluate(item.input)}
              isLoading={isLoading}
            >
              Re-evaluate
            </Button>
          </div>
        ) : (
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              No results available
            </div>
            
            <Button
              variant="outline"
              size="sm"
              leftIcon={<RefreshCw size={14} />}
              onClick={() => onReEvaluate(item.input)}
              isLoading={isLoading}
            >
              Evaluate
            </Button>
          </div>
        )}
        
        {expanded && item.result && (
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white mb-2">Score Breakdown</h5>
                <ul className="space-y-1">
                  <li className="flex justify-between text-sm">
                    <span className="text-gray-500">Source:</span>
                    <span className="font-medium">{item.result.breakdown.sourceScore}</span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span className="text-gray-500">Citations:</span>
                    <span className="font-medium">{item.result.breakdown.citationScore}</span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span className="text-gray-500">Language:</span>
                    <span className="font-medium">{item.result.breakdown.languageScore}</span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span className="text-gray-500">Contradictions:</span>
                    <span className="font-medium">{item.result.breakdown.contradictionScore}</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white mb-2">Analysis Reasoning</h5>
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  {item.result.reasoning.map((reason, i) => (
                    <li key={i} className="flex">
                      <span className="mr-2">•</span>
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="mt-4 text-sm text-gray-500">
              Confidence: <span className="font-medium">{item.result.confidence.toFixed(1)}%</span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default HistoryItem;