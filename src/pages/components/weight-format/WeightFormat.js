import React from 'react'

function WeightFormat({ setWeightFormat ,weightFormat}) {

  return (
    <select
      className="focus::transition-all transition ease-in-out delay-150  border focus:border-2  focus:outline-none border-gray-300 w-full py-2 rounded-md px-2 focus:border-blue-100"
      aria-label="Default select example"
      value={weightFormat}
      required
      onChange={(e) => setWeightFormat(e.target.value)}
    >
      <option value="gram">Gram (g)</option>
      <option value="kg">Kilogram (kg)</option>
    </select>
  );
}

export default WeightFormat