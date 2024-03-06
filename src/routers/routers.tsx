import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "@/layout/DashboardLayout";
import LoginLayout from "@/layout/previous/LoginLayout";
import Login from "@/pages/public/authentication/Login";
import AdminRoute from "./AdminRoute";
import React, { Suspense } from "react";
import PageLoader from "@/components/common/loader/PageLoader";
import { user_management_routes } from "./routes/user_management";
import { contacts_routes } from "./routes/contacts";
import { products_routes } from "./routes/products";
// import { human_resource_management_routes } from "./routes/human_resource_management";
// import { stock_transfer_routes } from "./routes/stock_transfer";
// import { stock_adjustment_routes } from "./routes/stock_adjustment";
import { settings_routes } from "./routes/settings";
// import { due_report_routes } from "./routes/due_report";
import { expense_routes } from "./routes/expense";
import { details_reports_routes } from "./routes/details_reports";
import { payment_accounts } from "./routes/payment";
import { sell_routes } from "./routes/sell";
import { purchase_routes } from "./routes/purchase";
import DashboardAnalytics from "@/pages/dashboard/analytics/DashboardAnalytics";
import ErrorPage from "@/pages/public/ErrorPage";
// import { payment_report_routes } from "./routes/payment_report";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: (
      <Suspense fallback={<PageLoader />}>
        <AdminRoute>
          <DashboardLayout />
        </AdminRoute>
      </Suspense>
    ),
    children: [
      {
        path: "/",
        element: React.createElement(DashboardAnalytics),
      },
      // USER MANAGEMENT ROUTES
      ...user_management_routes,

      // CUSTOMER  CONTACT ROUTES
      ...contacts_routes,

      // PRODUCT MANAGEMENT ROUTES
      ...products_routes,

      // PURCHASE ROUTES
      ...purchase_routes,

      // SELL ROUTES
      ...sell_routes,

      // EXPENSE ROUTES
      ...expense_routes,

      // PAYMENT ACCOUNT ROUTES
      ...payment_accounts,

      // DETAILS REPORTS ROUTE
      ...details_reports_routes,

      // SETTINGS ROUTES
      ...settings_routes,

      // // HUMAN RESOURCE MANAGEMENT ROUTES
      // ...human_resource_management_routes,

      // // STOCK TRANSFER ROUTES
      // ...stock_transfer_routes,

      // // STOCK ADJUSTMENT ROUTES
      // ...stock_adjustment_routes,

      // // DUE REPORTS ROUTES
      // ...due_report_routes,

      // // PAYMENT REPORTS ROUTES
      // ...payment_report_routes,
    ],
  },
  // Authentication
  {
    path: "auth",
    element: <LoginLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
