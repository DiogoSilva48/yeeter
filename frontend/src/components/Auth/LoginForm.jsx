// components/LoginForm.jsx
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
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
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
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
    <div
      className="flex min-h-screen justify-center items-center"
      style={{
        background: 'linear-gradient(to bottom, #222831, #2c3341)',
        /* Optionally, you can add more CSS properties here */
      }}
    >
      <div className=" bg-white rounded-xl flex min-h-full flex-1 justify-center max-w-[900px]">
        <div
          className="flex-1 bg-cover bg-center rounded-xl rounded-r-none"
          style={{ backgroundImage: `url(/images/myguy.png)` }}
        ></div>

        <div className="flex-1 flex flex-col justify-center py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-20 w-auto"
              src="/images/logo-yeeter.svg"
            />
            <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your Yeeter account
            </h2>
          </div>

          <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="text-right text-sm mt-3">
                  <a
                    href="#"
                    className="font-semibold text-blue-500 hover:text-blue-400"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-darkGreyCustom px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-hoverDarkGreyCustom focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Don't have an account?{' '}
              <a
                href="#"
                className="font-semibold leading-6 text-blue-500 hover:text-blue-400"
                onClick={handleSignupClick}
              >
                Sign up
              </a>
            </p>

            {/* Render the signup modal if showSignupModal is true */}
            {showSignupModal && <SignupModal onClose={handleCloseModal} />}
          </div>
        </div>
      </div>
    </div>
  );
}
