import React from "react";
import { IRouteProps } from "./route_interface";
import AddStaffPage from "@/pages/previous/HomeSection/HRM/Staff/AddStaffPage/AddStaffPage";
import ListStaffPage from "@/pages/previous/HomeSection/HRM/Staff/ListStaffPage/ListStaffPage";
import EditStaffPage from "@/pages/previous/HomeSection/HRM/Staff/EditStaffPage/EditStaffPage";
import AddStaffPaymentPage from "@/pages/previous/HomeSection/HRM/StaffPayment/AddStaffPaymentPage/AddStaffPaymentPage";
import ListStaffPaymentPage from "@/pages/previous/HomeSection/HRM/StaffPayment/ListStaffPaymentPage/ListStaffPaymentPage";
import EditStaffPaymentPage from "@/pages/previous/HomeSection/HRM/StaffPayment/EditStaffPaymentPage/EditStaffPaymentPage";
import ListOverTimePage from "@/pages/previous/HomeSection/HRM/ListOverTimePage/ListOverTimePage";
import AddStaffSalaryPage from "@/pages/previous/HomeSection/HRM/StaffSalary/AddStaffSalaryPage/AddStaffSalaryPage";
import ListStaffSalaryPage from "@/pages/previous/HomeSection/HRM/StaffSalary/ListStaffSalaryPage/ListStaffSalaryPage";
import StaffSalaryReportPage from "@/pages/previous/HomeSection/HRM/StaffSalary/StaffSalaryReportPage/StaffSalaryReportPage";
import StaffAttendancePage from "@/pages/previous/HomeSection/HRM/StaffAttendance/StaffAttendancePage/StaffAttendancePage";
import StaffAttendanceReportPage from "@/pages/previous/HomeSection/HRM/StaffAttendance/StaffAttendanceReportPage/StaffAttendanceReportPage";

export const human_resource_management_routes: IRouteProps[] = [
  {
    path: "add_staff",
    element: React.createElement(AddStaffPage),
  },
  {
    path: "staff_list",
    element: React.createElement(ListStaffPage),
  },
  {
    path: "edit_staff/:id",
    element: React.createElement(EditStaffPage),
  },
  {
    path: "add_staff_payment",
    element: React.createElement(AddStaffPaymentPage),
  },
  {
    path: "staff_payment_list",
    element: React.createElement(ListStaffPaymentPage),
  },
  {
    path: "edit_staff_payment/:id",
    element: React.createElement(EditStaffPaymentPage),
  },
  {
    path: "over_time_list",
    element: React.createElement(ListOverTimePage),
  },
  {
    path: "add_staff_salary",
    element: React.createElement(AddStaffSalaryPage),
  },
  {
    path: "staff_salary_list",
    element: React.createElement(ListStaffSalaryPage),
  },
  {
    path: "staff_salary_reports",
    element: React.createElement(StaffSalaryReportPage),
  },
  {
    path: "staff_attendance",
    element: React.createElement(StaffAttendancePage),
  },
  {
    path: "staff_attendance_report",
    element: React.createElement(StaffAttendanceReportPage),
  },
];
