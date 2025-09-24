import React, { useState } from 'react';

export default function Auth({ setToken }) {
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState(''); // optional for signup
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password || (mode === 'signup' && !email)) {
      return alert('Please fill all required fields');
    }

    try {
      const res = await fetch(
        mode === 'login'
          ? 'http://localhost:5000/api/auth/login'
          : 'http://localhost:5000/api/auth/signup',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(
            mode === 'login'
              ? { username, password }
              : { username, email, password }
          ),
        }
      );

      const data = await res.json();

      if (res.ok) {
        if (mode === 'login') {
          setToken(data.token); // save JWT in state
        } else {
          alert('Signup successful! Please login.');
          setMode('login');
        }
      } else {
        alert(data.message || 'Operation failed');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black px-4">
      <div className="bg-gray-900 p-6 md:p-8 rounded-xl w-full max-w-sm shadow-lg">
        <h2 className="text-xl md:text-2xl font-semibold mb-6 text-center">
          {mode === 'login' ? 'Login' : 'Sign Up'}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {mode === 'signup' && (
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          )}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 py-2 rounded-md text-white font-semibold"
          >
            {mode === 'login' ? 'Log In' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          {mode === 'login' ? (
            <p>
              New here?{' '}
              <span
                onClick={() => setMode('signup')}
                className="text-red-500 cursor-pointer hover:underline"
              >
                Sign Up
              </span>
            </p>
          ) : (
            <p>
              Already a member?{' '}
              <span
                onClick={() => setMode('login')}
                className="text-red-500 cursor-pointer hover:underline"
              >
                Log In
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
