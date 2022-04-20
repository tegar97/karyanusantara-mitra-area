import { data } from "autoprefixer";
import React, { useState ,useEffect} from "react";
import { addMyCourier } from "../../../api/courier";
import { baseUrl } from '../../../constant/baseUrl';

function CourierCard({ data ,index,isActive}) {
    const [getActiveCourier, setGetActiveCourier] = useState("");
  const [updateCourier, setUpdateCourier] = useState();
  

    const courierUpdate = async (value) => {
        const token = localStorage.getItem('token');
        const data = {
            courier_id: value,
            status : 1,
        };

     
        const response = await addMyCourier(data, `Bearer ${token}`);

        console.log(response)
  }

  console.log(data);

  if (data)
    return (
      <div className="flex flex-col border border-gray-200 shadow-md rounded-lg py-3 px-5 text-center">
        <div className="flex flex-col items-start">
          <div>
            {isActive === true ? (
              <input
                type="checkbox"
                value={1}
                checked
                onChange={(e) => courierUpdate(e.target.value)}
              />
            ) : (
              <input
                type="checkbox"
                value={0}
                onChange={(e) => courierUpdate(data.id)}
              />
            )}
          </div>
          <div className="ml-5">
            <img
              src={`${baseUrl}/storage/images/couriers/${data.image}`}
              alt={`logo ${data.name}`}
              className="w-40 h-30 object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <span>{data.name}</span>
        </div>
      </div>
    );
  else {
       return <div className="flex flex-col border border-gray-200 shadow-md rounded-lg py-3 px-5 text-center">
           <span>tess</span>
       </div>; 
    }
}

export default CourierCard