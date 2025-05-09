// This is a client-side simulation of resume analysis
// In a real app, this would be done by a Python backend

import { AnalysisData } from '../types/resume';

// Mock function to simulate Python backend analysis
export const analyzeResume = async (file: File): Promise<AnalysisData> => {
  // In a real app, we would send the file to a Python backend
  // For now, we'll simulate the analysis with mock data
  
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Mock analysis results
  return {
    overallScore: Math.floor(Math.random() * 30) + 60, // Random score between 60-90
    keywordMatch: {
      percentage: Math.floor(Math.random() * 50) + 40, // Random match between 40-90%
      matched: ['Python', 'Data Analysis', 'Machine Learning', 'Communication'],
      missing: ['Docker', 'AWS', 'React'],
    },
    sectionScores: {
      summary: Math.floor(Math.random() * 30) + 60,
      experience: Math.floor(Math.random() * 20) + 70,
      education: Math.floor(Math.random() * 30) + 60,
      skills: Math.floor(Math.random() * 40) + 50,
    },
    suggestions: {
      summary: [
        'Add a more impactful opening statement that highlights your unique value proposition',
        'Quantify your achievements with specific metrics'
      ],
      experience: [
        'Include more action verbs to describe your responsibilities',
        'Add measurable achievements for each position'
      ],
      education: [
        'List relevant coursework that aligns with the target position',
      ],
      skills: [
        'Organize skills by category (technical, soft, domain-specific)',
        'Consider adding proficiency levels for technical skills'
      ],
    },
    strengths: [
      'Strong educational background',
      'Relevant work experience',
      'Clear project descriptions',
      'Good use of action verbs'
    ],
    improvements: [
      'Add more quantifiable achievements',
      'Enhance your LinkedIn profile and add the URL',
      'Include a projects section to showcase practical skills',
      'Tailor your resume more specifically to the job description'
    ],
  };
};

// Function to analyze keyword matches between resume and job description
export const analyzeKeywordMatch = (jobDescription: string) => {
  // In a real app, this would compare resume content to job description
  // Here we're just simulating the analysis
  
  // For demo purposes, extract some keywords from the job description
  const keywords = extractKeywords(jobDescription);
  
  // Simulate some matches and missing keywords
  const allPossibleKeywords = [
    'Python', 'JavaScript', 'React', 'Node.js', 'SQL', 'NoSQL', 
    'AWS', 'Docker', 'Kubernetes', 'Machine Learning', 'Data Analysis',
    'Communication', 'Leadership', 'Project Management', 'Agile',
    'CI/CD', 'Testing', 'Git', 'REST API', 'TypeScript'
  ];
  
  // Choose random keywords from the job description as "matched"
  const matched = keywords.filter(() => Math.random() > 0.4);
  
  // Choose random keywords not in "matched" as "missing"
  const missing = allPossibleKeywords
    .filter(kw => !matched.includes(kw))
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.floor(Math.random() * 5) + 1);
  
  // Calculate match percentage
  const percentage = Math.min(
    100, 
    Math.floor((matched.length / (matched.length + missing.length)) * 100)
  );
  
  return {
    percentage,
    matched,
    missing
  };
};

// Extract keywords from job description
const extractKeywords = (text: string): string[] => {
  // In a real app, this would use NLP techniques
  // Here we're using a simple approach for simulation
  
  // List of common tech keywords to look for
  const commonKeywords = [
    'Python', 'JavaScript', 'React', 'Node.js', 'SQL', 'NoSQL', 
    'AWS', 'Docker', 'Kubernetes', 'Machine Learning', 'Data Analysis',
    'Communication', 'Leadership', 'Project Management', 'Agile',
    'CI/CD', 'Testing', 'Git', 'REST API', 'TypeScript'
  ];
  
  // Filter keywords that appear in the text
  const foundKeywords = commonKeywords.filter(keyword => 
    text.toLowerCase().includes(keyword.toLowerCase())
  );
  
  // Add some random ones to simulate more varied results
  const randomKeywords = commonKeywords
    .filter(kw => !foundKeywords.includes(kw))
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);
  
  return [...foundKeywords, ...randomKeywords];
};

// In a real application, we would implement Python NLP backend functions like:
// - Resume parsing (extracting sections and content)
// - Named entity recognition
// - Keyword extraction
// - Sentence structure analysis
// - Grammar and spelling checks
// - Comparison against job descriptions
// - ATS simulation to check compatibility