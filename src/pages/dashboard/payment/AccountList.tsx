import InfoWrapper from "@/components/common/InfoWrapper";
import InputWrapper from "@/components/common/form/InputWrapper";
import DataLoader from "@/components/common/loader/DataLoader";
import { DataTable } from "@/components/common/table/DataTable";
import AccountDetails from "@/components/dashboard/payment/account/AccountDetails";
import AddAccount from "@/components/dashboard/payment/account/AddAccount";
import EditAccount from "@/components/dashboard/payment/account/EditAccount";
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
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import {
  useDeleteAccountMutation,
  useGetAccountsQuery,
} from "@/store/account/accountApi";
import { capitalizeEveryWord } from "@/utils/helpers/capitalizeEveryWord";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";

interface IAccountListProps {}

const AccountList: FC<IAccountListProps> = () => {
  // DIALOG STATE
  const [addAccountOpen, setAddAccountOpen] = useState(false);
  const { toast } = useToast();
  // ACCOUNT TYPE INITIAL STATE
  const [accountType, setAccountType] = useState("All");

  // ACCOUNT LIST STATE
  const [accountList, setAccountList] = useState([]);
  // ACTION STATE
  const [actionItem, setActionItem] = useState<any>();

  //  GET ACCOUNTS QUERY
  const { data: accountsData, isLoading: accountLoading } = useGetAccountsQuery(
    accountType
  ) as any;

  // DELETE ACCOUNT MUTATION
  const [deleteAccount, { isSuccess: accountDeleteSuccess }] =
    useDeleteAccountMutation({}) as any;

  // ACCOUNT TABLE DATA
  useEffect(() => {
    if (accountsData?.data?.length > 0) {
      const customizeAccounts = accountsData?.data?.map(
        (singleAccount: any) => ({
          ...singleAccount,
          dummyBankName: capitalizeEveryWord(singleAccount?.bankName),
          dummyAccountName: capitalizeEveryWord(singleAccount?.accountName),
          dummyHolderName: capitalizeEveryWord(
            singleAccount?.accountHolderName
          ),
          dummyOpeningBalance: singleAccount?.openingBalance || "0.00",
          dummyAccountType: capitalizeEveryWord(singleAccount?.accountType),
        })
      );
      setAccountList(customizeAccounts);
    }
  }, [accountsData?.data]);

  useEffect(() => {
    if (accountDeleteSuccess) {
      toast({
        title: "Account Delete Message",
        description: "Account deleted successfully",
      });
    }
  }, [accountDeleteSuccess, toast]);

  if (accountLoading) {
    return <DataLoader />;
  }

  // ACCOUNT ACTIONS AND ACCOUNT TABLE COLUMNS
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "dummyAccountName",
      header: ({ column }) => {
        return (
          <button
            className="flex items-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Account Name
            <ArrowUpDown className="ml-1 size-3" />
          </button>
        );
      },
    },
    {
      accessorKey: "dummyBankName",
      header: ({ column }) => {
        return (
          <button
            className="flex items-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Bank Name
            <ArrowUpDown className="ml-1 size-3" />
          </button>
        );
      },
    },
    {
      accessorKey: "dummyAccountType",
      header: ({ column }) => {
        return (
          <button
            className="flex items-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Account Type
            <ArrowUpDown className="ml-1 size-3" />
          </button>
        );
      },
    },

    {
      accessorKey: "dummyHolderName",
      header: ({ column }) => {
        return (
          <button
            className="flex items-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Holder Name
            <ArrowUpDown className="ml-1 size-3" />
          </button>
        );
      },
    },
    {
      accessorKey: "dummyOpeningBalance",
      header: "Opening Balance",
    },
    {
      header: "Action",
      size: 20,
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const account = row.original as any;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                onMouseEnter={() => setActionItem(account)}
                variant="ghost"
                className="h-8 w-8 p-0"
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="flex flex-col gap-1">
              <DropdownMenuLabel>Product Actions</DropdownMenuLabel>

              {/* EDIT PRODUCT INFORMATION */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full flex justify-start"
                    size="xs"
                  >
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[800px]">
                  {/* ADD NEW  FORM ACCOUNT CONTAINER */}
                  <EditAccount actionItem={actionItem} />
                </DialogContent>
              </Dialog>

              {/* ACCOUNT DETAILS */}

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full flex justify-start"
                    size="xs"
                  >
                    Details
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  {/*  ACCOUNT DETAILS CONTAINER */}
                  <AccountDetails actionItem={actionItem} />
                </DialogContent>
              </Dialog>

              {/* ACCOUNT DELETE */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    type="button"
                    variant="destructive"
                    className="w-full flex justify-start"
                    size="xs"
                  >
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This account will be delete permanently. Are you sure you
                      want to delete the account?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="btn-destructive-fill">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => deleteAccount(account?.id)}
                    >
                      Confirm
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <section>
      <div className="flex justify-end items-end w-full">
        {/* SEARCH ACCOUNT BY TYPE */}
        <div className="grid grid-flow-col-dense justify-end space-x-2 w-full md:w-1/2">
          <InputWrapper
            label="Select Account Type"
            labelFor="select_account_type"
            error=""
          >
            <Select onValueChange={(value: string) => setAccountType(value)}>
              <SelectTrigger id="select_account_type">
                <SelectValue placeholder="Select account type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="MobileBanking">Mobile Banking</SelectItem>
                <SelectItem value="Bank">Bank</SelectItem>
                <SelectItem value="Cash">Cash</SelectItem>
              </SelectContent>
            </Select>
          </InputWrapper>

          {/* ADD NEW ACCOUNT */}
          <InputWrapper label="#" error="" labelFor="add_new_method">
            <Dialog open={addAccountOpen} onOpenChange={setAddAccountOpen}>
              <DialogTrigger asChild>
                <Button
                  className="group relative"
                  variant="outline"
                  size="icon"
                >
                  <LuPlus className="h-4 w-4" />
                  <span className="sr-only">Add New Account Button</span>
                  <span className="custom-tooltip-left">Add New Account</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[800px] max-h-[90%] overflow-y-auto">
                {/* ADD NEW ACCOUNT FORM CONTAINER */}
                <AddAccount setAddAccountOpen={setAddAccountOpen} />
              </DialogContent>
            </Dialog>
          </InputWrapper>
        </div>
      </div>
      <div>
        {/* ACCOUNT TABLE CONTAINER */}
        <InfoWrapper className="my-2" heading="Account Information">
          <DataTable columns={columns} data={accountList} />
        </InfoWrapper>
      </div>
    </section>
  );
};

export default AccountList;
