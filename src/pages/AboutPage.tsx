import React from 'react';
import { Info, Shield, Database, GitBranch, AlertTriangle } from 'lucide-react';
import Card from '../components/common/Card';

const AboutPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Info className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          About the Credibility Evaluation System
        </h1>
      </div>
      
      <div className="prose prose-blue dark:prose-invert max-w-none">
        <p className="text-lg">
          The Credibility Evaluation System is an AI-powered expert system designed to assess the 
          credibility of information based on multiple criteria and provide an objective analysis.
        </p>
        
        <h2 className="flex items-center">
          <Shield className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
          How It Works
        </h2>
        
        <p>
          The system analyzes information using a multi-criteria approach that considers:
        </p>
        
        <ul>
          <li>
            <strong>Source Analysis:</strong> Evaluates the reputation and type of the source
            (official, news, social media, etc.)
          </li>
          <li>
            <strong>Citation Evaluation:</strong> Checks for the presence and quantity of citations
            and references that support the information
          </li>
          <li>
            <strong>Language Assessment:</strong> Detects emotional language that might indicate bias
          </li>
          <li>
            <strong>Author Credibility:</strong> Considers whether the author is anonymous or a known
            expert in the field
          </li>
          <li>
            <strong>Contradiction Detection:</strong> Checks for internal consistency and contradiction
            with established facts
          </li>
        </ul>
        
        <h2 className="flex items-center">
          <Database className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
          Technical Implementation
        </h2>
        
        <p>
          The system combines multiple technologies:
        </p>
        
        <ul>
          <li>A Node.js backend with Express for the API</li>
          <li>Prolog for the expert system knowledge base and reasoning engine</li>
          <li>React and TypeScript for the frontend interface</li>
          <li>Multi-criteria decision analysis for weighted scoring</li>
        </ul>
        
        <h2 className="flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
          Limitations
        </h2>
        
        <p>
          While the system provides valuable insights, it has some limitations:
        </p>
        
        <ul>
          <li>It relies on the accuracy of the provided metadata</li>
          <li>It cannot independently verify external facts</li>
          <li>The system provides an assessment, not absolute truth</li>
          <li>Cultural and contextual nuances may not be fully captured</li>
        </ul>
        
        <h2 className="flex items-center">
          <GitBranch className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
          Use Cases
        </h2>
        
        <p>
          The Credibility Evaluation System can be used for:
        </p>
        
        <ul>
          <li>Evaluating news articles and social media posts</li>
          <li>Assessing the reliability of research papers</li>
          <li>Educational purposes to promote critical thinking</li>
          <li>Media literacy and fact-checking training</li>
          <li>Automating first-pass verification for content moderation</li>
        </ul>
      </div>
      
      <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-400 mb-2">
            Disclaimer
          </h3>
          <p className="text-blue-700 dark:text-blue-300">
            This system is designed as a decision support tool, not a replacement for human judgment.
            Always critically evaluate information using multiple sources and your own reasoning.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default AboutPage;