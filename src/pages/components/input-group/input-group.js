import React from 'react'

function InputGroup({
  label,
  name,
  setState,
  placeholder,
  value,
  type,
  isSelectInput,
  isDate,
  maxLength,
  children,
}) {
  console.log(value);
  return (
    <div className="mt-5 grid grid-cols-4 items-center  ">
      <div className="">
        <label htmlFor={name} className="text-md text-gray-600">
          {label}
        </label>
      </div>
      <div className="w-full col-span-3">
        {isDate ? (
          <input />
        ) : isSelectInput ? (
          <select
            className="focus::transition-all transition ease-in-out delay-150  border focus:border-2  focus:outline-none border-gray-300 w-full py-2 rounded-md px-2 focus:border-blue-100"
            aria-label="Default select example"
            value={value}
            name={name}
            onChange={setState}
          >
            {children}
          </select>
        ) : (
          <input
            name={name}
            required
            maxLength={maxLength}
            onChange={setState}
            value={value}
            type={type}
            placeholder={placeholder}
            className="focus::transition-all transition ease-in-out delay-150  border focus:border-2  focus:outline-none border-gray-300 w-full py-1 rounded-md px-2 focus:border-blue-100"
          />
        )}
      </div>
    </div>
  );
}

export default InputGroup