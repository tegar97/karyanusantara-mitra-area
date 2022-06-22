import React from "react";
import { useState, useEffect } from "react";
import { getMytTransaction } from "../../api/transaction";
import TransactionCard from "./transaction-child";
function Transaction() {
  const [transaction, setMyTransction] = useState();
  const [code, setCode] = useState(2);



      useEffect( () => {
        const token = localStorage.getItem("token");
        const bearer = `Bearer ${token}`

        console.log(token)
        const loadTransaction = async () => {
          const response = await getMytTransaction(bearer, code);
           if (response.error === false) {
             setMyTransction(response.data);
           }
        }
        loadTransaction()
       
      }, [code]);

  console.log(transaction);
  return (
    <main className="flex-grow wrapper min-h-screen py-12 px-12 ml-5">
      <div className="mt-5">
        <div className="flex justify-between  flex-row mb-30  items-center">
          <h1 className="text-4xl font-bold " style={{ color: "#0C145A" }}>
            Daftar Pesanan
          </h1>
        </div>
      </div>
      <div>
        <div className="bg-white w-full px-5 py-5 shadow-md rounded-lg">
          <ul className="flex flex-row ">
            <li
              className={`${
                code === 2
                  ? "border-b border-purple-900 font-semibold"
                  : "text-gray-600 cursor-pointer"
              } `}
              onClick={() => setCode(2)}
            >
              Pesanan Baru
            </li>
            <li
              className={`${
                code === 3
                  ? "border-b border-purple-900 font-semibold ml-5"
                  : "text-gray-600 cursor-pointer ml-5"
              } `}
              onClick={() => setCode(3)}
            >
              Telah dikirim
            </li>
            <li
              className={`${
                code === 1
                  ? "border-b border-purple-900 font-semibold ml-5"
                  : "text-gray-600 cursor-pointer ml-5"
              } `}
              onClick={() => setCode(1)}
            >
              Selesai
            </li>
          </ul>
        </div>
        <div className="bg-white w-full flex shadow-md  flex-col mb-5 mt-5 py-2 px-2">
          <span className="text-red-500 text-sm">
            Pastikan nomor resi yang di input benar,kami hanya bisa validasi
            resi kurir : pos, wahana, jnt, sap, sicepat, jet, dse, first, ninja,
            lion, idl, rex, ide, sentral, anteraja{" "}
          </span>
        </div>

        <div className="mt-5">
          {transaction?.map((data) => {
            return <TransactionCard data={data} />;
          })}
          {transaction?.length === 0 && code == 2 ? (
            <div className="flex items-center justify-center w-full">
              <h1>Belum ada pesanan baru untuk sekarang</h1>
            </div>
          ) : code == 3 ? (
            <div className="flex items-center">
              <h1>Belum ada pesanan yang sedang proses pengiriman</h1>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </main>
  );
}

export default Transaction;
