import React from "react";
import { IRouteProps } from "./route_interface";
import AddStockTransferPage from "@/pages/previous/HomeSection/StockTransfer/AddStockTransferPage/AddStockTransferPage";
import ListStockTransferPage from "@/pages/previous/HomeSection/StockTransfer/ListStockTransferPage/ListStockTransferPage";
import EditStockTransferPage from "@/pages/previous/HomeSection/StockTransfer/EditStockTransferPage/EditStockTransferPage";

export const stock_transfer_routes: IRouteProps[] = [
  {
    path: "add_stock_transfer",
    element: React.createElement(AddStockTransferPage),
  },
  {
    path: "stock_transfer_list",
    element: React.createElement(ListStockTransferPage),
  },
  {
    path: "edit_stock_transfer/:id",
    element: React.createElement(EditStockTransferPage),
  },
];
