import React from 'react';
import { format } from 'date-fns';
import Card from '../common/Card';
import CredibilityGauge from './CredibilityGauge';
import CredibilityBreakdown from './CredibilityBreakdown';
import ReasoningList from './ReasoningList';
import { CredibilityResult } from '../../types';

interface ResultCardProps {
  result: CredibilityResult;
}

const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  const formattedDate = format(new Date(result.timestamp), 'PPpp');
  console.log("RRRRRRRRRRRREsulfjl",result)

  return (
    <div className="space-y-6">
      <Card 
        title="Credibility Score" 
        subtitle={`Evaluated on ${formattedDate}`}
        className="flex flex-col items-center py-8"
      >
        <CredibilityGauge score={result.score} level={result.level} />
        
        <div className="mt-4 text-center">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Confidence: <span className="font-medium">{result.confidence.toFixed(1)}%</span>
          </div>
        </div>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CredibilityBreakdown breakdown={result.breakdown} />
        <ReasoningList reasoning={result.reasoning} level={result.level} />
      </div>
    </div>
  );
};

export default ResultCard;