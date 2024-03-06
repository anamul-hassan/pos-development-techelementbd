import React from "react";
import { IRouteProps } from "./route_interface";
import ProfitORLossReportPage from "@/pages/previous/HomeSection/DetailsReports/ProfitORLossReportPage/ProfitORLossReportPage";
import PurchaseANDSalePage from "@/pages/previous/HomeSection/DetailsReports/PurchaseANDSalePage/PurchaseANDSalePage";
import SupplierORCustomerReportPage from "@/pages/previous/HomeSection/DetailsReports/SupplierCustomerReportPage/SupplierCustomerReportPage";
import LotReportPage from "@/pages/previous/HomeSection/DetailsReports/LotReportPage/LotReportPage";
import StockAdjustmentReportPage from "@/pages/previous/HomeSection/DetailsReports/StockAdjustmentReportPage/StockAdjustmentReportPage";
import TreadingProductsPage from "@/pages/previous/HomeSection/DetailsReports/TreadingProductsPage/TreadingProductsPage";
import ItemsReportPage from "@/pages/previous/HomeSection/DetailsReports/ItemsReportPage/ItemsReportPage";
import ProductPurchaseReportPage from "@/pages/previous/HomeSection/DetailsReports/ProductPurchaseReportPage/ProductPurchaseReportPage";
import PurchasePaymentReportPage from "@/pages/previous/HomeSection/DetailsReports/PurchasePaymentReportPage/PurchasePaymentReportPage";
import SellPaymentReportPage from "@/pages/previous/HomeSection/DetailsReports/SellPaymentReportPage/SellPaymentReportPage";
import ExpenseReportPage from "@/pages/previous/HomeSection/DetailsReports/ExpenseReportPage/ExpenseReportPage";
import RegisterReportPage from "@/pages/previous/HomeSection/DetailsReports/RegisterReportPage/RegisterReportPage";
import SalesRepresentativeReportPage from "@/pages/previous/HomeSection/DetailsReports/SalesRepresentativeReportPage/SalesRepresentativeReportPage";
import ActivityLogPage from "@/pages/previous/HomeSection/DetailsReports/ActivityLogPage/ActivityLogPage";
import StockReport from "@/pages/dashboard/report/stock_report-inventory/StockReport";
import DayBook from "@/pages/dashboard/report/day_book/DayBook";

export const details_reports_routes: IRouteProps[] = [
  {
    path: "day_book_report",
    element: React.createElement(DayBook),
  },
  {
    path: "profit_loss_reports",
    element: React.createElement(ProfitORLossReportPage),
  },
  {
    path: "stock_reports",
    element: React.createElement(StockReport),
  },
  {
    path: "purchase_sale",
    element: React.createElement(PurchaseANDSalePage),
  },
  {
    path: "supplier_customer_reports",
    element: React.createElement(SupplierORCustomerReportPage),
  },

  {
    path: "lot_reports",
    element: React.createElement(LotReportPage),
  },
  {
    path: "stock_adjustment_reports",
    element: React.createElement(StockAdjustmentReportPage),
  },
  {
    path: "treading_products",
    element: React.createElement(TreadingProductsPage),
  },
  {
    path: "items_reports",
    element: React.createElement(ItemsReportPage),
  },
  {
    path: "product_purchase_reports",
    element: React.createElement(ProductPurchaseReportPage),
  },
  // {
  //   path: "product_sell_reports",
  //   element: React.createElement(ProductSellReportPage),
  // },
  {
    path: "purchase_payment_reports",
    element: React.createElement(PurchasePaymentReportPage),
  },
  {
    path: "sell_payment_reports",
    element: React.createElement(SellPaymentReportPage),
  },
  {
    path: "expense_reports",
    element: React.createElement(ExpenseReportPage),
  },
  {
    path: "register_reports",
    element: React.createElement(RegisterReportPage),
  },
  {
    path: "sales_representative_reports",
    element: React.createElement(SalesRepresentativeReportPage),
  },
  {
    path: "activity_log",
    element: React.createElement(ActivityLogPage),
  },
];
