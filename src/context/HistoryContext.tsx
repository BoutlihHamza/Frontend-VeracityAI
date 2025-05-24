import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { HistoryItem, InformationInput, CredibilityResult } from '../types';

interface HistoryContextType {
  history: HistoryItem[];
  addToHistory: (input: InformationInput, result?: CredibilityResult) => void;
  clearHistory: () => void;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export const HistoryProvider = ({ children }: { children: ReactNode }) => {
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    const savedHistory = localStorage.getItem('evaluation_history');
    if (savedHistory) {
      try {
        return JSON.parse(savedHistory);
      } catch (error) {
        console.error('Error parsing saved history:', error);
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('evaluation_history', JSON.stringify(history));
  }, [history]);

  const addToHistory = (input: InformationInput, result?: CredibilityResult) => {
    const newHistoryItem: HistoryItem = {
      id: crypto.randomUUID(),
      input,
      result,
      timestamp: new Date().toISOString(),
    };
    setHistory((prev) => [newHistoryItem, ...prev].slice(0, 50)); // Keep only most recent 50 items
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <HistoryContext.Provider value={{ history, addToHistory, clearHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = (): HistoryContextType => {
  const context = useContext(HistoryContext);
  if (context === undefined) {
    throw new Error('useHistory must be used within a HistoryProvider');
  }
  return context;
};