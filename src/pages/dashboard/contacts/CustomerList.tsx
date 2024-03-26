import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import {
  useDeleteCustomerMutation,
  useGetCustomersQuery,
} from "@/store/customer/customerApi";
import { useToast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
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
import DataLoader from "@/components/common/loader/DataLoader";
import InputWrapper from "@/components/common/form/InputWrapper";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/common/table/DataTable";
import { fullNameConverter } from "@/utils/helpers/fullNameConverter";
import PaginationWrapper, {
  IPagination,
} from "@/components/common/PaginationWrapper";
import InfoWrapper from "@/components/common/InfoWrapper";
import AddCustomer from "@/components/dashboard/contacts/customer/AddCustomer";
import EditCustomer from "@/components/dashboard/contacts/customer/EditCustomer";
import CustomerDetails from "@/components/dashboard/contacts/customer/CustomerDetails";
import AddCustomerPayment from "@/components/dashboard/contacts/customer/customer_payment/AddCustomerPayment";

const CustomerList = () => {
  const { toast } = useToast();

  // CUSTOMER SEARCH INPUT STATE
  const [searchCustomer, setSearchCustomer] = useState("");

  // PAGINATION STATE
  const [pagination, setPagination] = useState<IPagination>({
    sort: "asc",
    page: 1,
    size: 10,
    meta: {
      page: null,
      size: null,
      total: null,
      totalPage: null,
    },
  });
  const [actionItem, setActionItem] = useState<any>();
  const [addCustomerOpen, setAddCustomerOpen] = useState(false);
  const [customerList, setCustomerList] = useState([]);
  // GET CUSTOMER DATA QUERY
  const { data: customerData, isLoading: customerLoading } =
    useGetCustomersQuery({
      sort: pagination.sort,
      search: searchCustomer,
      page: pagination.page,
      size: pagination.size,
    });

  // DELETE CUSTOMER MUTATION
  const [deleteCustomer, { isSuccess: deleteCustomerSuccess }] =
    useDeleteCustomerMutation();

  // CUSTOMER TABLE DATA REFINE
  useEffect(() => {
    if (customerData?.data?.length > 0) {
      const customizeCustomer = customerData?.data?.map(
        (singleCustomer: any) => ({
          ...singleCustomer,
          dummyEmail: singleCustomer?.email || "Not Found",
          dummyPointAmount: singleCustomer?.pointAmount || "0.00৳",
          dummyName: fullNameConverter(
            singleCustomer?.firstName?.toLowerCase() === "n/a"
              ? "Not Found"
              : singleCustomer?.firstName,
            singleCustomer?.lastName
          ),
        })
      );
      setCustomerList(customizeCustomer);
      setPagination((previousData) => ({
        ...previousData,
        meta: customerData?.meta,
      }));
    }
  }, [customerData?.data, customerData?.meta]);

  useEffect(() => {
    if (deleteCustomerSuccess) {
      toast({
        title: "Customer Delete Message",
        description: "Customer deleted successfully",
      });
    }
  }, [toast, deleteCustomerSuccess]);

  // CUSTOMER ACTIONS AND CUSTOMER TABLE COLUMNS
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "dummyName",
      header: ({ column }) => {
        return (
          <button
            className="flex items-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-1 size-3" />
          </button>
        );
      },
    },

    {
      accessorKey: "phone",
      header: "Phone",
    },
    {
      accessorKey: "dummyEmail",
      header: ({ column }) => {
        return (
          <button
            className="flex items-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown className="ml-1 size-3" />
          </button>
        );
      },
    },
    {
      accessorKey: "memberShipId",
      header: "Membership ID",
    },
    {
      accessorKey: "point",
      header: "Point",
    },
    {
      accessorKey: "dummyPointAmount",
      header: "Point Amount",
    },

    {
      header: "Action",
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const customer = row.original as any;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                onMouseEnter={() => setActionItem(customer)}
                variant="ghost"
                className="h-8 w-8 p-0"
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="flex flex-col gap-1">
              <DropdownMenuLabel>Customer Actions</DropdownMenuLabel>

              {/* EDIT CUSTOMER */}

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
                <DialogContent className="sm:max-w-[1000px] max-h-[90%] overflow-y-auto">
                  {/*  EDIT CUSTOMER INFORMATION FORM CONTAINER */}
                  <EditCustomer actionItem={actionItem} />
                </DialogContent>
              </Dialog>

              {/* CUSTOMER DETAILS */}

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full flex justify-start"
                    size="xs"
                  >
                    Details
                    <span className="text-xs font-normal ml-1">
                      &#40;Customer&#41;
                    </span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[800px] max-h-[90%] overflow-y-auto">
                  {/* CUSTOMER DETAILS CONTAINER */}
                  <CustomerDetails actionItem={actionItem} />
                </DialogContent>
              </Dialog>

              {/* CUSTOMER PAYMENT */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full flex justify-start"
                    size="xs"
                  >
                    Payment
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[90%] overflow-y-auto md:max-w-[700px]">
                  {/* ADD CUSTOMER PAYMENT CONTAINER */}
                  <AddCustomerPayment actionItem={actionItem} />
                </DialogContent>
              </Dialog>

              {/* CUSTOMER LEDGER */}
              <Button
                disabled
                variant="outline"
                className="w-full flex justify-start"
                size="xs"
              >
                Ledger
              </Button>

              {/* CUSTOMER SELL DETAILS */}
              <Button
                disabled
                variant="outline"
                className="w-full flex justify-start"
                size="xs"
              >
                Details
                <span className="text-xs font-normal ml-1">&#40;Sell&#41;</span>
              </Button>
              {/* CUSTOMER DOCUMENTS */}
              <Button
                disabled
                variant="outline"
                className="w-full flex justify-start"
                size="xs"
              >
                Documents
              </Button>

              {/* DELETE CUSTOMER BUTTON */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
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
                      This customer will be delete permanently. Are you sure you
                      want to delete the customer?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="btn-destructive-fill">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => deleteCustomer(customer?.id)}
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

  if (customerLoading) {
    return <DataLoader />;
  }

  return (
    <section>
      <div className="flex justify-end items-end w-full">
        {/* SEARCH CUSTOMER FILED */}
        <div className="flex justify-end items-center space-x-2">
          <InputWrapper
            label="Write Customer Name"
            labelFor="search_customer"
            error=""
          >
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSearchCustomer(e.target.value)
              }
              className="w-full md:w-[250px]"
              id="search_customer"
              placeholder="Write customer name/ phone for searching"
            />
          </InputWrapper>

          {/* ADD NEW CUSTOMER */}
          <InputWrapper label="#" error="" labelFor="add_new_method">
            <Dialog open={addCustomerOpen} onOpenChange={setAddCustomerOpen}>
              <DialogTrigger asChild>
                <Button
                  className="group relative"
                  variant="outline"
                  size="icon"
                >
                  <LuPlus className="h-4 w-4" />
                  <span className="sr-only">Add New Customer Button</span>
                  <span className="custom-tooltip-left">Add New Customer</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[1000px] max-h-[90%] overflow-y-auto">
                {/* ADD NEW CUSTOMER FORM CONTAINER */}
                <AddCustomer setAddCustomerOpen={setAddCustomerOpen} />
              </DialogContent>
            </Dialog>
          </InputWrapper>
        </div>
      </div>
      <div>
        {/*  CUSTOMER TABLE CONTAINER */}

        <InfoWrapper className="my-2" heading="Customer Information">
          <DataTable columns={columns} data={customerList} />
        </InfoWrapper>

        {/* PAGINATION CONTAINER */}
        <PaginationWrapper
          pagination={pagination}
          setPagination={setPagination}
        />
      </div>
    </section>
  );
};

export default CustomerList;
