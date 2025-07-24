import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

const API_URL = 'http://localhost:8000';

const Analyzer = () => {
    const navigate = useNavigate(); 
    const [resumeFile, setResumeFile] = useState(null);
    const [jobDescription, setJobDescription] = useState('');
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');

    const handleAnalyze = async () => {
        if (!resumeFile || !jobDescription) {
            setError('Please upload resume and enter job description.');
            return;
        }

        setError('');
        setLoading(true);

        const formData = new FormData();
        formData.append('resume', resumeFile);
        formData.append('job_description', jobDescription);

        try {
            const res = await fetch(`${API_URL}/analyze`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.detail || 'Analysis failed');
            setAnalysis(data);
        } catch (err) {
            setError(err.message || 'Server error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-white to-yellow-50 p-4 flex flex-col items-center">
            {/* Header */}
            <div className="w-full max-w-5xl flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-purple-700 flex items-center gap-2">
                    <i className="fas fa-brain"></i>AI Resume Analyzer
                </h1>
                <div className="flex items-center gap-4">
                    {/* About button */}
                    <button
                        onClick={() => navigate('/about')}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-md shadow"
                    >
                        <i className="fas fa-info-circle mr-2"></i> About
                    </button>

                    {/* Logout button */}
                    <button
                        onClick={() => {
                            localStorage.removeItem('token');
                            window.location.href = '/login';
                        }}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow"
                    >
                        <i className="fas fa-sign-out-alt mr-2"></i> Logout
                    </button>
                </div>
            </div>
            <div className="w-full max-w-5xl bg-white rounded-xl shadow-md border border-gray-200 p-6 space-y-6">
                <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-2">
                        Upload Resume (PDF)
                    </label>
                    <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => setResumeFile(e.target.files[0])}
                        className="w-full border border-gray-300 rounded-md px-4 py-2"
                    />
                </div>

                <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-2">
                        Job Description
                    </label>
                    <textarea
                        rows="6"
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-4 py-3 resize-y"
                    />
                </div>

                {error && (
                    <div className="bg-red-100 text-red-700 border border-red-400 rounded-md px-4 py-2 text-center font-medium">
                        {error}
                    </div>
                )}

                <button
                    onClick={handleAnalyze}
                    disabled={loading}
                    className={`w-full py-3 text-lg font-semibold text-white rounded-md transition ${loading
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-purple-700 to-emerald-500 hover:scale-[1.01] hover:shadow-md'
                        }`}
                >
                    <i className="fas fa-magnifying-glass mr-2"></i>
                    {loading ? 'Analyzing...' : 'Analyze Resume'}
                </button>
            </div>

            {/* Results */}
            {analysis && (
                <div className="mt-10 w-full max-w-5xl bg-white p-6 rounded-xl shadow-md border border-gray-200">
                    <h2 className="text-2xl font-bold text-purple-700 mb-4">
                        <i className="fas fa-chart-line mr-2"></i> Results
                    </h2>
                    <p className="mb-2 text-lg">
                        <strong>Score:</strong> {analysis.score}/100
                    </p>
                    <p className="mb-6 text-lg">
                        <strong>Match %:</strong> {analysis.match_percentage.toFixed(2)}%
                    </p>

                    {/* Matched Items */}
                    {analysis.matched_items.length > 0 ? (
                        <>
                            <h3 className="text-lg font-semibold text-gray-700 mb-2">
                                <i className="fas fa-check-circle text-green-600 mr-2"></i>
                                Matched Items
                            </h3>
                            <ul className="space-y-4 list-disc pl-6">
                                {analysis.matched_items.map(([resumeLine, jdLine, score], index) => (
                                    <li key={index}>
                                        <p><strong className="text-purple-600">Resume:</strong> {resumeLine}</p>
                                        <p><strong className="text-emerald-600">JD:</strong> {jdLine}</p>
                                        <p><strong>Score:</strong> {score}</p>
                                    </li>
                                ))}
                            </ul>
                        </>
                    ) : (
                        <p className="text-gray-600">No matched items found.</p>
                    )}

                    {/* Grammar Feedback */}
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold text-blue-600 mb-2">
                            <i className="fas fa-spell-check mr-2"></i> Grammar Feedback
                        </h3>
                        <p className="text-gray-700">{analysis.grammar_feedback}</p>
                    </div>

                    {/* Suggestions */}
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold text-yellow-600 mb-2">
                            <i className="fas fa-lightbulb mr-2"></i> Suggestions
                        </h3>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                            {analysis.suggestions.map((s, i) => (
                                <li key={i}>{s}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Analyzer;
