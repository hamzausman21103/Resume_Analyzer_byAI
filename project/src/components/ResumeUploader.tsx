import React, { useState, useRef } from 'react';
import { Upload, File, Loader2, Check, X } from 'lucide-react';
import { useResumeContext } from '../context/ResumeContext';
import { analyzeResume } from '../utils/resumeAnalyzer';

const ResumeUploader: React.FC = () => {
  const { setAnalysisData, setIsAnalyzing } = useResumeContext();
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const validateFile = (file: File): boolean => {
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    if (!validTypes.includes(file.type)) {
      setErrorMessage('Invalid file type. Please upload a PDF, DOC, DOCX, or TXT file.');
      return false;
    }
    if (file.size > 5 * 1024 * 1024) {  // 5MB limit
      setErrorMessage('File too large. Maximum file size is 5MB.');
      return false;
    }
    return true;
  };

  const processFile = async (file: File) => {
    if (!validateFile(file)) {
      setUploadStatus('error');
      return;
    }

    setFile(file);
    setUploadStatus('uploading');
    setIsAnalyzing(true);
    
    try {
      // In a real app, we would upload the file to a server here
      // For now, we'll simulate the analysis with a timeout
      setTimeout(async () => {
        const results = await analyzeResume(file);
        setAnalysisData(results);
        setUploadStatus('success');
        setIsAnalyzing(false);
      }, 2000);
    } catch (error) {
      console.error('Error processing file:', error);
      setUploadStatus('error');
      setErrorMessage('Failed to process the file. Please try again.');
      setIsAnalyzing(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleReset = () => {
    setFile(null);
    setUploadStatus('idle');
    setErrorMessage('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Upload Resume</h2>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".pdf,.doc,.docx,.txt"
      />
      
      {uploadStatus === 'idle' && (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-200 ${
            isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:bg-gray-50'
          }`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleUploadClick}
        >
          <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 mb-1">Drag and drop your resume here</p>
          <p className="text-gray-500 text-sm">or click to browse files</p>
          <p className="text-gray-400 text-xs mt-3">Supports PDF, DOC, DOCX, TXT (Max 5MB)</p>
        </div>
      )}
      
      {uploadStatus === 'uploading' && (
        <div className="border rounded-lg p-6 text-center bg-gray-50">
          <Loader2 className="w-10 h-10 text-blue-500 mx-auto mb-3 animate-spin" />
          <p className="text-gray-700">Analyzing your resume...</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
            <div className="bg-blue-600 h-2.5 rounded-full animate-pulse w-3/4"></div>
          </div>
        </div>
      )}
      
      {uploadStatus === 'success' && file && (
        <div className="border rounded-lg p-4 bg-green-50 border-green-200">
          <div className="flex items-center">
            <div className="bg-green-100 p-2 rounded-full mr-3">
              <Check className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-green-800 font-medium">Resume uploaded successfully</p>
              <p className="text-green-700 text-sm">{file.name}</p>
            </div>
            <button 
              onClick={handleReset}
              className="p-1 rounded-full hover:bg-green-200 transition-colors"
            >
              <X className="w-5 h-5 text-green-700" />
            </button>
          </div>
        </div>
      )}
      
      {uploadStatus === 'error' && (
        <div className="border rounded-lg p-4 bg-red-50 border-red-200">
          <div className="flex items-center">
            <div className="bg-red-100 p-2 rounded-full mr-3">
              <X className="w-5 h-5 text-red-600" />
            </div>
            <div className="flex-1">
              <p className="text-red-800 font-medium">Upload failed</p>
              <p className="text-red-700 text-sm">{errorMessage}</p>
            </div>
            <button 
              onClick={handleReset}
              className="p-1 rounded-full hover:bg-red-200 transition-colors"
            >
              <X className="w-5 h-5 text-red-700" />
            </button>
          </div>
        </div>
      )}
      
      {file && uploadStatus !== 'idle' && (
        <button
          onClick={handleReset}
          className="mt-4 w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Upload different resume
        </button>
      )}
    </div>
  );
};

export default ResumeUploader;