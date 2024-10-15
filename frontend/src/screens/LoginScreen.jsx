import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const LoginScreen = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // You can add validation here and handle registration logic
    console.log({ fullName, email, password });
  };

  return (
    <div className="flex w-full items-center justify-center h-[80vh]">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full">
    
        <h2 className="text-2xl font-lora text-center mb-4 text-gray-700">Login to SwiftCart</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-semibold font-lora mb-2">Email Address *</label>
            <input
              type="email"
              id="email"
              className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
              required
              placeholder="hello@alignui.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-semibold font-lora mb-2">Password *</label>
            <input
              type="password"
              id="password"
              className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="text-gray-600 text-xs mt-1 font-poppins">Must contain 1 uppercase letter, 1 number, min. 8 characters.</p>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Login
          </button>
          <p className="text-gray-600 text-xs text-center font-poppins mt-4">
            Not yet registered?
            <Link to="/register" className="text-blue-500 hover:underline"> Register here</Link>.
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
