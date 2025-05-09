import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface SectionFeedbackProps {
  section: string;
  score: number;
  feedback: string[];
}

const SectionFeedback: React.FC<SectionFeedbackProps> = ({ section, score, feedback }) => {
  const [isOpen, setIsOpen] = useState(false);

  const formatSectionName = (name: string) => {
    return name.split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-800';
    if (score >= 60) return 'bg-blue-100 text-blue-800';
    if (score >= 40) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <div 
        className="flex items-center justify-between p-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <h4 className="font-medium text-gray-800 mr-3">{formatSectionName(section)}</h4>
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${getScoreColor(score)}`}>
            {score}/100
          </span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </div>
      
      {isOpen && (
        <div className="p-4 bg-white border-t">
          {feedback.length > 0 ? (
            <ul className="space-y-2">
              {feedback.map((item, index) => (
                <li key={index} className="text-sm text-gray-700">• {item}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-600">No specific feedback for this section.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SectionFeedback;