// src/App.jsx
import React, { useState, useEffect } from 'react';
import Auth from './pages/Auth';
import ReportGenerator from './components/ReportGenerator';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-blue-100 text-white px-4 py-8">
      {!token ? (
        <Auth setToken={setToken} />
      ) : (
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl text-green-400 font-bold">Report Generator</h1>
            <button
              onClick={() => setToken('')}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md"
            >
              Logout
            </button>
          </div>
          <ReportGenerator token={token} />
        </div>
      )}
    </div>
  );
}

export default App;
