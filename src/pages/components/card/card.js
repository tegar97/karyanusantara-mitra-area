import React from 'react'

function Card({title,value}) {
  return (
    <div className="bg-white rounded-xl py-5 px-5 flex flex-col shadow-md">
      <span className="text-xl text-gray-800">{title}</span>
      <span className="text-4xl font-semibold" style={{ color: "#0C145A" }}>
        {" "}
        {value}
      </span>
      
    </div>
  );
}

export default Card;