import { useGetAccountsQuery } from "@/store/account/accountApi";
import {
  useGetDashboardAllQuery,
  useGetDashboardQuery,
} from "@/store/dashboard/dashboardApi";
import { FC } from "react";
import {
  LuArrowDownRightFromCircle,
  LuCalendarClock,
  LuReceipt,
  LuShoppingBasket,
  LuShoppingCart,
  LuWallet,
} from "react-icons/lu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import InfoWrapper from "@/components/common/InfoWrapper";
import DataLoader from "@/components/common/loader/DataLoader";

interface IDashboardAnalyticsContainerRestProps {}

const DashboardAnalyticsContainerRest: FC<
  IDashboardAnalyticsContainerRestProps
> = () => {
  // GET ACCOUNT QUERY
  const { data: accountsData, isLoading: accountLoading } =
    useGetAccountsQuery("All");
  // GET AGGREGATION DATA ALL QUERY
  const { data: aggregationDataAll, isLoading: aggregationAllLoading } =
    useGetDashboardAllQuery(undefined) as any;
  // TOTAL ACCOUNT AMOUNT DATA
  const { data: aggregationData, isLoading: aggregationLoading } =
    useGetDashboardQuery(undefined) as any;

  // SET TOTAL ACCOUNT DATA TO BALANCE IN SPECIFIC ACCOUNT
  const accountList = accountsData?.data?.map((singleAccount: any) => {
    const accountBalance = aggregationData?.accountWisePayment?.find(
      (singleBalance: any) => singleBalance?.accountId === singleAccount?.id
    );
    return {
      ...singleAccount,
      balance: accountBalance?._sum?.paymentAmount || null,
    };
  });
  // TOTAL AMOUNT IN TOTAL ACCOUNT AMOUNT DATA
  const totalAmount = aggregationData?.accountWisePayment?.reduce(
    (singleAccount: any, balance: any) => {
      return singleAccount + balance?._sum?.paymentAmount;
    },
    0
  );

  if (accountLoading || aggregationAllLoading || aggregationLoading) {
    return <DataLoader />;
  }

  return (
    <section>
      {/* TOTAL DAY  SUMMARY AT A GLANCE */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-4">
        <ul className="rounded-xl bg-tertiary/5 text-sm px-3 py-4 border border-border/0 dark:border-border/100 hover:shadow-md transition-all duration-300 group">
          <li className="flex justify-between items-center">
            <span className="size-14 bg-success/10 flex justify-center items-center rounded-full border border-border/0 dark:border-border/100 group-hover:-rotate-45 rotate-0 transition-all duration-300">
              <LuShoppingCart className="size-7 opacity-60" />
            </span>

            <div className="flex flex-col items-end">
              <h3 className=" text-lg font-[500] text-primary/80">
                Total Sales
              </h3>
              <b className="text-lg text-primary/90 font-normal">
                {(
                  aggregationDataAll?.totalSell?.sell?.totalPrice +
                  aggregationDataAll?.totalSell?.pos?.totalPrice
                ).toFixed(2) || "0.00"}
                ৳
              </b>
            </div>
          </li>
        </ul>
        {/* TOTAL DUE INFORMATION */}
        <ul className="rounded-xl bg-tertiary/5 text-sm px-3 py-4 border border-border/0 dark:border-border/100 hover:shadow-md transition-all duration-300 group">
          <li className="flex justify-between items-center">
            <span className="size-14 bg-success/10 flex justify-center items-center rounded-full border border-border/0 dark:border-border/100 group-hover:-rotate-45 rotate-0 transition-all duration-300">
              <LuCalendarClock className="size-7 opacity-60" />
            </span>

            <div className="flex flex-col items-end">
              <h3 className=" text-lg font-[500] text-primary/80">Total Due</h3>
              <b className="text-lg text-primary/90 font-normal">
                {aggregationDataAll?.totalDueAmount?.toFixed(2) || "0.00"}৳
              </b>
            </div>
          </li>
        </ul>
        {/* TOTAL PAYMENT INFORMATION */}
        <ul className="rounded-xl bg-tertiary/5 text-sm px-3 py-4 border border-border/0 dark:border-border/100 hover:shadow-md transition-all duration-300 group">
          <li className="flex justify-between items-center">
            <span className="size-14 bg-success/10 flex justify-center items-center rounded-full border border-border/0 dark:border-border/100 group-hover:-rotate-45 rotate-0 transition-all duration-300">
              <LuWallet className="size-7 opacity-60" />
            </span>

            <div className="flex flex-col items-end">
              <h3 className=" text-lg font-[500] text-primary/80">
                Total Payment
              </h3>
              <b className="text-lg text-primary/90 font-normal">
                {aggregationDataAll?.totalPayment?.paymentAmount?.toFixed(2) ||
                  "0.00"}
                ৳
              </b>
            </div>
          </li>
        </ul>
        {/* TOTAL PURCHASE INFORMATION */}
        <ul className="rounded-xl bg-tertiary/5 text-sm px-3 py-4 border border-border/0 dark:border-border/100 hover:shadow-md transition-all duration-300 group">
          <li className="flex justify-between items-center">
            <span className="size-14 bg-success/10 flex justify-center items-center rounded-full border border-border/0 dark:border-border/100 group-hover:-rotate-45 rotate-0 transition-all duration-300">
              <LuShoppingBasket className="size-7 opacity-60" />
            </span>

            <div className="flex flex-col items-end">
              <h3 className=" text-lg font-[500] text-primary/80">
                Total Purchase
              </h3>
              <b className="text-lg text-primary/90 font-normal">
                {aggregationDataAll?.totalPurchase?.totalAmount?.toFixed(2) ||
                  "0.00"}
                ৳
              </b>
            </div>
          </li>
        </ul>
        {/* TOTAL EXPENSE INFORMATION */}
        <ul className="rounded-xl bg-tertiary/5 text-sm px-3 py-4 border border-border/0 dark:border-border/100 hover:shadow-md transition-all duration-300 group">
          <li className="flex justify-between items-center">
            <span className="size-14 bg-success/10 flex justify-center items-center rounded-full border border-border/0 dark:border-border/100 group-hover:-rotate-45 rotate-0 transition-all duration-300">
              <LuArrowDownRightFromCircle className="size-7 opacity-60" />
            </span>

            <div className="flex flex-col items-end">
              <h3 className=" text-lg font-[500] text-primary/80">
                Total Expense
              </h3>
              <b className="text-lg text-primary/90 font-normal">
                {aggregationDataAll?.totalExpenses?.totalAmount?.toFixed(2) ||
                  "0.00"}
                ৳
              </b>
            </div>
          </li>
        </ul>
        {/* TOTAL AMOUNT INFORMATION */}
        <ul className="rounded-xl bg-tertiary/5 text-sm px-3 py-4 border border-border/0 dark:border-border/100 hover:shadow-md transition-all duration-300 group">
          <li className="flex justify-between items-center">
            <span className="size-14 bg-success/10 flex justify-center items-center rounded-full border border-border/0 dark:border-border/100 group-hover:-rotate-45 rotate-0 transition-all duration-300">
              <LuReceipt className="size-7 opacity-60" />
            </span>

            <div className="flex flex-col items-end">
              <h3 className=" text-lg font-[500] text-primary/80">
                Total Amount
              </h3>
              <b className="text-lg text-primary/90 font-normal">
                {(
                  aggregationDataAll?.totalSell?.sell?.totalPrice +
                  aggregationDataAll?.totalSell?.pos?.totalPrice
                )?.toFixed(2) || "0.00"}
                ৳
              </b>
            </div>
          </li>
        </ul>
      </section>
      {/* TOTAL BANK ACCOUNT  SUMMARY AT A GLANCE */}
      <section className="pt-4">
        <InfoWrapper heading="Today's Available Amount">
          <div className="-mx-2">
            <Table className="border">
              <TableCaption>
                A list of your recent accounts transition
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Index</TableHead>
                  <TableHead>Account Name</TableHead>
                  <TableHead>Account Number</TableHead>
                  <TableHead>Account Balance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {accountList &&
                  accountList?.length > 0 &&
                  accountList?.map(
                    (singleAccount: any, accountIndex: number) => (
                      <TableRow className="divide-[0.5px]" key={accountIndex}>
                        <TableCell>{accountIndex + 1}</TableCell>
                        <TableCell>{singleAccount?.accountName}</TableCell>
                        <TableCell>{singleAccount?.accountNumber}</TableCell>
                        <TableCell>
                          {singleAccount?.balance?.toFixed(2) || "0.00"}৳
                        </TableCell>
                      </TableRow>
                    )
                  )}
                <TableRow className="bg-accent">
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    {totalAmount?.toFixed(2) || "0.00"}৳ &#40; Total Amount
                    &#41;
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </InfoWrapper>
      </section>
    </section>
  );
};

export default DashboardAnalyticsContainerRest;
