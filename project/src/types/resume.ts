export interface AnalysisData {
  overallScore: number;
  keywordMatch: {
    percentage: number;
    matched: string[];
    missing: string[];
  };
  sectionScores: {
    [key: string]: number;
  };
  suggestions: {
    [key: string]: string[];
  };
  strengths: string[];
  improvements: string[];
}

export interface ResumeFile {
  name: string;
  content: string;
}