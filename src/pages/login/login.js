import React from 'react'
import auth from '../../api/auth';
import setAuthorizationHeader from '../../config/axios/setAuthorizationHeader';
import useForm from '../../helpers/hook/useForm';
import { useDispatch } from "react-redux";
import { populateProfile } from '../../store/actions/users';
import { Router,useNavigate } from "react-router-dom";
import axios from 'axios';
  import { toast } from "react-toastify";
function Login({history}) {
    const dispatch = useDispatch();
  const navigate = useNavigate()
      const [{ email, password }, setState] = useForm({
        email: "",
        password: "",
      });
    
    const submit = async (e) =>  {
      e.preventDefault();

      await auth
        .login({ email, password })
        .then(async (res) => {
          const now = new Date()
            localStorage.setItem("token", res.data.data.access_token);
            localStorage.setItem("expire_in", now.getTime() + 86400000);
              await auth.details(`Bearer ${res.data.data.access_token}`).then((detail) => {

                  
                dispatch(populateProfile(detail.data.data.data));
            
      navigate("/");

              
          });
        })
        .catch((err) => {
          toast.error('Email atau password salah ,silahkan cek lagi')
        });
    }

  return (
    <div
      className="flex flex-col items-center justify-center bg-gray-100 w-full "
      style={{ minHeight: "100vh" }}
    >
      <div className=" flex flex-col" style={{ width: "28rem", maxWidth: "28rem" }}>
        <div className="w-full justify-center items-center flex" >
          <img
            className="w-80 "
            alt="logo karyanusantara"
            src={`https://www.karyanusantara.co.id/assets/logo-nav-min.png`}
          />
        </div>
        <form
          onSubmit={submit}
          className="flex flex-col py-10 px-10 bg-white  rounded-md shadow-md"
        >
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1" htmlFor="email">
              Email
            </label>
            <input
              placeholder="email"
              className="border-gray-200 border py-2 px-2 w-full outline-none"
              onChange={setState}
              value={email}
              type="email"
              name="email"
            />
          </div>
          <div className="flex flex-col mt-5">
            <label className="text-sm text-gray-600 mb-1" htmlFor="password">
              Password
            </label>
            <input
              placeholder="password"
              className="border-gray-200 border py-2 px-2 w-full outline-none"
              onChange={setState}
              value={password}
              name="password"
              type="password"
            />
          </div>

          <button className="mt-5 bg-blue-100 text-white px-2 py-2 rounded-md" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login