import React, { useState, useEffect } from "react";
import { updateStatus } from "../../../api/product";
import { baseUrl } from "../../../constant/baseUrl";
import convertToRupiah from "../../../utils/convertToRupiah";
import UpdateStock from "./updateStock";

function ProductItem({ product }) {
    console.log();
  const [status, setStatus] = useState(product.status);
  // useEffect(() => {
  //     const changeStatus = () => {
  //         const token = localStorage.getItem('token');
  //         const response = updateStatus(product.id, status, token);
  //         console.log(response)
  //     }

  //     changeStatus();
  // }, [status]);

  const changeStatus = async (value) => {
      console.log(value);
      if (value == 1) {
      setStatus(2);
      } else {
          setStatus(1)
      }
      const token = localStorage.getItem("token");
      const bearerToken = `Bearer ${token}`;
      const data = {
          status : parseInt(status  == 1 ?  2 : 1)
      }
      const response = await updateStatus(product.id, data, bearerToken);
      
      console.log(response)
  };
  return (
    <div className="flex flex-row w-full py-10 border-b border-gray-200">
      <div className="w-1/3 flex flex-row items-start">
        <img
          src={`${baseUrl}/storage/images/product/${product?.images[0]?.imageName}`}
          alt={`Gambar ${product?.name}`}
          className="object-cover w-16 h-16 rounded-md item"
        />
        <div className="flex flex-col">
          <span className="ml-2 font-bold text-gray-800 text-md mb-1">
            {product.name}
          </span>

          <span className="ml-2  text-gray-800 text-sm">SKU : { product?.sku ?  product?.sku : "_"}</span>
        </div>
      </div>
      <div className="w-1/5">
        <span className=" ">{convertToRupiah(product?.price)}</span>
      </div>
      <div className="w-1/5">
        <span className=" ">{product?.stock}</span>
      </div>

      <div className="w-1/5">
        {product.status === 0 ? (
          <span className="">Sedang direview</span>
        ) : product.status === 3 ? <span>Ditolak</span> : status === 1 ? (
          <span className="text-gray-700 text-md font-bold ">
            <label class="switch">
              <input
                type="checkbox"
                value={1}
                
                onChange={(e) => changeStatus(e.target.value)}
              />
              <span class="slider-2 round "></span>
            </label>
          </span>
        ) :  (
          <span className="text-gray-700 text-md font-bold ">
            <label class="switch">
              <input
                type="checkbox"
                value={2}
                checked
                onChange={(e) => changeStatus(e.target.value)}
              />
              <span class="slider-2 round "></span>
            </label>
          </span>
        )}
      </div>
      <div className=" flex flex-row items-start ">
        <UpdateStock id={product.id} stock={product.stock}/>
      </div>
    </div>
  );
}

export default ProductItem;
