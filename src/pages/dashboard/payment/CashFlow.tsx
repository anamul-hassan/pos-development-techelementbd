import { FC, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAccountsQuery } from "@/store/account/accountApi";
import { useGetDashboardAllQuery } from "@/store/dashboard/dashboardApi";
import InfoWrapper from "@/components/common/InfoWrapper";
import DataLoader from "@/components/common/loader/DataLoader";

interface ICashFlowProps {}

const CashFlow: FC<ICashFlowProps> = () => {
  // INITAIL STATE FOR ACCOUNT LIST
  const [accountList, setAccountList] = useState([]);
  // GET ACCOUNT DATA QUERY
  const { data: accountData, isLoading: accountLoading } =
    useGetAccountsQuery("All");
  // GET ALL AGGREGATION DATA QUERY
  const { data: aggregationData, isLoading: aggregationLoading } =
    useGetDashboardAllQuery(undefined) as any;

  useEffect(() => {
    if (accountData?.data?.length > 0) {
      const accounts = accountData?.data?.map((singleAccount: any) => {
        return {
          accountName: singleAccount?.bankName,
          accountNumber: singleAccount?.accountNumber,
          currentAmount: aggregationData?.accountWisePayment.find(
            (singlePayment: any) => singlePayment.accountId === singleAccount.id
          )?._sum?.paymentAmount,
        };
      });
      setAccountList(accounts);
    }
  }, [accountData?.data, aggregationData]);

  if (accountLoading || aggregationLoading) {
    return <DataLoader />;
  }
  return (
    <section>
      <section>
        <InfoWrapper heading="Accounts Cash Flow Information">
          <div className="-mx-2">
            <Table className="border">
              <TableCaption>
                A list of your recent accounts cash flow
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
                        <TableCell>
                          {singleAccount?.accountName || "Not found"}
                        </TableCell>
                        <TableCell>
                          {singleAccount?.accountNumber || "Not found"}
                        </TableCell>
                        <TableCell>
                          {singleAccount?.currentAmount?.toFixed(2) || "0.00"}৳
                        </TableCell>
                      </TableRow>
                    )
                  )}
              </TableBody>
            </Table>
          </div>
        </InfoWrapper>
      </section>
    </section>
  );
};

export default CashFlow;
