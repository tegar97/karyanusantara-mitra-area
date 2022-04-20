import React, { FormEvent, useEffect, useState } from "react";
import Modal from "react-modal";
import NumberFormat from "react-number-format";
import { baseUrl } from "../../constant/baseUrl";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: "40%",
    height: "90%",
    maxWidth: 800,
    maxHeight: 900,
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "1px solid #ffff",
    padding: 0,
  },
  overlay: {
    background: "rgba(0, 0, 0, 0.6)",
    zIndex: 1000000000000,
  },
};

const TransactionItemDetail = ({ data }) => {
  let subtitle;

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    if (modalIsOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [modalIsOpen]);

  function closeModal() {
    setIsOpen(false);
  }

  Modal.setAppElement("#root");

  return (
    <div>
      <span
        onClick={openModal}
        className="text-sm text-gray-400 cursor-pointer"
      >
        Lihat {data?.transaction_item.length - 1} barang lainya
      </span>

      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        onRequestClose={closeModal}
        contentLabel="Quantity Modal"
      >
        <div className="relative w-full  h-full p-0">
          <div className=" py-5 px-5 flex justify-between">
            <span>Detail Produk </span>
          </div>
          {data.transaction_item.map((data) => {
            return (
              <div className="flex flex-col py-5 px-5 mb-5">
                <div className="flex-row flex justify-between  ">
                  <div className="flex flex-row">
                    <div>
                      <img
                        className="object-cover  rounded-md item"
                        style={{ width: 70, height: 70 }}
                        alt="product-image"
                        src={`${baseUrl}/storage/images/product/${data.product.images[0].imageName}`}
                      />
                    </div>
                    <div className="ml-5 flex flex-col max-w-xs">
                      <span className="font-semibold text-gray-800">
                        {data.product.name}
                      </span>
                      <span className="text-sm text-gray-400">
                        {data.quantity} x{" "}
                        <NumberFormat
                          value={data.product.price}
                          prefix="Rp "
                          displayType={"text"}
                          thousandSeparator={true}
                        />{" "}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-400">Total harga</span>
                    <span className="font-semibold text-gray-800">
                      <NumberFormat
                        value={data.amount}
                        prefix="Rp "
                        displayType={"text"}
                        thousandSeparator={true}
                      />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="flex flex-col  items-end w-full py-5 px-5">
            <span className="text-gray-400">Ongkos kirim</span>
            <span className="font-semibold text-gray-800">
              {
                <NumberFormat
                  value={data.shipping_amount}
                  prefix="Rp "
                  displayType={"text"}
                  thousandSeparator={true}
                />
              }
            </span>
          </div>
          <div className="flex flex-col  items-end w-full py-5 px-5">
            <span className="text-gray-400">Total</span>
            <span className="font-semibold text-gray-800">
              {
                <NumberFormat
                  value={data.amount + data.shipping_amount}
                  prefix="Rp "
                  displayType={"text"}
                  thousandSeparator={true}
                />
              }
            </span>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TransactionItemDetail;
