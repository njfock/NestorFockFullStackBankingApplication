import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import Root from "./routes/Root";
import Login from "./routes/Login";
import CreateAccount from "./routes/CreateAccount";
import Deposit from "./routes/Deposit";
import Withdraw from "./routes/Withdraw";
import Transfer from "./routes/Transfer";
import AllData from "./routes/AllData";
import ErrorPage from "./error-page";

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/create",
    element: <CreateAccount />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/deposit",
    element: <Deposit />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/withdraw",
    element: <Withdraw />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/transfer",
    element: <Transfer />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/data",
    element: <AllData />,
    errorElement: <ErrorPage />,
  },
]);

root.render(
  <React.StrictMode >
      <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
