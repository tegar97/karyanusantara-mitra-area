import { Navigate, Outlet } from "react-router-dom";
import History from "./pages/history/history";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import AddProduct from "./pages/product/add-product";
import GeneralSetting from "./pages/setting/bussiness-setting/general";
import StoreSetting from "./pages/setting/store-setting/setting";
import ShippingSetting from "./pages/shippment-setting/shipping -setting";
import Transaction from "./pages/transaction/transaction";
import Products from "./pages/view-products/products";
const routes = (isLoggedIn) => [
  {
    path: "/",
    element: isLoggedIn ? <Outlet /> : <Navigate to="/login" />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/add-product", element: <AddProduct /> },
      { path: "/products", element: <Products /> },
      { path: "/kurir", element: <ShippingSetting /> },
      { path: "/general-setting", element: <GeneralSetting /> },
      { path: "/store-setting", element: <StoreSetting /> },
      { path: "/transaction", element: <Transaction /> },
      { path: "/history", element: <History /> },
    ],
  },
  {
    path: "/login",
    element: !isLoggedIn ? <Login /> : <Navigate to="/" />,
    children: [{ path: "login", element: <Login /> }],
  },
];

export default routes;