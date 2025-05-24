import React from 'react';
import { Database, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { format } from 'date-fns';
import { PrologFact } from '../../types';
import Card from '../common/Card';

interface FactListProps {
  facts: PrologFact[];
}

const FactList: React.FC<FactListProps> = ({ facts }) => {
  // Filter distinct evaluations based on content
  const distinctFacts = facts.reduce((acc: PrologFact[], current) => {
    const isDuplicate = acc.some(fact => 
      fact.predicate === 'evaluation' && 
      current.predicate === 'evaluation' &&
      fact.arguments[0] === current.arguments[0]
    );
    
    if (!isDuplicate) {
      acc.push(current);
    }
    return acc;
  }, []);

  const getCredibilityIcon = (level: string) => {
    switch (level) {
      case 'credible':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'doubtful':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'suspect':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getCredibilityColor = (level: string) => {
    switch (level) {
      case 'credible':
        return 'text-green-600 dark:text-green-400';
      case 'doubtful':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'suspect':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const formatScore = (score: string) => {
    const numScore = parseFloat(score);
    return Math.round(numScore);
  };

  const parseReasoningPoints = (reasoning: string): { text: string; score?: number }[] => {
  return reasoning.split(';').map(point => {
    const trimmedPoint = point.trim();
    
    // Extract scores from points
    const scoreMatch = trimmedPoint.match(/score: ([\d.]+)/);
    const score = scoreMatch ? Math.round(parseFloat(scoreMatch[1]) * 100) : undefined;
    
    // Transform boolean values and format text
    let text = trimmedPoint
      .replace(/: true/g, ': YES')
      .replace(/: false/g, ': NO');

    // Handle citations formatting
    text = text.replace(/Citations: (YES|NO) \((\d+) found, score: [\d.]+\)/g, 
      (_, presence, count) => `Citations: ${count} references found`);

    // Handle source type formatting
    text = text.replace(/Source type: ([a-z]+) \(score: ([\d.]+)\)/g, 
      (_, type, rawScore) => {
        const formattedScore = Math.round(parseFloat(rawScore) * 100);
        return `Source: ${type.charAt(0).toUpperCase() + type.slice(1)} (${formattedScore}%)`;
      });

    // Replace score placeholder
    text = text.replace(/\(score: [\d.]+\)/g, score ? `(${score}%)` : '');
    
    return { text, score };
  });
};

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-green-600 dark:text-green-400';
    if (score >= 40) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="space-y-4">
      {distinctFacts.length === 0 ? (
        <Card>
          <div className="text-center py-8">
            <Database className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No evaluations in the knowledge base yet.</p>
          </div>
        </Card>
      ) : (
        distinctFacts.map((fact, index) => {
          if (fact.predicate === 'evaluation') {
            const [content, level, score, reasoning] = fact.arguments;
            const timestamp = fact.comment?.split(' at ')[1];
            const reasoningPoints = parseReasoningPoints(reasoning);
            const formattedScore = formatScore(score);

            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        {getCredibilityIcon(level)}
                        <h4 className={`text-lg font-semibold capitalize ${getCredibilityColor(level)}`}>
                          {level} Credibility
                        </h4>
                      </div>
                      <p className="mt-2 text-gray-700 dark:text-gray-300">
                        {content}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${getScoreColor(formattedScore)}`}>
                        {formattedScore}%
                      </div>
                      <div className="text-sm text-gray-500">Credibility Score</div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <h5 className="font-medium text-gray-900 dark:text-white mb-2">Detailed Analysis</h5>
                    <ul className="space-y-2">
                      {reasoningPoints.map((point, i) => (
                        <li key={i} className="text-sm flex items-baseline">
                          <span className="mr-2 text-blue-500">•</span>
                          <span className="text-gray-700 dark:text-gray-300">{point.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {timestamp && (
                    <div className="text-xs text-gray-500 pt-2">
                      Evaluated on {format(new Date(timestamp), 'PPp')}
                    </div>
                  )}
                </div>
              </Card>
            );
          }
          return null;
        })
      )}
    </div>
  );
};

export default FactList;