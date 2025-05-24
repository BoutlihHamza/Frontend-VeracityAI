import axios from 'axios';
import { InformationInput, CredibilityResult, TestScenario, BatchEvaluationResult, AddFactRequest, PrologFact } from '../types';

// Base API configuration
const API_URL = 'http://localhost:3000/api/v1';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API endpoints
export const evaluateInformation = async (data: InformationInput): Promise<CredibilityResult> => {
  try {
    const response = await api.post('/evaluate', data);
    return response.data.data;
  } catch (error) {
    console.error('Error evaluating information:', error);
    throw error;
  }
};

export const getTestScenarios = async (): Promise<TestScenario> => {
  try {
    const response = await api.get('/evaluate/test');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching test scenarios:', error);
    throw error;
  }
};

export const evaluateBatch = async (items: InformationInput[]): Promise<BatchEvaluationResult> => {
  try {
    const response = await api.post('/evaluate/batch', { items });
    return response.data.data;
  } catch (error) {
    console.error('Error evaluating batch:', error);
    throw error;
  }
};

export const checkApiHealth = async (): Promise<boolean> => {
  try {
    const response = await api.get('/health');
    return response.data.success;
  } catch (error) {
    console.error('API health check failed:', error);
    return false;
  }
};

// Knowledge base endpoints
export const addFacts = async (data: AddFactRequest): Promise<void> => {
  try {
    await api.post('/knowledge/facts', data);
  } catch (error) {
    console.error('Error adding facts:', error);
    throw error;
  }
};

export const listFacts = async (): Promise<PrologFact[]> => {
  try {
    const response = await api.get('/knowledge/facts');
    console.log(response)
    return response.data.data;
  } catch (error) {
    console.error('Error listing facts:', error);
    throw error;
  }
};