import React,{useState} from "react";
import { topBarContainer } from "./topbar.styled";
import {logout} from 'react-icons'
function TopBar() {
    const [showUserMenu, setShowUserMenu] = useState(false);
    console.log(showUserMenu)
  return (
    <div
      className="w-full sticky  top-0  px-5 z-10 bg-white  flex flex-row justify-between items-center border-gray-300 shadow-sm "
      style={{ height: 60 }}
    >
      <div className="flex flex-row items-center ">
        <div className="w-44 ">
          <a href="/">
            <img
              src={"https://www.karyanusantara.co.id/assets/logo-nav-min.png"}
              className="w-full h-16"
              alt="logo karyanusantara"
            />
          </a>
        </div>
        
      </div>
      <div
        className="relative "
        style={{ maxWidth: "330px" }}
        onMouseEnter={() => setShowUserMenu(true)}
        onMouseLeave={() => setShowUserMenu(false)}
      >
        {/* <div className="flex flex-row items-center account-info-box cursor-pointer hover:bg-gray-200 px-2 py-1 rounded-lg">
          <img
            style={{ width: 32, height: 32 }}
            className="account-info-avatar rounded-full  object-cover"
            alt="avatar user"
            src={`https://images.unsplash.com/photo-1643724884092-dc725c67235c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80`}
          />
          <span className="ml-2 text-sm text-gray-600">Tegar Akmal</span>
        </div>
        {showUserMenu && (
          <div
            onMouseEnter={() => setShowUserMenu(true)}
            onMouseLeave={() => setShowUserMenu(false)}
            className="bg-white  py-2  absolute  rounded-md w-full px-1 "
            style={{ top: "40px" }}
          >
            <ul className="">
              <li className="text-sm text-gray-700 mb-1 cursor-pointer hover:bg-gray-100 py-2 px-1 flex flex-row items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="ml-1">Bantuan </span>
              </li>

              <li className="text-sm text-gray-700 mb-1 cursor-pointer hover:bg-gray-100 py-1 px-1 flex flex-row items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                <span className="ml-1">Keluar</span>
              </li>
            </ul>
          </div>
        )} */}
      </div>
    </div>
  );
}

export default TopBar;
