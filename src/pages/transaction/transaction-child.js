import React, { useState } from "react";
import NumberFormat from "react-number-format";
import { toast } from "react-toastify";
import { sendResi } from "../../api/transaction";
import { baseUrl } from "./../../constant/baseUrl";
import TransactionItemDetail from "./transaction-detail";
function TransactionCard({ data }) {
  const [loading, setLoading] = useState(false);
  const [waybill, setWayBill] = useState("");
  const [updateResi, setUpdateResi] = useState(false);

  const onSend = async () => {
    setLoading(true);

    const token = localStorage.getItem("token");
    const bearerToken = `Bearer ${token}`;
    const responseData = {
      waybill: waybill,
      courier: data?.logistic_code,
      transaction_id: data.id,
    };

    console.log(responseData)
    const response = await sendResi(responseData, bearerToken);

    if (response.error === true) {
      toast.error(response.message);
    } else {
      toast.success("Berhasil ,pesanan sedang dikirim");
    }

    setLoading(false);
  };

  return (
    <div className="bg-white w-full flex shadow-md  flex-col mb-5">
      <div className="flex flex-row border-b border-gray-200  py-2 px-2 ">
        <div>
          <span>{data.invoice}</span>
        </div>
        <div className="ml-2">
          <span>Pembeli {data.buyers?.name}</span>
        </div>
      </div>
      <div className="mt-2 grid grid-cols-10  gap-2 ">
        <div className="flex justify-end  py-3 px-1">
          <img
            className="object-cover  rounded-sm item"
            style={{ width: 70, height: 70 }}
            alt="product-image"
            src={`${baseUrl}/storage/images/product/${data?.transaction_item[0].product.images[0].imageName}`}
          />
        </div>
        <div className="flex flex-col col-span-4 ml-4 border-r border-gray-400  py-3 px-1">
          <span>{data?.transaction_item[0]?.product?.name}</span>
          <span className="text-sm text-gray-400 mt-1">
            {data?.transaction_item[0].quantity} x{" "}
            <NumberFormat
              value={data?.transaction_item[0].product.price}
              prefix="Rp "
              displayType={"text"}
              thousandSeparator={true}
            />
          </span>
          {data?.transaction_item.length > 1 ? (
            <TransactionItemDetail data={data} />
          ) : (
            ""
          )}
        </div>

        <div className="flex flex-col col-span-3  border-r border-gray-400  py-3 px-1">
          <div>
            <span>Alamat</span>
            <div className="flex flex-col">
              <span className="text-sm text-gray-400">
                {data?.buyers_complate_address}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col col-span-2">
          <div>
            <span className="text-gray-700 font-semibold">Kurir</span>
            <div>
              <span className="text-sm text-gray-400">
                {data?.logistic_type}-{data?.logistic_code?.toUpperCase()}
              </span>
            </div>
          </div>
          {data.status !== 1 && (
            <div className="flex flex-col">
              <span className="text-gray-700 font-semibold">Masukan resi</span>
              {data.resi && (
                <div className="flex flex-col">
                  <span>{data.resi}</span>
                  {!updateResi && (
                    <span onClick={() => setUpdateResi(true)}>Update resi</span>
                  )}
                </div>
              )}
              {updateResi === true && (
                <input
                  placeholder="Masukan resi"
                  name={"waybill"}
                  value={waybill}
                  onChange={(e) => setWayBill(e.target.value)}
                  className="border border-gray-200"
                />
              )}
              {data.resi == null && (
                <input
                  placeholder="Masukan resi"
                  name={"waybill"}
                  value={waybill}
                  onChange={(e) => setWayBill(e.target.value)}
                  className="border border-gray-200"
                />
              )}
            </div>
          )}
        </div>
      </div>
      <div className="px-2 py-2">
        <div className="bg-gray-200 w-full py-2 px-2 flex flex-row justify-between">
          <span>Total Bayar</span>
          <span>
            <NumberFormat
              value={data.amount + data.shipping_amount}
              prefix="Rp "
              displayType={"text"}
              thousandSeparator={true}
            />
          </span>
        </div>
        {data.status !== 1 && (
          <div className="flex justify-end mt-5">
            {waybill.length > 5 ? (
              loading ? (
                <button
                  className="py-2 px-4 text-white  opacity-40 rounded-md "
                  style={{ backgroundColor: "#4D17E2" }}
                >
                  Validasi .....
                </button>
              ) : (
                <button
                  className="py-2 px-4 text-white rounded-md hover:opacity-80"
                  style={{ backgroundColor: "#4D17E2" }}
                  onClick={onSend}
                >
                  Kirim Pesanan
                </button>
              )
            ) : (
              <button
                className="py-2 px-4 text-white rounded-md  opacity-20"
                style={{ backgroundColor: "#4D17E2" }}
                disabled
              >
                Kirim Pesanan
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default TransactionCard;
