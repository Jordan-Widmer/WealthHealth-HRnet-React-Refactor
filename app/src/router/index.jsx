/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, Outlet } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import React, { lazy, Suspense } from "react";

const Root = () => {
  return (
    <div className="container">
      <Outlet />
    </div>
  );
};

// Lazy load the ErrorPage, Home, and EmployeesList components
const ErrorPage = lazy(() => import("../pages/errorPage"));
const Home = lazy(() => import("../pages/home"));
const EmployeesList = lazy(() => import("../pages/employeesList"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: (
      <Suspense fallback={<div>Loading Error Page...</div>}>
        <ErrorPage />
      </Suspense>
    ),
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<div>Loading Home...</div>}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/employees-list",
        element: (
          <Suspense fallback={<div>Loading Employees List...</div>}>
            <EmployeesList />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
