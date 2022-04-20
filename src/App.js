import { Routes, Route, useLocation, Navigate ,useRoutes} from "react-router-dom";
import Home from "./pages/home/home";
import SideBar from "./pages/components/sidebar/sidebar";
import TopBar from "./pages/components/topbar/topbar";
import AddProduct from "./pages/product/add-product";
import Login from "./pages/login/login";
import React,{useEffect} from 'react'
import auth from "./api/auth";
import { populateProfile } from "./store/actions/users";
import { useDispatch, useSelector } from "react-redux";
import MemberRoute from "./routes/MemberRoute";
import GuestRoute from "./routes/GuestRoute";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import routes from "./routers";
function App() {
  const route = useLocation()
    const dispatch = useDispatch();
  const usersToken = localStorage.getItem("token");

   useEffect(() => {
     let session = null;
     let getExpire;
     if (localStorage.getItem("token")) {
       session = localStorage.getItem("token");
       getExpire = localStorage.getItem("expire_in");
       const now = new Date();
       const loadUser = async () => {

         if (now > getExpire) {
           localStorage.clear('token')
           localStorage.clear("expire_in");
         }
            await auth
              .details(`Bearer ${session}`)
              .then((details) => {
                dispatch(populateProfile(details.data.data.data));
              })
              .catch((err) => {
                auth.refresh(session).then((res) => {
                  const newToken = res.data.data.access_token;
                  localStorage.setItem("token", newToken);
                     localStorage.setItem(
                       "expire_in",
                       now.getTime() + 86400000
                     );
                  auth.details(`Bearer ${newToken}`).then((details) => {
                    dispatch(populateProfile(details.data.data.data));
                  });
                });
              });
        }
     loadUser()
     }

   }, [dispatch]);
  
    const routing = useRoutes(routes(usersToken));
  return (
    <div className="relative ">
      <ToastContainer />

      {route.pathname == "/add-product" && <TopBar />}
      <div className=" flex relative ">
        {route.pathname == "/add-product" || route.pathname == "/login" ? (
          ""
        ) : (
          <div className="flex relative" style={{ width: 280 }}>
            <SideBar />
          </div>
        )}
        {routing}
      </div>
    </div>
  );
}



export default App;
