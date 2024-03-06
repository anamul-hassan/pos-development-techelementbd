// import { useGetDashboardAllQuery } from "@/store/dashboard/dashboardApi";
import { FC } from "react";
import {
  LuActivity,
  LuBadgeDollarSign,
  LuBadgeMinus,
  LuBanknote,
  LuRocket,
} from "react-icons/lu";

interface IDashboardAnalyticsContainerProps {}

const branch_data = [
  {
    branchName: "Branch A",
    initialBalance: 1000,
    totalSell: 500,
    totalExpense: 300,
    cashOnHand: 1200,
  },
  {
    branchName: "Branch B",
    initialBalance: 800,
    totalSell: 700,
    totalExpense: 200,
    cashOnHand: 1300,
  },
  {
    branchName: "Branch C",
    initialBalance: 1200,
    totalSell: 900,
    totalExpense: 400,
    cashOnHand: 1700,
  },
  {
    branchName: "Branch D",
    initialBalance: 1500,
    totalSell: 1100,
    totalExpense: 500,
    cashOnHand: 2100,
  },
  {
    branchName: "Branch E",
    initialBalance: 2000,
    totalSell: 1800,
    totalExpense: 700,
    cashOnHand: 3100,
  },
  {
    branchName: "Branch F",
    initialBalance: 900,
    totalSell: 600,
    totalExpense: 300,
    cashOnHand: 1200,
  },
  {
    branchName: "Branch G",
    initialBalance: 1100,
    totalSell: 800,
    totalExpense: 400,
    cashOnHand: 1500,
  },
  {
    branchName: "Branch H",
    initialBalance: 1300,
    totalSell: 1000,
    totalExpense: 600,
    cashOnHand: 1700,
  },
  {
    branchName: "Branch I",
    initialBalance: 1700,
    totalSell: 1400,
    totalExpense: 800,
    cashOnHand: 2300,
  },
  {
    branchName: "Branch J",
    initialBalance: 1800,
    totalSell: 1600,
    totalExpense: 900,
    cashOnHand: 2500,
  },
  {
    branchName: "Branch K",
    initialBalance: 1500,
    totalSell: 1200,
    totalExpense: 700,
    cashOnHand: 2000,
  },
  {
    branchName: "Branch L",
    initialBalance: 1900,
    totalSell: 1700,
    totalExpense: 1000,
    cashOnHand: 2600,
  },
];

const DashboardAnalyticsContainerAdmin: FC<
  IDashboardAnalyticsContainerProps
> = () => {
  return (
    <section>
      {/* BRANCH INFORMATION */}
      <section className="my-4">
        <h3 className="heading-secondary">Branch Analytics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 my-4">
          {branch_data.length > 0 &&
            branch_data.map((singleBranch: any, branchIndex) => (
              <ul
                key={branchIndex}
                className="rounded-xl bg-tertiary/5 text-sm px-3 py-4 border border-border/0 dark:border-border/100 group hover:shadow-md transition-all duration-300"
              >
                <li className="flex justify-between items-center mb-4">
                  <span className="size-10 bg-success/10 flex justify-center items-center rounded-full border border-border/0 dark:border-border/100 transition-all duration-300 rotate-0 group-hover:-rotate-90">
                    <LuActivity />
                  </span>

                  <div>
                    <h3 className=" text-xl font-semibold uppercase text-primary/70 group-hover:text-primary/90 transition-all duration-300">
                      {singleBranch.branchName}
                    </h3>
                    <p className="text-xs text-primary/60 group-hover:text-primary/90 transition-all duration-300">
                      Location
                    </p>
                  </div>
                </li>
                <li className="flex justify-between items-center rounded-md py-1 border border-transparent hover:border-border px-2 duration-300">
                  <label>
                    <LuBadgeDollarSign className="inline mr-1 mb-1 size-4 opacity-80" />
                    Initial Balance
                  </label>
                  <b>{singleBranch.initialBalance}</b>
                </li>
                <li className="flex justify-between items-center rounded-md py-1 border border-transparent hover:border-border px-2 duration-300">
                  <label>
                    <LuRocket className="inline mr-1 mb-1 size-4 opacity-80" />
                    Total Sell
                  </label>
                  <b>{singleBranch.totalSell}</b>
                </li>
                <li className="flex justify-between items-center rounded-md py-1 border border-transparent hover:border-border px-2 duration-300">
                  <label>
                    <LuBadgeMinus className="inline mr-1 mb-1 size-4 opacity-80" />
                    Total Expense
                  </label>
                  <b>{singleBranch.totalExpense}</b>
                </li>
                <li className="flex justify-between items-center rounded-md py-1 border border-transparent hover:border-border px-2 duration-300">
                  <label>
                    <LuBanknote className="inline mr-1 mb-1 size-4 opacity-80" />
                    Cash On Hand
                  </label>
                  <b>{singleBranch.cashOnHand}</b>
                </li>
              </ul>
            ))}
        </div>
      </section>
    </section>
  );
};

export default DashboardAnalyticsContainerAdmin;
