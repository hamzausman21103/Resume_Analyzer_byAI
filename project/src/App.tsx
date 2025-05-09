import React from 'react';
import { Upload, File, Loader2, Check, X, ArrowUpRight } from 'lucide-react';
import ResumeUploader from './components/ResumeUploader';
import AnalysisResults from './components/AnalysisResults';
import Header from './components/Header';
import Footer from './components/Footer';
import JobDescriptionInput from './components/JobDescriptionInput';
import { ResumeProvider } from './context/ResumeContext';

function App() {
  return (
    <ResumeProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 max-w-5xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">AI Resume Analyzer</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Upload your resume to get AI-powered insights, suggestions, and a comprehensive analysis to help you land your dream job.
            </p>
          </div>
          
          <div className="grid md:grid-cols-5 gap-6">
            <div className="md:col-span-2 space-y-6">
              <ResumeUploader />
              <JobDescriptionInput />
            </div>
            <div className="md:col-span-3">
              <AnalysisResults />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ResumeProvider>
  );
}

export default App;