import InfoWrapper from "@/components/common/InfoWrapper";
import PaginationWrapper, {
  IPagination,
} from "@/components/common/PaginationWrapper";
import InputWrapper from "@/components/common/form/InputWrapper";
import DataLoader from "@/components/common/loader/DataLoader";
import { DataTable } from "@/components/common/table/DataTable";
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
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useGetSaleReturnExchangesQuery } from "@/store/sale_exchange_return/saleExchangeReturnApi";
import { actionManager } from "@/utils/helpers/actionManager";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import moment from "moment";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";

interface IPurchaseExchangeReturnListProps {}

const PurchaseExchangeReturnList: FC<IPurchaseExchangeReturnListProps> = () => {
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

  const [deleteDone, setDeleteDone] = useState(false);

  // PURCHASE RETURN/ EXCHANGE SEARCH INPUT STATE
  const [purchaseReturnSearch, setPurchaseReturnSearch] = useState("");
  // PURCHASE RETURN/ EXCHANGE LIST STATE
  const [purchaseReturnList, setPurchaseReturnList] = useState([]);
  const [actionItem, setActionItem] = useState<any>();

  //   GET PURCHASE RETURN/ EXCHANGE QUERY
  const { data: purchaseReturnData, isLoading: purchaseReturnDataLoading } =
    useGetSaleReturnExchangesQuery({
      sort: pagination?.sort,
      page: pagination?.page,
      size: pagination?.size,
      search: purchaseReturnSearch,
    }) as any;

  // console.log(sellReturnData);

  // PURCHASE RETURN/ EXCHANGE TABLE DATA
  useEffect(() => {
    if (purchaseReturnData?.data?.length > 0) {
      const purchaseReturnExchange = purchaseReturnData?.data?.map(
        (singleReturn: any) => {
          return {
            ...singleReturn,
            date: moment(singleReturn?.date).format("YYYY-MM-DD"),
          };
        }
      );
      setPurchaseReturnList(purchaseReturnExchange);
      setPagination((previousData: any) => ({
        ...previousData,
        meta: purchaseReturnData?.meta,
      }));
    }

    // SELL RETURN AND EXCHANGE DELETE MESSAGE
    if (deleteDone) {
      toast({
        title: "Purchase Return & Exchange Delete Message",
        description: "Purchase return & exchange deleted successfully",
      });
      setDeleteDone(false);
    }
  }, [
    toast,
    pagination.size,
    deleteDone,
    purchaseReturnData?.data,
    purchaseReturnData?.meta,
    purchaseReturnSearch,
  ]);

  // PURCHASE RETURN/ EXCHANGE ACTIONS AND TABLE COLUMNS
  const columns: ColumnDef<any>[] = [
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
        const sellReturn = row.original as any;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                onMouseEnter={() => setActionItem({ actionItem, sellReturn })}
                variant="ghost"
                className="h-8 w-8 p-0"
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="flex flex-col gap-1">
              <DropdownMenuLabel>Return Actions</DropdownMenuLabel>

              {/* PURCHASE RETURN / EXCHANGE PAYMENT */}
              <Button
                variant="outline"
                className="w-full flex justify-start"
                size="xs"
              >
                Pay
              </Button>

              {/* EDIT PURCHASE RETURN INFORMATION */}
              <Button
                variant="outline"
                className="w-full flex justify-start"
                size="xs"
              >
                Edit
              </Button>

              {/* PURCHASE RETURN AND EXCHANGE DETAILS */}
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
                  {/* PURCHASE RETURN AND EXCHANGE DETAILS FORM CONTAINER */}
                </DialogContent>
              </Dialog>

              {/* PURCHASE RETURN AND EXCHANGE DELETE */}
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
                      This purchase return/ exchange data will be delete
                      permanently. Are you sure you want to delete the data?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="btn-destructive-fill">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                    // disabled={isSellReturnDeleteLoading}
                    // onClick={() => deleteSellReturn(sellReturn?.id)}
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

  if (purchaseReturnDataLoading) {
    return <DataLoader />;
  }

  return (
    <section>
      <div className="flex justify-end items-end w-full">
        <div className="flex justify-end items-center space-x-2">
          <InputWrapper
            label="Write Barcode"
            labelFor="search_purchase_return_exchange"
          >
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPurchaseReturnSearch(e.target.value)
              }
              className="w-full md:w-[250px]"
              id="search_purchase_return_exchange"
              placeholder="Write customer name for searching"
            />
          </InputWrapper>

          {/* ADD SALE RETURN & EXCHANGE PURCHASE RETURN/ EXCHANGE */}
          <div>
            {actionManager(["manager"]) && (
              // <Link
              //   to={"/add_sellReturn"}
              //   className="relative inline-block text-lg group"
              // >
              <InputWrapper label="#">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="group relative"
                      variant="outline"
                      size="icon"
                    >
                      <LuPlus className="h-4 w-4" />
                      <span className="sr-only">
                        Add New Purchase Return Button
                      </span>
                      <span className="custom-tooltip-left">
                        Add New Purchase Return
                      </span>
                    </Button>
                  </DialogTrigger>
                </Dialog>
              </InputWrapper>
              // </Link>
            )}
          </div>
        </div>
      </div>

      <div>
        {/*  SALE EXCHANGE/ RETURN TABLE CONTAINER */}

        <InfoWrapper
          className="mb-2"
          heading="Purchase Return/ Exchange Information"
        >
          <DataTable columns={columns} data={purchaseReturnList} />
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

export default PurchaseExchangeReturnList;
