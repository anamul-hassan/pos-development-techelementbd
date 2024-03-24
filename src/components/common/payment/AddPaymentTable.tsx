import { useGetAccountsQuery } from "@/store/account/accountApi";
import { ChangeEvent, FC, useState } from "react";
import InputWrapper from "../form/InputWrapper";
import { Button } from "@/components/ui/button";
import { LuPlus, LuTrash } from "react-icons/lu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAppContext } from "@/context/hook/useAppContext";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ButtonLoader from "../loader/ButtonLoader";
import { paymentTableForm } from "@/utils/constants/common/payment_table_form";
import { cn } from "@/lib/utils";

export interface IPaymentTable {
  index: number;
  accountId: number | null;
  paymentAmount: string;
}

interface IAddPaymentTableProps {
  watch: any;
  property: string;
  paymentTable: IPaymentTable[];
  setPaymentTable: (paymentTable: IPaymentTable[]) => void;
  setError?: any;
  register?: any;
  scrollable?: boolean;
  className?: string;
}

const AddPaymentTable: FC<IAddPaymentTableProps> = ({
  watch,
  property,
  paymentTable,
  setPaymentTable,
  setError,
  scrollable,
  className,
}) => {
  const { sidebarOpen } = useAppContext();
  // THIS STATE PREVENT TO SET VALUE WHEN DROPDOWN IS CLOSE
  const [accountUpdate, setAccountUpdate] = useState<boolean>(false);
  // GET ALL THE BANK ACCOUNT QUERY
  const { data: accountsData, isLoading: accountLoading } = useGetAccountsQuery(
    "All"
  ) as any;
  // REMOVE PAYMENT TABLE HANDLER
  const removePaymentTableHandler = (index: number) => {
    // FILTER OUT THE TABLE WITH THE SPECIFIC INDEX
    const updatedPaymentMethodTable = paymentTable.filter(
      (singleTable: IPaymentTable) => singleTable.index !== index
    );

    // UPDATE THE INDEX OF THE REMAINING ITEMS
    updatedPaymentMethodTable.forEach(
      (singleTable: IPaymentTable, tableIndex: number) => {
        singleTable.index = tableIndex;
      }
    );
    // SET THE UPDATED TABLE IN THE STATE
    setPaymentTable(updatedPaymentMethodTable);
  };

  const addPaymentTableHandler = () => {
    // GET THE HIGHEST INDEX NUMBER
    const maxIndex = Math.max(
      ...paymentTable.map((account: any) => +account.index)
    );
    // CREATE A NEW OBJECT WITH THE REQUIRE PROPERTIES
    const newItem = {
      index: +maxIndex + 1,
      accountId: null,
      paymentAmount: "",
    };
    // UPDATE THE DATA ON THE STATE
    setPaymentTable([...paymentTable, newItem]);
  };
  return (
    <aside className={cn("", className)}>
      <div
        className={
          scrollable ? "max-h-[350px] overflow-y-auto scroll-hidden" : ""
        }
      >
        {paymentTable?.map((singleAccount: any, accountIndex: number) => (
          <ul key={accountIndex} className="grid grid-flow-col gap-x-2 gap-y-1">
            <li>
              {accountIndex === 0 ? (
                <InputWrapper label="#" error="" labelFor="add_new_method">
                  {/* ADD PAYMENT METHOD TABLE */}
                  <Button
                    type="button"
                    className="group relative"
                    disabled={
                      watch(property)?.length === accountsData?.data?.length
                    }
                    onClick={() => addPaymentTableHandler()}
                    variant="outline"
                    size="icon"
                  >
                    <LuPlus className="h-4 w-4" />
                    {/* TOOLTIP TEXT */}
                    <span className="custom-tooltip-right">
                      Add Payment Method
                    </span>
                    <span className="sr-only">
                      Add Another Pay Method Button
                    </span>
                  </Button>
                </InputWrapper>
              ) : (
                <InputWrapper label="#" error="" labelFor="add_new_method">
                  {/* REMOVE PAYMENT METHOD TABLE */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        type="button"
                        className="group relative"
                        variant="destructive"
                        size="icon"
                      >
                        <LuTrash className="h-4 w-4" />
                        {/* TOOLTIP TEXT */}
                        <span className="custom-tooltip-right">
                          Remove Payment Method
                        </span>
                        <span className="sr-only">
                          Remove Pay Method Button
                        </span>
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Payment Method Removal Confirmation
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to remove this payment method?
                          This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() =>
                            removePaymentTableHandler(accountIndex)
                          }
                        >
                          Confirm
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </InputWrapper>
              )}
            </li>
            <li className="w-full">
              <InputWrapper
                labelFor="paying_method"
                label={paymentTableForm.payment_method.label["en"]}
                className={`w-full  ${
                  sidebarOpen
                    ? "lg:w-[94px] xl:w-[128px] truncate"
                    : "lg:w-[134px] xl:w-full"
                }`}
              >
                <Select
                  onOpenChange={(open: boolean) => setAccountUpdate(open)}
                  onValueChange={(value: any) => {
                    // THIS CONDITION PREVENT THE UPDATE DATA AUTOMATICALLY
                    if (accountUpdate) {
                      const updatedTable = paymentTable.map(
                        (singleTable: any) =>
                          singleTable.index === accountIndex
                            ? { ...singleTable, accountId: +value }
                            : singleTable
                      );
                      setPaymentTable(updatedTable);
                      setError(`payments[${accountIndex}].accountId`, {
                        type: "custom",
                        message: "",
                      });
                    }
                  }}
                  value={singleAccount.accountId ? singleAccount.accountId : ""}
                >
                  <SelectTrigger
                    id="paying_method"
                    className={`w-full p-5 focus:ring-0 ${
                      sidebarOpen
                        ? "lg:w-[90px] xl:w-[120px] truncate"
                        : "lg:w-[130px] xl:w-full"
                    }`}
                  >
                    <SelectValue
                      placeholder={
                        paymentTableForm.payment_method.placeholder["en"]
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {!accountsData?.data?.length && accountLoading && (
                      <div className="w-full h-24 flex items-center justify-center">
                        {accountLoading && <ButtonLoader />}
                      </div>
                    )}
                    {accountLoading ||
                      (accountsData?.data &&
                        accountsData?.data?.length > 0 &&
                        accountsData?.data.map((singleAccount: any) => (
                          <SelectItem
                            disabled={watch(property)?.some(
                              (accountItem2: any) =>
                                accountItem2.accountId === singleAccount?.id
                            )}
                            className="cursor-pointer"
                            key={singleAccount?.id}
                            value={singleAccount?.id}
                          >
                            {singleAccount?.accountName}
                          </SelectItem>
                        )))}
                  </SelectContent>
                </Select>
              </InputWrapper>
            </li>
            <li className="w-full">
              <InputWrapper
                label={paymentTableForm.payable_amount.label["en"]}
                labelFor="paying_amount"
              >
                {/* ENTER AMOUNT FILED */}
                <Input
                  type="number"
                  onWheel={(event) => event.currentTarget.blur()}
                  value={singleAccount.paymentAmount || ""}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const updatedTable = paymentTable.map((singleTable: any) =>
                      singleTable.index === accountIndex
                        ? { ...singleTable, paymentAmount: +e.target.value }
                        : singleTable
                    );
                    setPaymentTable(updatedTable);
                  }}
                  id="paying_amount"
                  placeholder={
                    paymentTableForm.payable_amount.placeholder["en"]
                  }
                />
              </InputWrapper>
            </li>
          </ul>
        ))}
      </div>
    </aside>
  );
};

export default AddPaymentTable;
