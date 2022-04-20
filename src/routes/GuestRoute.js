import React from "react";
import { Route, Navigate } from "react-router-dom";

const GuestRoute = ({ component: Component, location, ...rest }) => {
  const ok = localStorage.getItem("token");
  const params = location?.search.substring(1).split("&");
  const path = params.find((item) => item.indexOf("path") > -1);
  const redirect = path?.split("=")?.[1];

  if (!ok && redirect) localStorage.setItem("Karyanusantara:redirect", redirect);

  return (
    <Route
      {...rest}
      render={(props) =>
        ok ? <Navigate to={`/`} /> : <Component {...props} />
      }
    />
  );
};

export default GuestRoute
