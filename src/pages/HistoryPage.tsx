import React, { useState } from 'react';
import { History, Trash2, AlertCircle } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import HistoryItem from '../components/history/HistoryItem';
import { InformationInput } from '../types';
import { evaluateInformation } from '../api/api';
import { useHistory } from '../context/HistoryContext';

const HistoryPage: React.FC = () => {
  const { history, addToHistory, clearHistory } = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [currentItemId, setCurrentItemId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const handleReEvaluate = async (input: InformationInput) => {
    try {
      const historyItem = history.find(item => item.input === input);
      if (historyItem) {
        setCurrentItemId(historyItem.id);
      }
      
      setIsLoading(true);
      setError(null);
      
      const result = await evaluateInformation(input);
      
      addToHistory(input, result);
    } catch (error) {
      console.error('Re-evaluation failed:', error);
      setError('Failed to re-evaluate information. Please try again later.');
    } finally {
      setIsLoading(false);
      setCurrentItemId(null);
    }
  };
  
  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all history? This action cannot be undone.')) {
      clearHistory();
    }
  };
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <History className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Evaluation History
          </h1>
        </div>
        
        {history.length > 0 && (
          <Button 
            variant="outline"
            leftIcon={<Trash2 size={16} />}
            onClick={handleClearHistory}
          >
            Clear History
          </Button>
        )}
      </div>
      
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-start">
          <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
          <p className="text-red-700 dark:text-red-400">{error}</p>
        </div>
      )}
      
      {history.length > 0 ? (
        <div className="space-y-4">
          {history.map((item) => (
            <HistoryItem
              key={item.id}
              item={item}
              onReEvaluate={handleReEvaluate}
              isLoading={isLoading && currentItemId === item.id}
            />
          ))}
        </div>
      ) : (
        <Card>
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">
              No evaluation history available. Evaluate some information to see it here.
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default HistoryPage;