import React, { useState } from 'react';
import { useResumeContext } from '../context/ResumeContext';
import { Briefcase, X } from 'lucide-react';

const JobDescriptionInput: React.FC = () => {
  const { jobDescription, setJobDescription, updateAnalysisWithJobMatch } = useResumeContext();
  const [inputValue, setInputValue] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setJobDescription(inputValue);
      updateAnalysisWithJobMatch(inputValue);
      setIsExpanded(false);
    }
  };

  const handleClear = () => {
    setJobDescription('');
    setInputValue('');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Job Description</h2>
        {jobDescription && (
          <button 
            onClick={handleClear}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      
      {!jobDescription && !isExpanded ? (
        <div 
          className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition-all"
          onClick={() => setIsExpanded(true)}
        >
          <Briefcase className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-600 text-sm">
            Add a job description to see how well your resume matches
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <textarea
            value={jobDescription || inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Paste job description here to analyze keyword match..."
            className="w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all h-32 resize-none"
            disabled={!!jobDescription}
          />
          
          {!jobDescription && (
            <div className="flex justify-end space-x-2 mt-3">
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1.5 bg-blue-600 border border-blue-600 rounded-md text-sm text-white hover:bg-blue-700"
              >
                Analyze Match
              </button>
            </div>
          )}
          
          {jobDescription && (
            <button
              type="button"
              onClick={handleClear}
              className="mt-3 text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              Add a different job description
            </button>
          )}
        </form>
      )}
      
      {jobDescription && (
        <div className="mt-3">
          <p className="text-xs text-gray-500">
            Your resume is being analyzed against this job description to identify keyword matches and missing skills.
          </p>
        </div>
      )}
    </div>
  );
};

export default JobDescriptionInput;