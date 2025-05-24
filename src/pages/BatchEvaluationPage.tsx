import React, { useState } from 'react';
import { ClipboardList, PlusCircle, AlertCircle } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import BatchItem from '../components/batch/BatchItem';
import BatchResultItem from '../components/batch/BatchResultItem';
import { InformationInput, BatchEvaluationResult } from '../types';
import { evaluateBatch } from '../api/api';
import { useHistory } from '../context/HistoryContext';

// Empty batch item template
const emptyBatchItem: InformationInput = {
  content: '',
  source: {
    type: 'unknown',
    reputation: 0.5
  },
  author: {
    isAnonymous: false,
    knownExpert: false
  },
  metadata: {
    language: 'en',
    hasEmotionalLanguage: false,
    hasCitations: false,
    citationCount: 0,
    hasReferences: false,
    referenceUrls: []
  }
};

const BatchEvaluationPage: React.FC = () => {
  const [batchItems, setBatchItems] = useState<InformationInput[]>([
    { ...emptyBatchItem },
    { ...emptyBatchItem }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<BatchEvaluationResult | null>(null);
  
  const { addToHistory } = useHistory();
  
  const handleItemChange = (index: number, item: InformationInput) => {
    setBatchItems((prev) => {
      const newItems = [...prev];
      newItems[index] = item;
      return newItems;
    });
  };
  
  const handleAddItem = () => {
    if (batchItems.length >= 10) {
      setError('Maximum of 10 items allowed for batch evaluation.');
      return;
    }
    
    setBatchItems((prev) => [...prev, { ...emptyBatchItem }]);
  };
  
  const handleRemoveItem = (index: number) => {
    if (batchItems.length <= 1) {
      setError('At least one item is required.');
      return;
    }
    
    setBatchItems((prev) => prev.filter((_, i) => i !== index));
  };
  
  const validateBatch = (): boolean => {
    // Check for empty content
    const hasEmptyContent = batchItems.some((item) => !item.content.trim());
    if (hasEmptyContent) {
      setError('All items must have content to evaluate.');
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = async () => {
    if (!validateBatch()) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      const result = await evaluateBatch(batchItems);
      setResults(result);
      
      // Add successful results to history
      result.results.forEach((res, idx) => {
        if (res.success && res.data) {
          addToHistory(batchItems[idx], res.data);
        }
      });
      
    } catch (error) {
      console.error('Batch evaluation failed:', error);
      setError('Failed to evaluate batch. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const reset = () => {
    setBatchItems([{ ...emptyBatchItem }, { ...emptyBatchItem }]);
    setResults(null);
    setError(null);
  };
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <ClipboardList className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Batch Evaluation
          </h1>
        </div>
        
        {results && (
          <Button 
            variant="outline" 
            onClick={reset}
          >
            New Batch
          </Button>
        )}
      </div>
      
      <p className="text-gray-600 dark:text-gray-400">
        Evaluate multiple information items at once. Add up to 10 items for batch processing.
      </p>
      
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-start">
          <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
          <p className="text-red-700 dark:text-red-400">{error}</p>
        </div>
      )}
      
      {!results ? (
        <>
          <div className="space-y-4">
            {batchItems.map((item, index) => (
              <BatchItem
                key={index}
                index={index}
                item={item}
                onChange={handleItemChange}
                onRemove={handleRemoveItem}
                isRemovable={batchItems.length > 1}
              />
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={handleAddItem}
              variant="outline"
              leftIcon={<PlusCircle size={16} />}
              disabled={batchItems.length >= 10}
            >
              Add Item ({batchItems.length}/10)
            </Button>
            
            <Button
              onClick={handleSubmit}
              isLoading={isLoading}
              disabled={batchItems.length === 0}
            >
              Evaluate Batch
            </Button>
          </div>
          
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <p>Note: Batch evaluation is limited to 10 items maximum.</p>
          </div>
        </>
      ) : (
        <div className="space-y-8">
          <Card>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Batch Results Summary
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Processed {results.total} items with {results.successful} successful and {results.failed} failed evaluations.
                </p>
              </div>
            </div>
          </Card>
          
          <div className="space-y-4">
            {results.results.map((result, index) => (
              <BatchResultItem
                key={index}
                index={index}
                input={batchItems[result.index]}
                result={result.data}
                error={result.error}
                success={result.success}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BatchEvaluationPage;