import React from 'react';
import { useResumeContext } from '../context/ResumeContext';
import { Loader2, Award, AlertTriangle, Download, Check, AlertCircle } from 'lucide-react';
import ScoreChart from './ScoreChart';
import KeywordMatch from './KeywordMatch';
import SectionFeedback from './SectionFeedback';

const AnalysisResults: React.FC = () => {
  const { analysisData, isAnalyzing } = useResumeContext();

  if (isAnalyzing) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 h-full flex flex-col items-center justify-center animate-fadeIn">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
        <h3 className="text-lg font-medium text-gray-800 mb-2">Analyzing Your Resume</h3>
        <p className="text-gray-600 text-center max-w-md">
          Our AI is reviewing your resume, analyzing its content, and generating personalized feedback.
        </p>
      </div>
    );
  }

  if (!analysisData) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 h-full flex flex-col items-center justify-center">
        <div className="bg-blue-50 p-4 rounded-full mb-4">
          <Award className="w-10 h-10 text-blue-500" />
        </div>
        <h3 className="text-lg font-medium text-gray-800 mb-2">Ready to Analyze Your Resume</h3>
        <p className="text-gray-600 text-center max-w-md">
          Upload your resume and optionally a job description to get detailed feedback and suggestions for improvement.
        </p>
      </div>
    );
  }

  const { overallScore, keywordMatch, sectionScores, suggestions, strengths, improvements } = analysisData;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-fadeIn">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-xl font-bold text-gray-800">Analysis Results</h2>
        <button className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
          <Download className="w-4 h-4 mr-1" />
          Export PDF
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center">
          <h3 className="text-sm font-medium text-gray-500 uppercase mb-3">Overall Score</h3>
          <div className="flex items-center justify-center relative mb-2">
            <ScoreChart score={overallScore} />
          </div>
          <p className="text-gray-800 font-medium">
            {overallScore >= 80 ? 'Excellent' : 
             overallScore >= 60 ? 'Good' : 
             overallScore >= 40 ? 'Average' : 'Needs Improvement'}
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-500 uppercase mb-3">Keyword Match</h3>
          <KeywordMatch percentage={keywordMatch.percentage} matched={keywordMatch.matched} missing={keywordMatch.missing} />
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-500 uppercase mb-3">Key Strengths</h3>
          <ul className="space-y-2">
            {strengths.map((strength, index) => (
              <li key={index} className="flex items-start">
                <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">{strength}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-800 mb-3">Section Analysis</h3>
        <div className="space-y-4">
          {Object.entries(sectionScores).map(([section, score]) => (
            <SectionFeedback 
              key={section} 
              section={section} 
              score={score} 
              feedback={suggestions[section] || []} 
            />
          ))}
        </div>
      </div>

      <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
        <div className="flex items-start">
          <AlertCircle className="w-5 h-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-yellow-800 mb-1">Areas for Improvement</h4>
            <ul className="space-y-2">
              {improvements.map((improvement, index) => (
                <li key={index} className="text-sm text-yellow-700">• {improvement}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;