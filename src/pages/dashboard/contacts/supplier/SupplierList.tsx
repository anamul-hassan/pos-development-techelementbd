import InfoWrapper from "@/components/common/InfoWrapper";
import PaginationWrapper, {
  IPagination,
} from "@/components/common/PaginationWrapper";
import InputWrapper from "@/components/common/form/InputWrapper";
import DataLoader from "@/components/common/loader/DataLoader";
import { DataTable } from "@/components/common/table/DataTable";
import AddSupplier from "@/components/dashboard/contacts/supplier/AddSupplier";
import EditSupplier from "@/components/dashboard/contacts/supplier/EditSupplier";
import SupplierDetails from "@/components/dashboard/contacts/supplier/SupplierDetails";
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

import {
  useDeleteSupplierMutation,
  useGetSuppliersQuery,
} from "@/store/supplier/supplierApi";
import { capitalizeEveryWord } from "@/utils/helpers/capitalizeEveryWord";
import { fullNameConverter } from "@/utils/helpers/fullNameConverter";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";

const SupplierList = () => {
  const { toast } = useToast();
  // SUPPLIER UPDATE STATE
  const [actionItem, setActionItem] = useState<any>();
  // PAGINATION STATE
  const [pagination, setPagination] = useState<IPagination>({
    page: 1,
    size: 10,
    meta: {
      page: null,
      size: null,
      total: null,
      totalPage: null,
    },
  });
  // INITIAL SUPPLIER LIST
  const [supplierList, setSupplierList] = useState([]);
  // ADD SUPPLIER DIALOG STATE
  const [addSupplierOpen, setAddSupplierOpen] = useState(false);
  // SEARCH SUPPLIER INPUT STATE
  const [searchSupplier, setSearchSupplier] = useState("");
  // GET SUPPLIER QUERY
  const { data: suppliersData, isLoading: supplierLoading } =
    useGetSuppliersQuery({
      search: searchSupplier,
      page: pagination?.page,
      size: pagination?.size,
    });
  // SUPPLIER TABLE DATA
  useEffect(() => {
    if (suppliersData?.data?.length > 0) {
      const customizeSupplier = suppliersData?.data?.map(
        (singleSupplier: any) => {
          return {
            ...singleSupplier,
            name: capitalizeEveryWord(
              fullNameConverter(
                singleSupplier?.firstName,
                singleSupplier?.lastName
              )
            ),
          };
        }
      );
      setSupplierList(customizeSupplier);
      setPagination((previousState) => ({
        ...previousState,
        meta: suppliersData?.meta,
      }));
    }
  }, [suppliersData?.data, suppliersData?.meta]);

  const [deleteSupplier, { isSuccess: isDeleteSupplierSuccess }] =
    useDeleteSupplierMutation({}) as any;

  useEffect(() => {
    if (isDeleteSupplierSuccess) {
      toast({
        title: "Supplier Delete Message",
        description: "Supplier deleted successfully",
      });
    }
  }, [isDeleteSupplierSuccess, toast]);

  // SUPPLIER ACTIONS AND SUPPLIER TABLE COLUMNS
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "name",
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
      accessorKey: "email",
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
      accessorKey: "phone",
      header: "Phone",
    },

    {
      header: "Action",
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const supplier = row.original as any;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0"
                onMouseEnter={() => {
                  setActionItem(supplier);
                }}
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="flex flex-col gap-1">
              <DropdownMenuLabel>Supplier Actions</DropdownMenuLabel>

              {/* EDIT SUPPLIER ROUTE */}

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
                  {/* EDIT SUPPLIER FORM CONTAINER */}
                  <EditSupplier actionItem={actionItem} />
                </DialogContent>
              </Dialog>

              {/* VIEW SUPPLIER DETAILS */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full flex justify-start"
                    size="xs"
                  >
                    Details
                    <span className="text-xs font-normal ml-1">
                      &#40;Supplier&#41;
                    </span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[1000px] max-h-[90%] overflow-y-auto">
                  {/* SUPPLIER DETAILS CONTAINER */}
                  <SupplierDetails actionItem={actionItem} />
                </DialogContent>
              </Dialog>
              {/* SUPPLIER LEDGER */}
              <Button
                disabled
                variant="outline"
                className="w-full flex justify-start"
                size="xs"
              >
                Ledger
              </Button>
              {/* SUPPLIER PURCHASE DETAILS */}
              <Button
                disabled
                variant="outline"
                className="w-full flex justify-start"
                size="xs"
              >
                Details
                <span className="text-xs font-normal ml-1">
                  &#40;Purchase&#41;
                </span>
              </Button>
              {/* SUPPLIER DOCUMENT */}
              <Button
                disabled
                variant="outline"
                className="w-full flex justify-start"
                size="xs"
              >
                Document
              </Button>

              {/* DELETE SUPPLIER BUTTON */}
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
                    <AlertDialogTitle className={``}>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This supplier will be delete permanently. Are you sure you
                      want to delete the supplier?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="btn-destructive-fill">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => deleteSupplier(supplier?.id)}
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

  if (supplierLoading) {
    return <DataLoader />;
  }

  return (
    <section>
      <div className="flex justify-end items-end w-full">
        {/* SEARCH PRODUCT  FILED */}
        <div className="flex justify-end items-center space-x-2">
          <InputWrapper
            label="Write Supplier Name"
            labelFor="search_supplier"
            error=""
          >
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSearchSupplier(e.target.value)
              }
              className="w-full md:w-[250px]"
              id="search_supplier"
              placeholder="Write supplier name for searching"
            />
          </InputWrapper>

          {/* ADD NEW PRODUCT */}
          <InputWrapper label="#" error="" labelFor="add_new_method">
            <Dialog open={addSupplierOpen} onOpenChange={setAddSupplierOpen}>
              <DialogTrigger asChild>
                <Button
                  className="group relative"
                  variant="outline"
                  size="icon"
                >
                  <LuPlus className="h-4 w-4" />
                  <span className="sr-only">Add New Supplier Button</span>
                  <span className="custom-tooltip-left">Add New Supplier</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[1000px] max-h-[90%] overflow-y-auto">
                {/* ADD NEW SUPPLIER FORM CONTAINER */}
                <AddSupplier setAddSupplierOpen={setAddSupplierOpen} />
              </DialogContent>
            </Dialog>
          </InputWrapper>
        </div>
      </div>
      <div>
        {/*  PRODUCT TABLE CONTAINER */}

        <InfoWrapper className="my-2" heading="Supplier Information">
          <DataTable columns={columns} data={supplierList} />
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

export default SupplierList;
