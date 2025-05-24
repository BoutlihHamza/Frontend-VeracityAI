import React from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import { InformationInput } from '../../types';

interface TestScenarioCardProps {
  title: string;
  data: InformationInput;
  onSelect: (data: InformationInput) => void;
  isLoading: boolean;
}

const TestScenarioCard: React.FC<TestScenarioCardProps> = ({ 
  title, 
  data, 
  onSelect,
  isLoading
}) => {
  // Get color based on source type
  const getSourceTypeColor = (type: string) => {
    switch (type) {
      case 'official': return 'text-green-600';
      case 'news': return 'text-blue-600';
      case 'blog': return 'text-purple-600';
      case 'social': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };
  
  // Truncate content
  const truncatedContent = data.content.length > 120 
    ? `${data.content.substring(0, 120)}...` 
    : data.content;
  
  return (
    <Card className="h-full flex flex-col">
      <div className="flex-grow">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
          {truncatedContent}
        </p>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Source:</span>
            <span className={`font-medium ${getSourceTypeColor(data.source.type)}`}>
              {data.source.type}
            </span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Reputation:</span>
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {data.source.reputation}
            </span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Author:</span>
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {data.author.isAnonymous ? 'Anonymous' : (data.author.name || 'Unknown')}
            </span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Citations:</span>
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {data.metadata.hasCitations ? data.metadata.citationCount : 'None'}
            </span>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <Button 
          onClick={() => onSelect(data)}
          isLoading={isLoading}
          className="w-full"
        >
          Use This Scenario
        </Button>
      </div>
    </Card>
  );
};

export default TestScenarioCard;