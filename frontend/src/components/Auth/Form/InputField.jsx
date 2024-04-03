// components/InputField.jsx
import React from 'react';

const InputField = ({
  id,
  name,
  type,
  placeholderInside,
  placeholderOutside,
  autoComplete,
  value,
  onChange,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm leading-6 text-gray-600 ">
        {placeholderOutside}
      </label>
      <div className="mt-2">
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholderInside}
          autoComplete={autoComplete}
          required
          value={value}
          onChange={onChange}
          className="px-2 block w-full bg-blue-50 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
};

export default InputField;
