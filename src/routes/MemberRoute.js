import React from "react";
import { Route, Navigate } from "react-router-dom";

const MemberRoute = ({
  component: Component,
  match,
  path,
  location,
  ...rest
}) => {
  const ok = localStorage.getItem("token");
  console.log(rest);
  localStorage.removeItem("Karyanusantara:redirect");

  return (
    <Route
      {...rest}
      render={(props) =>
        ok ? (
          <Component {...props} />
        ) : (
          <Navigate to={`/login?path=${location.pathname}`} />
        )
      }
    />
  );
};

export default MemberRoute
