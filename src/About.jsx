import React from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-white to-yellow-50 px-4 py-10">
      <div className="w-full max-w-4xl bg-white border border-gray-200 shadow-md rounded-xl p-8 space-y-6 animate-fadeInUp">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-emerald-500 flex items-center gap-2">
          <i className="fas fa-info-circle text-purple-700"></i>
          About Smart Resume Analyzer
        </h1>

        <p className="text-lg text-gray-700 leading-relaxed">
          <strong className="text-purple-700">Smart Resume Analyzer</strong> is an AI-powered tool that helps job seekers improve their resumes by matching them against job descriptions. It identifies relevant <strong className="text-emerald-600">skills</strong>, <strong className="text-emerald-600">projects</strong>, and <strong className="text-emerald-600">qualifications</strong> using advanced machine learning models like <strong className="text-purple-600">Sentence-BERT</strong>.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed">
          We use natural language understanding to compare your resume content with job requirements, providing suggestions and scoring to help you stand out.
        </p>

        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">🚀 Features:</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>⚙️ AI-based skill and project matching</li>
            <li>🧠 SBERT embeddings for semantic comparison</li>
            <li>📄 Resume grammar feedback with LanguageTool</li>
            <li>📊 Match score and percentage insights</li>
          </ul>
        </div>

        <p className="text-lg text-gray-700 leading-relaxed">
          Whether you're a student, a junior developer, or a seasoned professional, this tool provides targeted feedback to strengthen your job applications.
        </p>

        <div className="pt-4">
          <button
            onClick={() => navigate('/analyze')}
            className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-emerald-500 to-purple-600 text-white font-medium rounded-md shadow-md hover:shadow-lg transition-transform hover:-translate-y-1"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
