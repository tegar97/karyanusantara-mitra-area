import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Sidebar } from "./sidebar.styled";

function SideBar() {
  const [expanded, setExpanded] = useState(false);
  return (
    <Sidebar className="shadow-sm cursor-pointer">
      <ul className="flex flex-col mt-5 ">
        <li className="flex flex-row  items-center mb-5 py-2 px-2 border-l-4  border-blue-100 -600 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-blue-100"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          <span className="ml-2 text-md text-blue-100">Home</span>
        </li>

        <li className="relative  items-center mb-5 py-2 px-2 border-l-4  border-white -600 ">
          <div
            className="flex flex-row justify-between items-center "
            onClick={() => setExpanded(!expanded)}
          >
            <div className="flex flex-row">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                />
              </svg>
              <span className="ml-2 text-md text-gray-600">Produk</span>
            </div>
            {!expanded ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 15l7-7 7 7"
                />
              </svg>
            )}
          </div>

          {expanded && (
            <ul className=" ml-8   transition  ">
              <li className="mb-1 mt-2">
                <span className="text-sm text-gray-500 ">Produk Saya</span>
              </li>
              <Link to="/add-product">
                <li className="mb-1">
                  <span className="text-sm text-gray-500">
                    Tambahkan produk
                  </span>
                </li>
              </Link>
            </ul>
          )}
        </li>
      </ul>
    </Sidebar>
  );
}

export default SideBar;
