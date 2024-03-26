import { Link } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";

import DataLoader from "@/components/common/loader/DataLoader";
import { useToast } from "@/components/ui/use-toast";
import { actionManager } from "@/utils/helpers/actionManager";
import PaginationWrapper, {
  IPagination,
} from "@/components/common/PaginationWrapper";
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
import { useDeleteSaleMutation, useGetSalesQuery } from "@/store/sale/saleApi";
import { format } from "date-fns";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import SaleDetails from "@/components/dashboard/sale/SaleDetails";

const SaleList = () => {
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

  // SALE SEARCH INPUT STATE
  const [saleSearch, setSaleSearch] = useState("");
  // SALE LIST STATE
  const [saleList, setSaleList] = useState([]);
  const [actionItem, setActionItem] = useState<any>();

  //   GET SALE QUERY
  const { data: saleData, isLoading: saleDataLoading } = useGetSalesQuery({
    sort: pagination?.sort,
    page: pagination?.page,
    size: pagination?.size,
    search: saleSearch,
  }) as any;

  //   DELETE SALE MUTATION
  const [deleteSale, { isSuccess: deleteSaleSuccess }] = useDeleteSaleMutation(
    {}
  ) as any;

  // SALE TABLE DATA
  useEffect(() => {
    if (saleData?.data?.length > 0) {
      const customizeSaleData = saleData?.data?.map((singleSale: any) => {
        return {
          ...singleSale,
          customerName: fullNameConverter(
            singleSale?.customer?.firstName,
            singleSale?.customer?.lastName
          ),
          phone: singleSale?.customer?.phone,
          dummyAutoInvoiceNumber: singleSale.autoInvoiceNo?.toUpperCase(),
          dummyTotalPrice: `${singleSale?.totalPrice.toFixed(2) || "0.00"}৳`,
          dummyTotalPayment: `${
            singleSale?.totalPaymentAmount.toFixed(2) || "0.00"
          }৳`,
          date: format(singleSale?.saleDate, "PPP"),
        };
      });
      setSaleList(customizeSaleData);
      setPagination((previousData: any) => ({
        ...previousData,
        meta: saleData?.meta,
      }));
    }
  }, [saleData?.data, saleData?.meta]);

  useEffect(() => {
    if (deleteSaleSuccess) {
      toast({
        title: "Sale Delete Message",
        description: "Sale deleted successfully",
      });
    }
  }, [deleteSaleSuccess, toast]);

  // SALE ACTIONS AND SALE TABLE COLUMNS
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "customerName",
      header: ({ column }) => {
        return (
          <button
            className="flex items-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Customer Name
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
      accessorKey: "dummyAutoInvoiceNumber",
      header: "Invoice No",
    },

    {
      accessorKey: "dummyTotalPrice",
      header: "Total Amount",
    },
    {
      accessorKey: "dummyTotalPayment",
      header: "Total ",
    },
    {
      accessorKey: "date",
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
        const sale = row.original as any;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                onMouseEnter={() => setActionItem(sale)}
                variant="ghost"
                className="h-8 w-8 p-0"
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="flex flex-col gap-1">
              <DropdownMenuLabel>Sale Actions</DropdownMenuLabel>

              {/* PAY SALE INFORMATION */}
              <Button
                disabled
                variant="outline"
                className="w-full flex justify-start"
                size="xs"
              >
                Pay
              </Button>

              {/* EDIT SALE INFORMATION */}
              <Button
                disabled
                variant="outline"
                className="w-full flex justify-start"
                size="xs"
              >
                Edit
              </Button>

              {/* SALE DETAILS */}

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
                <DialogContent className="sm:max-w-[1000px] max-h-[90%] overflow-y-auto">
                  {/* PRODUCT DETAILS FORM CONTAINER */}
                  <SaleDetails actionItem={actionItem} />
                </DialogContent>
              </Dialog>

              {/* LEDGER SALE INFORMATION */}
              <Button
                disabled
                variant="outline"
                className="w-full flex justify-start"
                size="xs"
              >
                Ledger
              </Button>

              {/* EXCHANGE AND RETURN  */}
              <Link
                to={`/add_sale_exchange_return/${actionItem?.id?.toString()}`}
              >
                <Button
                  variant="outline"
                  className="w-full flex justify-start"
                  size="xs"
                >
                  Exchange/ Return
                </Button>
              </Link>

              {/* SALE DELETE */}
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
                      This sale will be delete permanently. Are you sure you
                      want to delete the sale?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="btn-destructive-fill">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={() => deleteSale(sale?.id)}>
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

  if (saleDataLoading) {
    return <DataLoader />;
  }

  return (
    <section>
      <div className="flex justify-end items-end w-full">
        {/* SEARCH SALE  FILED */}
        <div className="flex justify-end items-center space-x-2">
          <InputWrapper
            label="Write Barcode/ Name/ Phone"
            labelFor="search_sale"
            error=""
          >
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSaleSearch(e.target.value)
              }
              className="w-full md:w-[250px]"
              id="search_sale"
              placeholder="Invoice barcode/ customer name/ phone"
            />
          </InputWrapper>

          {/* ADD NEW SALE */}
          <div>
            {actionManager(["manager"]) && (
              <InputWrapper label="#" error="" labelFor="">
                <Link to="/add_sale">
                  <Button
                    className="group relative"
                    variant="outline"
                    size="icon"
                  >
                    <LuPlus className="h-4 w-4" />
                    <span className="sr-only">Add New Sale Button</span>
                    <span className="custom-tooltip-left">Add New Sale</span>
                  </Button>
                </Link>
              </InputWrapper>
            )}
          </div>
        </div>
      </div>

      {/*  POS TABLE CONTAINER */}
      <InfoWrapper className="my-2" heading="Sale Information">
        <DataTable columns={columns} data={saleList} />
      </InfoWrapper>

      {/* PAGINATION CONTAINER */}
      <PaginationWrapper
        pagination={pagination}
        setPagination={setPagination}
      />
    </section>
  );
};

export default SaleList;
