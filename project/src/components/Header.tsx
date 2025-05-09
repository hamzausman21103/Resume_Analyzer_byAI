import React from 'react';
import { FileText } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center max-w-5xl">
        <div className="flex items-center space-x-2">
          <FileText className="h-6 w-6 text-blue-600" />
          <span className="font-bold text-xl text-gray-800">ResumeAI</span>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a 
                href="#" 
                className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium"
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium"
              >
                How It Works
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className="text-blue-600 hover:text-blue-700 transition-colors text-sm font-medium"
              >
                Start Analysis
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;