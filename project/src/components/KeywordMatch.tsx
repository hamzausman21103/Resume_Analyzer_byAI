import React from 'react';

interface KeywordMatchProps {
  percentage: number;
  matched: string[];
  missing: string[];
}

const KeywordMatch: React.FC<KeywordMatchProps> = ({ percentage, matched, missing }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-600">Match Rate</span>
        <span className="text-sm font-medium text-gray-800">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div 
          className="h-2 rounded-full transition-all duration-500 ease-out"
          style={{ 
            width: `${percentage}%`, 
            backgroundColor: percentage >= 70 ? '#10B981' : percentage >= 40 ? '#F59E0B' : '#EF4444'
          }}
        ></div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-xs font-medium text-green-600 mb-1">Matched Keywords</p>
          <div className="space-y-1">
            {matched.length > 0 ? (
              matched.slice(0, 3).map((keyword, index) => (
                <div key={index} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full inline-block mr-1 mb-1">
                  {keyword}
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-500">No matches found</p>
            )}
            {matched.length > 3 && (
              <p className="text-xs text-gray-500">+{matched.length - 3} more</p>
            )}
          </div>
        </div>
        
        <div>
          <p className="text-xs font-medium text-red-600 mb-1">Missing Keywords</p>
          <div className="space-y-1">
            {missing.length > 0 ? (
              missing.slice(0, 3).map((keyword, index) => (
                <div key={index} className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full inline-block mr-1 mb-1">
                  {keyword}
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-500">No missing keywords</p>
            )}
            {missing.length > 3 && (
              <p className="text-xs text-gray-500">+{missing.length - 3} more</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeywordMatch;