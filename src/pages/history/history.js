import React, { useState, useEffect } from "react";
import NumberFormat from "react-number-format";
import { getTransactionHistory } from "../../api/transaction";

function History() {
    const [history, setHistory] = useState();
    const [transferLog, setTransferLog] = useState();

    useEffect(() => {
        const load = async () => {
            const token = localStorage.getItem("token");
            const Bearer = `Bearer ${token}`;
            const response = await getTransactionHistory(Bearer);
            if (response.error === false) {
                setHistory(response.data);
                if (history) {
                      setTransferLog(
                        JSON.parse(history[0]?.transfer_log?.cost_reduction)
                      );
                }
                
            }
          
        }
        load()
    }, []);
  return (
    <main className="flex-grow wrapper min-h-screen py-12 px-12 ml-5">
      <div className="mt-5">
        <h1 className="text-4xl font-bold mb-30" style={{ color: "#0C145A" }}>
          Riwayat penjualan
        </h1>
      </div>
      <div className="bg-white w-full rouned-md py-2 px-2 ">
        <table className="border border-gray-200">
          <tr className="w-full border-b border-gray-200">
            <th className="w-1/3 text-left border-r py-2 px-2">Invoice</th>
            <th className="w-1/3  text-left   border-r py-2 px-2">
              Total Pembayaran
            </th>
            <th className="w-1/3  text-left  border-r py-2 px-2">
              Transfer log
            </th>
            <th className="w-1/3  text-left  border-r py-2 px-2">Status</th>
                  </tr>
                  {
                      history?.map(data => {
                          return (
                            <tr className="w-full border-b border-gray-200">
                              <td className="w-1/3 text-left border-r py-2 px-2">
                                {data?.invoice}
                              </td>
                              <td className="w-1/3  text-left   border-r py-2 px-2">
                                <NumberFormat
                                  value={data?.amount}
                                  prefix="Rp "
                                  displayType={"text"}
                                  thousandSeparator={true}
                                />
                              </td>
                              <td className="w-1/3  text-left  border-r py-2 px-2">
                                Telah di transfer dengan rincian :
                                <ul>
                                  {/* {transferLog &&  Object?.entries(transferLog).map(
                                      (data,index) => {
                                           return  <li className="text-sm mb-1">
                                              {" "}
                                              {data[0]}
                                              <span className="font-bold">
                                                {data[1]}
                                              </span>
                                            </li>;
                                    }
                                  )} */}
                                  <li>
                                    {data.transfer_log.cost_reduction
                                      .replaceAll("{", "")
                                      .replaceAll("}", "")
                                      .replaceAll('"', "")}
                                  </li>
                                </ul>
                                <span className="mt-1">
                                  Total :{" "}
                                  <NumberFormat
                                    value={data?.transfer_log.total}
                                    prefix="Rp "
                                    displayType={"text"}
                                    thousandSeparator={true}
                                  />
                                </span>
                              </td>
                              <td className="w-1/3  text-left  border-r py-2 px-2 text-green-500">
                                Transfer
                              </td>
                            </tr>
                          );
                      })
                  }
         
         
        </table>
      </div>
    </main>
  );
}

export default History;
