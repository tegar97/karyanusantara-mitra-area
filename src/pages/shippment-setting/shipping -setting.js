import React, { useEffect, useState } from "react";
import { addMyCourier, getCourier, getMyCourier } from "../../api/courier";
import { baseUrl } from "../../constant/baseUrl";
import CourierCard from "../components/courier-card/courier-card";

function ShippingSetting() {
  const [allCourier, setAllCourier] = useState();
  const [myCourier, setMyCourier] = useState();
       const [status, setStatus] = useState();

  useEffect(() => {
      const loadCourier = async () => {
          const token = localStorage.getItem('token');
        const response = await getCourier();
        const response2 = await getMyCourier(`Bearer ${token}`);

        if (response.error === false) {
          const tempCourier = [];
          // const filter = response2.data.map(myCourier => {
          //     return response.data.filter((courier) => {
          //       return courier.id !== myCourier.courier_id;
          //     });

          // })
          const filter = response2?.data.reduce((acc, curr) => {
            (acc[curr.courier_id] =
              acc[curr.courier_id] || []).push(curr);
            
            return acc
          }, {});
            setMyCourier(filter);
     

        // setAllCourier(response.data);
        }
        if (response.error === false) {
          setAllCourier(response.data);
        }

        console.log(myCourier)
      };
      
    loadCourier();
  }, []);

  const addCourier = async (status,id) => {
    const token = localStorage.getItem("token");
          const data = {
            courier_id: id,
            status: parseInt(status),
    };
    
    const response = addMyCourier(data, `Bearer ${token}`);
    
    console.log(response)
    if (status == 0) {
      setStatus(1);
    } else {
      status(0);
    }
  }
  console.log(status)
    

  return (
    <main className="flex-grow wrapper min-h-screen py-12 px-12 ml-5">
      <div className="mt-5">
        <h1 className="text-4xl font-bold " style={{ color: "#0C145A" }}>
          Setting kurir
        </h1>
        {allCourier?.map(data => {
          return (
            <div className="mt-5 w-full bg-white shadow-md py-10 px-6 flex justify-between items-center ">
              <div className="flex flex-col ">
                <img
                  className="mt-5"
                  width={150}
                  height={150}
                  src={`${baseUrl}/storage/images/couriers/${data?.image}`}
                  alt="courier jne"
                />
              </div>
              {myCourier[data?.id]?.map((myCourierData) => {
                return myCourierData.status == 1 || status == 1 ? (
                  <span className="text-gray-700 text-md font-bold ">
                    <label class="switch">
                      <input
                        type="checkbox"
                        checked
                        value={0}
                        onChange={(e) => addCourier(e.target.value, data?.id)}
                      />
                      <span class="slider-2 round "></span>
                    </label>
                  </span>
                ) : (
                  <span className="text-gray-700 text-md font-bold ">
                    <label class="switch">
                      <input
                        type="checkbox"
                        value={1}
                        onChange={(e) => addCourier(e.target.value, data?.id)}
                      />
                      <span class="slider-2 round "></span>
                    </label>
                  </span>
                );
              })}
              {myCourier[data?.id] === undefined && (
                <span className="text-gray-700 text-md font-bold ">
                  <label class="switch">
                    <input
                      type="checkbox"
                      value={1}
                      onChange={(e) => addCourier(e.target.value,data?.id)}
                    />
                    <span class="slider-2 round "></span>
                  </label>
                </span>
              )}
            </div>
          );
        })}
        
      </div>
    </main>
  );
}

export default ShippingSetting;
