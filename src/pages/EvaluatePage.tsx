import React, { useState, useEffect } from 'react';
import { Shield, AlertCircle, Activity } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import EvaluationForm from '../components/evaluation/EvaluationForm';
import ResultCard from '../components/evaluation/ResultCard';
import TestScenarioCard from '../components/evaluation/TestScenarioCard';
import { InformationInput, CredibilityResult, TestScenario } from '../types';
import { evaluateInformation, getTestScenarios } from '../api/api';
import { useHistory } from '../context/HistoryContext';

const EvaluatePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isScenarioLoading, setIsScenarioLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inputData, setInputData] = useState<InformationInput | null>(null);
  const [result, setResult] = useState<CredibilityResult | null>(null);
  const [testScenarios, setTestScenarios] = useState<TestScenario | null>(null);
  const [scenariosLoading, setScenariosLoading] = useState(false);
  
  const { addToHistory } = useHistory();

  // Fetch test scenarios on mount
  useEffect(() => {
    const fetchScenarios = async () => {
      try {
        setScenariosLoading(true);
        const scenarios = await getTestScenarios();
        setTestScenarios(scenarios);
      } catch (error) {
        console.error('Failed to fetch test scenarios:', error);
      } finally {
        setScenariosLoading(false);
      }
    };
    
    fetchScenarios();
  }, []);

  const handleSubmit = async (data: InformationInput) => {
    try {
      setIsLoading(true);
      setError(null);
      setInputData(data);
      
      const result = await evaluateInformation(data);
      
      setResult(result);
      addToHistory(data, result);
    } catch (error) {
      console.error('Evaluation failed:', error);
      setError('Failed to evaluate information. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSelectScenario = async (data: InformationInput) => {
    try {
      setIsScenarioLoading(true);
      setError(null);
      setInputData(data);
      
      const result = await evaluateInformation(data);
      
      setResult(result);
      addToHistory(data, result);
    } catch (error) {
      console.error('Scenario evaluation failed:', error);
      setError('Failed to evaluate scenario. Please try again later.');
    } finally {
      setIsScenarioLoading(false);
    }
  };
  
  const reset = () => {
    setInputData(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Information Credibility Evaluation
          </h1>
        </div>
        
        {result && (
          <Button 
            variant="outline" 
            onClick={reset}
          >
            New Evaluation
          </Button>
        )}
      </div>
      
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-start">
          <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
          <p className="text-red-700 dark:text-red-400">{error}</p>
        </div>
      )}
      
      {!result ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card title="Evaluate Information">
              <EvaluationForm 
                onSubmit={handleSubmit} 
                isLoading={isLoading}
                initialData={inputData || undefined}
              />
            </Card>
          </div>
          
          <div>
            <div className="mb-4 flex items-center">
              <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Test Scenarios
              </h2>
            </div>
            
            {scenariosLoading ? (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">Loading scenarios...</p>
              </div>
            ) : testScenarios ? (
              <div className="space-y-4">
                {Object.entries(testScenarios).map(([key, scenario]) => (
                  <TestScenarioCard
                    key={key}
                    title={key.replace(/_/g, ' ').replace(/case\d+/i, '').trim()}
                    data={scenario}
                    onSelect={handleSelectScenario}
                    isLoading={isScenarioLoading}
                  />
                ))}
              </div>
            ) : (
              <Card>
                <p className="text-gray-500 dark:text-gray-400">
                  No test scenarios available.
                </p>
              </Card>
            )}
          </div>
        </div>
      ) : (
        <ResultCard result={result} />
      )}
    </div>
  );
};

export default EvaluatePage;