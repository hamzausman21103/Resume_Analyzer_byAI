import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AnalysisData } from '../types/resume';
import { analyzeKeywordMatch } from '../utils/resumeAnalyzer';

interface ResumeContextType {
  analysisData: AnalysisData | null;
  setAnalysisData: (data: AnalysisData) => void;
  isAnalyzing: boolean;
  setIsAnalyzing: (isAnalyzing: boolean) => void;
  jobDescription: string;
  setJobDescription: (description: string) => void;
  updateAnalysisWithJobMatch: (jobDescription: string) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [jobDescription, setJobDescription] = useState('');

  const updateAnalysisWithJobMatch = (description: string) => {
    if (!analysisData) return;
    
    setIsAnalyzing(true);
    
    // Simulate updating the analysis with the job description
    setTimeout(() => {
      const keywordMatch = analyzeKeywordMatch(description);
      
      setAnalysisData({
        ...analysisData,
        keywordMatch
      });
      
      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <ResumeContext.Provider 
      value={{ 
        analysisData, 
        setAnalysisData, 
        isAnalyzing, 
        setIsAnalyzing,
        jobDescription,
        setJobDescription,
        updateAnalysisWithJobMatch
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResumeContext = (): ResumeContextType => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResumeContext must be used within a ResumeProvider');
  }
  return context;
};