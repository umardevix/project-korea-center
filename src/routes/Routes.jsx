import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AboutPage from "../pages/aboutPage/AboutPage";
import Contact from "../pages/contact/Contact";
import Guarantee from "../pages/guarantee/Guarantee";
import HomePage from "../pages/homePage/HomePage";
import LoginPage from "../pages/loginPage/LoginPage";
import ProductIdPage, { productLoader } from "../pages/productIdPage/ProductIdPage";
import RegisterPage from "../pages/registerPage/RegisterPage";
import BasketPage from "../pages/basketPage/BasketPage";
import MakeAnOrder from "../pages/makeAnOrder/MakeAnOrder";
import NotFountPage from "../pages/notFountPage/NotFountPage";
import OtpPage from "../pages/otpPage/OtpPage";
import PaymentPage from "../pages/paymentPage/PaymentPage";

import { adminRouter } from "./AdminRouter";
import Forgot from "../pages/forgot/Forgot";
import ForgotCode from "../pages/forgotCode/ForgotCode";
import NewPassword from "../pages/newPassword/NewPassword";

import PrivateRoute from "../authContext/PrivateRouter";
import Prosmotr from "../admin/components/prosmotr/Prosmotr";
import ProfilePage from "../pages/profile/ProfilePage";



export const router = createBrowserRouter([
  ...adminRouter,
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/guarantee", element: <Guarantee /> },
      { path: "/contact", element: <Contact /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/basket", element: <BasketPage /> },
      { path: "/makeanorder", element: <MakeAnOrder /> },
      { path: "*", element: <NotFountPage /> },
      { path: "/payment", element: <PaymentPage /> },
      { path: "/otp", element: <OtpPage /> },
      { path: "/forgot", element: <Forgot /> },
      { path: "/forgot-code", element: <ForgotCode /> },
      { path: "/new-password", element: <NewPassword /> },
      {
        path: "/profile",
        element: <ProfilePage /> // Используем PrivateRoute для профиля
      },

      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/guarantee",
        element: <Guarantee />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/login",
        element: <LoginPage />
      },
      {
        path: "/register",
        element: <RegisterPage />
      },
      {
        path: "/makeanorder",
        element: <MakeAnOrder />
      },
      {
        path: "*",
        element: <NotFountPage />
      },

      {
        path: "/payment",
        element: <PaymentPage />
      },
      {
        path: "/opt",
        element: <OtpPage />
      },

      {
        loader: productLoader,
        path: "/product/:id",
        element: <ProductIdPage isProduct={true} />

      },
      {
        path: "/prosmotr/:id",
        element: <Prosmotr />
      }
    ],
  }
]);
