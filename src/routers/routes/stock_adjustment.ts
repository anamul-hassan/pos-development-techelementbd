import React from "react";
import { IRouteProps } from "./route_interface";
import EditStockAdjustmentPage from "@/pages/previous/HomeSection/StockAdjustment/EditStockAdjustmentPage/EditStockAdjustmentPage";
import ListStockAdjustmentPage from "@/pages/previous/HomeSection/StockAdjustment/ListStockAdjustmentPage/ListStockAdjustmentPage";
import AddStockAdjustmentPage from "@/pages/previous/HomeSection/StockAdjustment/AddStockAdjustmentPage/AddStockAdjustmentPage";

export const stock_adjustment_routes: IRouteProps[] = [
  {
    path: "add_stock_adjustment",
    element: React.createElement(AddStockAdjustmentPage),
  },
  {
    path: "stock_adjustment_list",
    element: React.createElement(ListStockAdjustmentPage),
  },
  {
    path: "edit_stock_adjustment/:id",
    element: React.createElement(EditStockAdjustmentPage),
  },
];
