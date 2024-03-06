import React from "react";
import { IRouteProps } from "./route_interface";
import AddPaymentReportPage from "@/pages/previous/HomeSection/PaymentReport/AddPaymentReportPage/AddPaymentReportPage";
import ListPaymentReportPage from "@/pages/previous/HomeSection/PaymentReport/ListPaymentReportPage/ListPaymentReportPage";
import EditPaymentReportPage from "@/pages/previous/HomeSection/PaymentReport/EditPaymentReportPage/EditPaymentReportPage";
import DayBook from "@/pages/dashboard/report/day_book/DayBook";

export const payment_report_routes: IRouteProps[] = [
  {
    path: "add_payment_report",
    element: React.createElement(AddPaymentReportPage),
  },
  {
    path: "payment_report_list",
    element: React.createElement(ListPaymentReportPage),
  },
  {
    path: "edit_payment_report/:id",
    element: React.createElement(EditPaymentReportPage),
  },
  {
    path: "day_book_report",
    element: React.createElement(DayBook),
  },
];
