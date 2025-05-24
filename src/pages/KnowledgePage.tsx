import React, { useState, useEffect } from 'react';
import { Database, Plus, AlertCircle } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import FactList from '../components/knowledge/FactList';
import AddFactForm from '../components/knowledge/AddFactForm';
import { PrologFact } from '../types';
import { addFacts, listFacts } from '../api/api';

const KnowledgePage: React.FC = () => {
  const [facts, setFacts] = useState<PrologFact[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFacts();
  }, []);

  const fetchFacts = async () => {
    try {
      setIsLoading(true);
      const facts = await listFacts();
      setFacts(facts);
    } catch (error) {
      setError('Failed to fetch knowledge base facts');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddFacts = async (newFacts: PrologFact[]) => {
    try {
      setIsLoading(true);
      setError(null);
      
      await addFacts({ facts: newFacts });
      await fetchFacts();
      setIsAdding(false);
      
    } catch (error) {
      setError('Failed to add facts to knowledge base');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Database className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Knowledge Base Management
          </h1>
        </div>
        
        
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-start">
          <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
          <p className="text-red-700 dark:text-red-400">{error}</p>
        </div>
      )}
        <FactList facts={facts} />
      
    </div>
  );
};

export default KnowledgePage;