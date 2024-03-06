import React from "react";
import { IRouteProps } from "./route_interface";
import AddAccountPage from "@/pages/previous/HomeSection/PaymentAccounts/Account/AddAccountPage/AddAccountPage";
import ListAccountsPage from "@/pages/previous/HomeSection/PaymentAccounts/Account/ListAccountsPage/ListAccountsPage";
import EditAccountPage from "@/pages/previous/HomeSection/PaymentAccounts/Account/EditAccountPage/EditAccountPage";
import PaymentReceivedPage from "@/pages/previous/HomeSection/PaymentAccounts/PaymentReceivedPage/PaymentReceivedPage";
import BalanceSheetPage from "@/pages/previous/HomeSection/PaymentAccounts/BalanceSheetPage/BalanceSheetPage";
import TrailBalancePage from "@/pages/previous/HomeSection/PaymentAccounts/TrailBalancePage/TrailBalancePage";

import PaymentAccountReportPage from "@/pages/previous/HomeSection/PaymentAccounts/PaymentAccountReportPage/PaymentAccountReportPage";
import AddInvestPage from "@/pages/previous/HomeSection/PaymentAccounts/Invest/AddInvestPage/AddInvestPage";
import ListInvestPage from "@/pages/previous/HomeSection/PaymentAccounts/Invest/ListInvestPage/ListInvestPage";
import EditInvestPage from "@/pages/previous/HomeSection/PaymentAccounts/Invest/EditInvestPage/EditInvestPage";
import AddInvestingPage from "@/pages/previous/HomeSection/PaymentAccounts/Investing/AddInvestingPage/AddInvestingPage";
import EditInvestingPage from "@/pages/previous/HomeSection/PaymentAccounts/Investing/EditInvestingPage/EditInvestingPage";
import LIstInvestingPage from "@/pages/previous/HomeSection/PaymentAccounts/Investing/LIstInvestingPage/LIstInvestingPage";
import CashFlow from "@/pages/dashboard/payment/CashFlow";

export const payment_accounts: IRouteProps[] = [
  {
    path: "add_account",
    element: React.createElement(AddAccountPage),
  },
  {
    path: "account_list",
    element: React.createElement(ListAccountsPage),
  },
  {
    path: "edit_account/:id",
    element: React.createElement(EditAccountPage),
  },

  {
    path: "add_invest",
    element: React.createElement(AddInvestPage),
  },
  {
    path: "invest_list",
    element: React.createElement(ListInvestPage),
  },
  {
    path: "edit_invest/:id",
    element: React.createElement(EditInvestPage),
  },

  {
    path: "add_investing",
    element: React.createElement(AddInvestingPage),
  },
  {
    path: "investing_list",
    element: React.createElement(LIstInvestingPage),
  },
  {
    path: "edit_investing/:id",
    element: React.createElement(EditInvestingPage),
  },

  {
    path: "payment_received",
    element: React.createElement(PaymentReceivedPage),
  },
  {
    path: "balance_sheet",
    element: React.createElement(BalanceSheetPage),
  },
  {
    path: "trail_balance",
    element: React.createElement(TrailBalancePage),
  },
  {
    path: "cash_flow",
    element: React.createElement(CashFlow),
  },
  {
    path: "payment_account_report",
    element: React.createElement(PaymentAccountReportPage),
  },
];
