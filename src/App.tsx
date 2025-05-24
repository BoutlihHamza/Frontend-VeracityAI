import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import EvaluatePage from './pages/EvaluatePage';
import BatchEvaluationPage from './pages/BatchEvaluationPage';
import HistoryPage from './pages/HistoryPage';
import AboutPage from './pages/AboutPage';
import KnowledgePage from './pages/KnowledgePage';
import { ThemeProvider } from './context/ThemeContext';
import { HistoryProvider } from './context/HistoryContext';

function App() {
  return (
    <ThemeProvider>
      <HistoryProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<EvaluatePage />} />
              <Route path="/batch" element={<BatchEvaluationPage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/knowledge" element={<KnowledgePage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </Layout>
        </Router>
      </HistoryProvider>
    </ThemeProvider>
  );
}

export default App;