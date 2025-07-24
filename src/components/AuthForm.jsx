import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:8000';

const AuthForm = ({ mode, setToken }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleAuth = async () => {
    const endpoint = mode === 'signup' ? '/signup' : '/login';
    const payload = mode === 'signup'
      ? { username, email, password }
      : { username, password };

    try {
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        if (mode === 'login') {
          localStorage.setItem('token', data.access_token);
          setToken(data.access_token);
        }
        navigate('/analyze');
      } else {
        setError(data.detail || 'Authentication failed');
      }
    } catch {
      setError('Server error');
    }
  };

  return (
    <div className="w-full h-screen flex flex-col md:flex-row">
      {/* Left image section (hidden on small screens) */}
      <div className="hidden md:block md:w-1/2 h-full">
        <img
          src="/image/6322078.jpg"
          alt="Login Illustration"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right form section */}
      <div className="w-full md:w-1/2 h-full px-8 py-12 bg-gradient-to-b from-white to-yellow-50 flex flex-col justify-center">
        <h1 className="text-4xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-emerald-500">
          {mode === 'signup' ? 'Create Account' : 'Welcome Back'}
        </h1>

        {mode === 'signup' && (
          <div className="relative mb-6">
            <i className="fas fa-envelope absolute left-4 top-3.5 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all shadow-sm"
            />
          </div>
        )}

        <div className="relative mb-6">
          <i className="fas fa-user absolute left-4 top-3.5 text-gray-400" />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all shadow-sm"
          />
        </div>

        <div className="relative mb-8">
          <i className="fas fa-lock absolute left-4 top-3.5 text-gray-400" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all shadow-sm"
          />
        </div>

        <button
          className="w-full py-3 rounded-md bg-gradient-to-r from-purple-700 to-emerald-500 text-white font-semibold text-lg shadow-md hover:shadow-lg hover:-translate-y-1 transition-transform duration-300"
          onClick={handleAuth}
        >
          {mode === 'signup' ? 'Sign Up' : 'Login'}
        </button>

        <p
          onClick={() => navigate(mode === 'signup' ? '/login' : '/signup')}
          className="mt-6 text-center text-emerald-600 hover:text-purple-700 cursor-pointer font-medium transition"
        >
          {mode === 'signup'
            ? 'Already have an account? Login'
            : "Don't have an account? Sign up"}
        </p>

        {error && (
          <div className="mt-6 bg-red-100 text-red-700 text-sm font-semibold py-2 px-4 rounded-md border border-red-300 text-center">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
