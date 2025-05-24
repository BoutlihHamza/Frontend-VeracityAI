import React from 'react';
import { BarChart2 } from 'lucide-react';

interface BreakdownProps {
  breakdown: {
    sourceScore: number;
    citationScore: number;
    languageScore: number;
    contradictionScore: number;
  };
}

const CredibilityBreakdown: React.FC<BreakdownProps> = ({ breakdown }) => {
  // Helper to get color based on score
  const getScoreColor = (score: number) => {
    if (score <= 30) return 'bg-red-500';
    if (score <= 60) return 'bg-yellow-500';
    return 'bg-green-500';
  };
  
  const categories = [
    { name: 'Source', score: breakdown.sourceScore, weight: '40%' },
    { name: 'Citations', score: breakdown.citationScore, weight: '30%' },
    { name: 'Language', score: breakdown.languageScore, weight: '20%' },
    { name: 'Contradictions', score: breakdown.contradictionScore, weight: '10%' }
  ];
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5">
      <div className="flex items-center mb-4">
        <BarChart2 className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Score Breakdown</h3>
      </div>
      
      <div className="space-y-4">
        {categories.map((category) => (
          <div key={category.name} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {category.name} <span className="text-gray-500 dark:text-gray-400">({category.weight})</span>
              </span>
              <span className="font-semibold text-gray-900 dark:text-white">{category.score}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full ${getScoreColor(category.score)}`} 
                style={{ width: `${category.score}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CredibilityBreakdown;