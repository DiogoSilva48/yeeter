// components/LoginForm.jsx
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignupModal from './SignupModal';
import InputField from './Form/InputField';
import ForgotPassword from './Form/ForgotPassword';
import loginTexts from '../../data/loginTexts.json';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const Router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies in the request
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Redirect to homepage or another page upon successful login
        Router.push('/');
      } else {
        // Handle unsuccessful login
        throw new Error('Invalid username or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Invalid username or password');
    }
  };

  const [showSignupModal, setShowSignupModal] = useState(false);

  const handleSignupClick = () => {
    setShowSignupModal(true);
  };

  const handleCloseModal = () => {
    setShowSignupModal(false);
  };

  return (
    <div className="flex min-h-screen justify-center items-center bg-gradient-to-r from-blue-300 to-blue-400 md:px-6">
      <div className="bg-white drop-shadow-md rounded-xl flex justify-center min-h-screen md:min-h-full flex-1 md:max-w-[1000px]">
        <div className="hidden md:flex-1 md:rounded-l-xl md:bg-blue-300 md:opacity-80 md:p-8 md:flex md:flex-col md:justify-center md:items-center">
          <img
            draggable="false"
            src="/images/people-yeeter.png"
            alt="People"
            className="custom-login-image mb-6 drop-shadow-xl"
          />
          <p className="flex text-lg justify-center text-gray-900 drop-shadow-xl font-semibold mb-3">
            {loginTexts.welcomeMessage}
          </p>
          <p className="flex text-gray-800 text-base text-pretty text-center drop-shadow-xl">
            {loginTexts.description}
          </p>
        </div>

        <div className="bg-blue-100 opacity-100 flex-1 flex flex-col justify-center py-20 lg:px-8 rounded-r-xl">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="flex justify-center items-center">
              <span className="text-black custom-yeeter-logo select-none">
                Y
              </span>
            </div>
            <p className="flex text-lg justify-center text-black drop-shadow-xl font-semibold mb-4">
              Sign in to your account
            </p>
          </div>

          <div className="px-4 mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Username Input */}
              <InputField
                id="username"
                name="username"
                type="text"
                placeholderInside="Enter your username"
                placeholderOutside="Username"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {/* Password Input */}
              <InputField
                id="password"
                name="password"
                type="password"
                placeholderInside="Enter your password"
                placeholderOutside="Password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <ForgotPassword />
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-darkGreyCustom px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-hoverDarkGreyCustom focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>

            <p className="mt-5 text-center text-sm text-gray-500">
              Don't have an account?{' '}
              <button
                href="#"
                className="font-semibold leading-6 text-blue-500 hover:text-blue-400"
                onClick={handleSignupClick}
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
      {/* Render the signup modal if showSignupModal is true */}
      {showSignupModal && <SignupModal onClose={handleCloseModal} />}
    </div>
  );
}
