import React from "react";
import { IRouteProps } from "./route_interface";
import ListExpensePage from "@/pages/previous/HomeSection/Expense/ListExpensePage/ListExpensePage";
import EditExpensePage from "@/pages/previous/HomeSection/Expense/EditExpensePage/EditExpensePage";
import ExpenseCategoryPage from "@/pages/previous/HomeSection/Expense/ExpenseCategoryPage/ExpenseCategoryPage";
import SubExpenseCategoryEdit from "@/pages/previous/HomeSection/Expense/ExpenseSubCategoryPage/SubExpenseCategoryEdit";
import ExpenseSubCategoryPage from "@/pages/previous/HomeSection/Expense/ExpenseSubCategoryPage/ExpenseSubCategoryPage";

export const expense_routes: IRouteProps[] = [
  {
    path: "expenses_list",
    element: React.createElement(ListExpensePage),
  },
  {
    path: "edit_expense/:id",
    element: React.createElement(EditExpensePage),
  },
  {
    path: "expense_category",
    element: React.createElement(ExpenseCategoryPage),
  },
  {
    path: "expense_sub_category",
    element: React.createElement(ExpenseSubCategoryPage),
  },
  {
    path: "sub_expense_category",
    element: React.createElement(ExpenseSubCategoryPage),
  },
  {
    path: "edit_expense_sub_category/:id",
    element: React.createElement(SubExpenseCategoryEdit),
  },
];
