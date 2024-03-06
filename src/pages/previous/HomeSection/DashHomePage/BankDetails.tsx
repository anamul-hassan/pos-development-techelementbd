import {
  TBody,
  THeader,
  Table,
  Tbrow,
  Td,
  Th,
} from "@/components/previous/all/Table";
import { useGetAccountsQuery } from "@/store/account/accountApi";
import { useGetDashboardQuery } from "@/store/dashboard/dashboardApi";
import { AiOutlineLoading } from "react-icons/ai";

const BankDetails = () => {
  // TOTAL ACCOUNT AMOUNT DATA
  const { data: accountAmountData, isLoading: isLoadingAccountAmountData } =
    useGetDashboardQuery(undefined);
  // ACCOUNT DATA
  const { data: accountsData, isLoading: isLoadingAccountData } =
    useGetAccountsQuery("All") as any;
  // SET TOTAL ACCOUNT DATA TO BALANCE IN SPACEFIC ACCOUNT
  const accounts = accountsData?.data?.map((account: any) => {
    const accountBalance = accountAmountData?.accountWisePayment?.find(
      (abl: any) => abl?.accountId === account?.id
    );
    return {
      ...account,
      balance: accountBalance?._sum?.paymentAmount || null,
    };
  });
  // TOTAL AMOUNT IN TOTAL ACCOUNT AMOUNT DATA
  const totalAmount = accountAmountData?.accountWisePayment?.reduce(
    (acc: any, balance: any) => {
      return acc + balance?._sum?.paymentAmount;
    },
    0
  );

  return (
    <div className="mt-16 p-5 md:p-10 bg-white shadow-lg border-t-4 rounded-md border-brand3">
      {isLoadingAccountAmountData || isLoadingAccountData ? (
        <span className="animate-spin text-black text-2xl flex items-center justify-center">
          <AiOutlineLoading />
        </span>
      ) : (
        <>
          {/* <div className="mb-10"> */}
          <Table>
            <THeader>
              <Th>Available Amount (Per Days)</Th>
              <Th>৳ {totalAmount !== null ? totalAmount : 0} TK</Th>
            </THeader>
            <TBody>
              {accountsData &&
                accounts?.map((account: any) => (
                  <Tbrow key={account?.id}>
                    <Td>{account?.bankName}</Td>
                    <Td>৳ {account?.balance} TK</Td>
                  </Tbrow>
                ))}
            </TBody>
          </Table>
          {/* </div> */}
          {/* <Table>
              <THeader>
                <Th>Available Amount (Total)</Th>
                <Th>৳ {totalAmountAll !== null ? totalAmountAll : 0} TK</Th>
              </THeader >
              <TBody>
                {
                  accountsData &&
                  accountsAll?.map((account) =>
                    <Tbrow key={account?.id}>
                      <Td>{account?.bankName}</Td>
                      <Td>৳ {account?.balance} TK</Td>
                    </Tbrow>
                  )}
              </TBody>
            </Table > */}
        </>
      )}
    </div>
  );
};

export default BankDetails;
