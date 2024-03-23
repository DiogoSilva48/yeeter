// components/LoginForm.jsx
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignupModal from './SignupModal';

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
        // Handle unsuccessful login (e.g., display error message)
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
    <div className="flex min-h-screen justify-center items-center bg-gradient-to-r from-blue-300 to-blue-400">
      <div className="bg-white drop-shadow-md rounded-xl flex min-h-full flex-1 justify-center max-w-[1000px]">
        <div className="flex-1 rounded-l-xl bg-blue-300 opacity-80 p-8 flex flex-col justify-center items-center">
          <img
            draggable="false"
            src="/images/people-yeeter.png"
            alt="People"
            className="custom-login-image mb-6 drop-shadow-xl"
          />
          <p className="flex text-lg justify-center text-gray-900 drop-shadow-xl font-semibold mb-3">
            Welcome to Yeeter!
          </p>
          <p className="flex text-gray-800 text-base text-pretty text-center drop-shadow-xl">
            Your personalized social hub where you effortlessly follow your
            interests, join engaging conversations, and stay updated on what's
            trending worldwide
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
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm leading-6 text-gray-600 "
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Enter your username"
                    autoComplete="username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="px-2 block w-full bg-blue-50 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm leading-6 text-gray-600"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="px-2 block w-full bg-blue-50 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="text-right text-sm mt-2 ">
                  <a
                    href="#"
                    className="text-blue-500 font-semibold hover:text-blue-400"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>

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
              <a
                href="#"
                className="font-semibold leading-6 text-blue-500 hover:text-blue-400"
                onClick={handleSignupClick}
              >
                Sign up
              </a>
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
