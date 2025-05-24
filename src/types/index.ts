export interface InformationInput {
  content: string;
  source: {
    url?: string;
    domain?: string;
    type: 'official' | 'news' | 'blog' | 'social' | 'unknown';
    reputation: number; // 0-1 scale
  };
  author: {
    name?: string;
    credentials?: string;
    isAnonymous: boolean;
    knownExpert: boolean;
  };
  metadata: {
    publicationDate?: string;
    lastModified?: string;
    language: string;
    hasEmotionalLanguage: boolean;
    hasCitations: boolean;
    citationCount: number;
    hasReferences: boolean;
    referenceUrls: string[];
  };
}

export interface CredibilityResult {
  score: number; // 0-100
  level: 'suspect' | 'doubtful' | 'credible';
  breakdown: {
    sourceScore: number;
    citationScore: number;
    languageScore: number;
    contradictionScore: number;
  };
  reasoning: string[];
  confidence: number;
  timestamp: string;
}

export interface PrologQuery {
  predicate: string;
  arguments: any[];
}

export interface PrologResponse {
  success: boolean;
  result: any;
  error?: string;
}

export interface PrologFact {
  predicate: string;
  arguments: string[];
  comment?: string;
}

export interface AddFactRequest {
  facts: PrologFact[];
  source?: string;
  expiration?: string;
}

export interface HistoryItem {
  id: string;
  input: InformationInput;
  result?: CredibilityResult;
  timestamp: string;
}

export interface TestScenario {
  [key: string]: InformationInput;
}

export interface BatchEvaluationResult {
  total: number;
  successful: number;
  failed: number;
  results: Array<{
    index: number;
    success: boolean;
    data?: CredibilityResult;
    error?: string;
  }>;
}