import React from "react";
import { IRouteProps } from "./route_interface";
import ExpenseList from "@/pages/dashboard/expense/ExpenseList";
import ExpenseCategoryList from "@/pages/dashboard/expense/ExpenseCategoryList";
import ExpenseSubCategoryList from "@/pages/dashboard/expense/ExpenseSubCategoryList";

export const expense_routes: IRouteProps[] = [
  {
    path: "expenses_list",
    element: React.createElement(ExpenseList),
  },
  {
    path: "expense_category",
    element: React.createElement(ExpenseCategoryList),
  },
  {
    path: "expense_sub_category",
    element: React.createElement(ExpenseSubCategoryList),
  },
];
