import React from 'react'

function TextInput({name,placeholder,value,onChange}) {
  return (
    <input
      className="focus::transition-all transition ease-in-out delay-150  border focus:border-2  focus:outline-none border-gray-400 w-full py-2 rounded-md px-2 focus:border-blue-100"
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={() => onChange}
    />
  );
}

export default TextInput