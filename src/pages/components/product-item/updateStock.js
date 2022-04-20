import React, { FormEvent, useEffect, useState } from "react";
import Modal from "react-modal";
import NumberFormat from "react-number-format";
import { toast } from "react-toastify";
import { updateStock } from "../../../api/product";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: "30%",
    height: "50%",
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

const UpdateStock = ({ id, stock }) => {
  let subtitle;

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [stockState, setStockState] = React.useState(stock);
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
    const updateStockSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const Bearer = `Bearer ${token}`
        
        const data = {
            id: id,
            stock: stockState
        }

        const response = await updateStock(data, Bearer);

        if (response.error === false) {
            toast.success('Success update stock');
            window.location.reload();

        }
  };
  Modal.setAppElement("#root");

  return (
    <div>
      <button
        className="ml-2 bg-green-600 px-1 py-1 text-white text-sm"
        onClick={openModal}
      >
        Update stock
      </button>

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
          <form onSubmit={updateStockSubmit}>
            <div className="mt-2  px-5">
              <input
                className="px-1 py-1 border border-gray-900 text-gray-900 w-full"
                placeholder="Stock"
                value={stockState}
                onChange={(e) => setStockState(e.target.value)}
              />
            </div>
            <div className="flex justify-end items-end px-5  mt-5">
              <button  type="submit" className="bg-green-600 text-white px-2 py-2">
                Update stock
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default UpdateStock;
