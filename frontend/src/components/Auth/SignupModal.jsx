// components/SignupModal.jsx
'use client';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignupModal({ onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    dateOfBirth: '',
    country: '',
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Set showModal to true after a short delay to trigger the animation
    const timeoutId = setTimeout(() => {
      setShowModal(true);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.verifyPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.username.includes(' ')) {
      toast.error('Username cannot contain spaces');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.name,
          username: formData.username,
          email: formData.email,
          password: formData.password,
          dateOfBirth: formData.dateOfBirth,
          country: formData.country,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        onClose();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error registering user:', error);
      toast.error('An error occurred while registering');
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        showModal
          ? 'transition-opacity duration-300 opacity-100'
          : 'transition-opacity duration-300 opacity-0'
      }`}
    >
      <div
        className="fixed inset-0 bg-darkGreyCustom opacity-80"
        onClick={onClose} // Close the modal when background is clicked
      ></div>
      <div
        className={`bg-white rounded-xl overflow-hidden z-10 max-w-2xl w-full ${
          showModal
            ? 'transition-transform duration-300 scale-100'
            : 'transition-transform duration-300 scale-90'
        }`}
      >
        <div className="p-8 lg:px-8">
          <h2 className="mt-1 mb-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign up
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-2 items-center">
              <div className="flex flex-col">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="px-2 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="px-2 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="px-2 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="dateOfBirth"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                  min="1900-01-01" // Set the minimum date (e.g., January 1, 1900)
                  max={new Date().toISOString().split('T')[0]} // Set the maximum date to today
                  className="px-2 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="px-2 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="verifyPassword"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Verify Password
                </label>
                <input
                  type="password"
                  id="verifyPassword"
                  name="verifyPassword"
                  value={formData.verifyPassword}
                  onChange={handleChange}
                  required
                  className="px-2 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  className="px-2 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6 select-input"
                >
                  <option value="">Select a country</option>
                  <option value="PT">Portugal</option>
                  <option value="USA">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  {/* Add more options as needed */}
                </select>
              </div>
            </div>
            <div className="mt-7 flex justify-between gap-3 items-center">
              <button
                type="button"
                className="flex w-full items-center justify-center rounded-md bg-white ring-1 ring-inset ring-gray-300 text-gray-900 px-2 py-2 text-sm font-semibold leading-6 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-darkGreyCustom px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-hoverDarkGreyCustom focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
