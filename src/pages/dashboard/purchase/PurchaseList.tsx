import { Link } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import DataLoader from "@/components/common/loader/DataLoader";
import { useToast } from "@/components/ui/use-toast";

import { actionManager } from "@/utils/helpers/actionManager";
import PaginationWrapper, {
  IPagination,
} from "@/components/common/PaginationWrapper";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LuPlus } from "react-icons/lu";
import { Input } from "@/components/ui/input";
import InputWrapper from "@/components/common/form/InputWrapper";

import { fullNameConverter } from "@/utils/helpers/fullNameConverter";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import InfoWrapper from "@/components/common/InfoWrapper";
import { DataTable } from "@/components/common/table/DataTable";
import {
  useDeletePurchaseMutation,
  useGetPurchasesQuery,
} from "@/store/purchase/purchaseApi";
import PurchaseDetails from "@/components/dashboard/purchase/PurchaseDetails";
import moment from "moment";

const PurchaseList = () => {
  const { toast } = useToast();
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

  // PURCHASE SEARCH INPUT STATE
  const [purchaseSearch, setPurchaseSearch] = useState("");
  // PURCHASE LIST STATE
  const [purchaseList, setPurchaseList] = useState([]);
  const [actionItem, setActionItem] = useState<any>();

  // GET PURCHASE QUERY
  const { data: purchaseData, isLoading: isPurchaseDataLoading } =
    useGetPurchasesQuery({
      sort: pagination?.sort,
      page: pagination?.page,
      size: pagination?.size,
      search: purchaseSearch,
    }) as any;

  // DELETE PURCHASE MUTATION
  const [deletePurchase, { isSuccess: deletePurchaseSuccess }] =
    useDeletePurchaseMutation({}) as any;

  // PURCHASE TABLE DATA
  useEffect(() => {
    if (purchaseData?.data?.length > 0) {
      const customizePurchase = purchaseData?.data?.map(
        (singlePurchase: any) => {
          return {
            ...singlePurchase,
            supplier: {
              ...singlePurchase?.supplier,
              dummyName: fullNameConverter(
                singlePurchase?.supplier?.firstName,
                singlePurchase?.supplier?.lastName
              ),
            },
            dummyTotalAmount: `${
              singlePurchase?.totalAmount?.toFixed(2) || "0.00"
            }৳`,
            dummyTotalPaymentAmount: `${
              singlePurchase?.totalPaymentAmount?.toFixed(2) || "0.00"
            }৳`,
            dummyDue: `${singlePurchase?.due?.toFixed(2) || "0.00"}৳`,
            dummyDate: `${
              moment(singlePurchase?.purchaseDate).format("DD MMMM, YYYY") ||
              "Not Found"
            }`,
          };
        }
      );
      setPurchaseList(customizePurchase);
      setPagination((previousData: any) => ({
        ...previousData,
        meta: purchaseData?.meta,
      }));
    }
  }, [purchaseData?.data, purchaseData?.meta]);

  useEffect(() => {
    if (deletePurchaseSuccess) {
      toast({
        title: "Purchase Delete Message",
        description: "Purchase deleted successfully",
      });
    }
  }, [deletePurchaseSuccess, toast]);

  // POS ACTIONS AND POS TABLE COLUMNS
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "supplier.dummyName",
      header: ({ column }) => {
        return (
          <button
            className="flex items-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Supplier's Name
            <ArrowUpDown className="ml-1 size-3" />
          </button>
        );
      },
    },

    {
      accessorKey: "supplier.phone",
      header: "Supplier's Phone",
    },
    {
      accessorKey: "dummyTotalAmount",
      header: "Total Amount",
    },
    {
      accessorKey: "dummyDue",
      header: "Due Amount",
    },
    {
      accessorKey: "dummyTotalPaymentAmount",
      header: "Total Payment",
    },
    {
      accessorKey: "dummyDate",
      header: ({ column }) => {
        return (
          <button
            className="flex items-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Date
            <ArrowUpDown className="ml-1 size-3" />
          </button>
        );
      },
    },
    {
      header: "Action",
      size: 20,
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const purchase = row.original as any;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                onMouseEnter={() => setActionItem(purchase)}
                variant="ghost"
                className="h-8 w-8 p-0"
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="flex flex-col gap-1">
              <DropdownMenuLabel>Purchase Actions</DropdownMenuLabel>
              {/* PAY PURCHASE INFORMATION */}
              <Button
                variant="outline"
                className="w-full flex justify-start"
                size="xs"
              >
                Pay
              </Button>
              {/* EDIT PURCHASE INFORMATION */}
              <Button
                variant="outline"
                className="w-full flex justify-start"
                size="xs"
              >
                Edit
              </Button>
              {/* PURCHASE DETAILS */}
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
                <DialogContent className="sm:max-w-[1000px] max-h-[90%] overflow-y-auto scroll-hidden">
                  {/* PURCHASE DETAILS */}
                  <PurchaseDetails actionItem={actionItem} />
                </DialogContent>
              </Dialog>
              {/* EXCHANGE AND RETURN  */}
              <Link
                to={`/add_purchase_exchange_return/${actionItem?.id?.toString()}`}
              >
                <Button
                  variant="outline"
                  className="w-full flex justify-start"
                  size="xs"
                >
                  Return
                </Button>
              </Link>

              {/* PURCHASE DELETE */}
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
                      This purchase will be delete permanently. Are you sure you
                      want to delete the purchase?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="btn-destructive-fill">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => deletePurchase(purchase?.id)}
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

  if (isPurchaseDataLoading) {
    return <DataLoader />;
  }

  return (
    <div>
      <div className="flex justify-end items-end w-full">
        {/* PURCHASE SEARCH FILED */}
        <div className="flex justify-end items-center space-x-2">
          <InputWrapper
            label="Write purchase  name"
            labelFor="search_purchase"
            error=""
          >
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPurchaseSearch(e.target.value)
              }
              className="w-full md:w-[250px]"
              id="search_purchase"
              placeholder="Write supplier name for searching"
            />
          </InputWrapper>

          {/* ADD NEW PURCHASE */}
          <div>
            {actionManager(["manager"]) && (
              <Link
                to={"/add_purchase"}
                className="relative inline-block text-lg group"
              >
                <InputWrapper label="#" error="" labelFor="">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        className="group relative"
                        variant="outline"
                        size="icon"
                      >
                        <LuPlus className="h-4 w-4" />
                        <span className="sr-only">Add New Purchase Button</span>
                        <span className="custom-tooltip-left">
                          Add New Purchase
                        </span>
                      </Button>
                    </DialogTrigger>
                  </Dialog>
                </InputWrapper>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div>
        {/*  PURCHASE TABLE CONTAINER */}
        <InfoWrapper className="my-2" heading="Purchase Information">
          <DataTable columns={columns} data={purchaseList} />
        </InfoWrapper>
        {/* PAGINATION CONTAINER */}
        <PaginationWrapper
          pagination={pagination}
          setPagination={setPagination}
        />
      </div>
    </div>
  );
};

export default PurchaseList;
