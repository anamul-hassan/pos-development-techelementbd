import InfoWrapper from "@/components/common/InfoWrapper";
import InputWrapper from "@/components/common/form/InputWrapper";
import DataLoader from "@/components/common/loader/DataLoader";
import { DataTable } from "@/components/common/table/DataTable";
import AddWarranty from "@/components/dashboard/product/warranty/AddWarranty";
import EditWarranty from "@/components/dashboard/product/warranty/EditWarranty";
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
  useDeleteWarrantyMutation,
  useGetWarrantiesQuery,
} from "@/store/warranty/warrantyApi";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";

interface IWarrantyListProps {}

const WarrantyList: FC<IWarrantyListProps> = () => {
  const [actionItem, setActionItem] = useState<any>();
  const { toast } = useToast() as any;
  const [warrantySearch, setWarrantySearch] = useState("");
  // POPOVER STATES
  const [addWarrantyOpen, setAddWarrantyOpen] = useState(false);

  // BRAND LIST STATE
  const [warrantyList, setWarrantyList] = useState([]);
  // GET WARRANTY DATA QUERY
  const { data: warrantiesData, isLoading: isWarrantyLoading } =
    useGetWarrantiesQuery({
      search: warrantySearch,
    }) as any;
  // WARRANTY DELETE MUTATION
  const [deleteWarranty, { isSuccess: deleteWarrantySuccess }] =
    useDeleteWarrantyMutation({}) as any;

  useEffect(() => {
    if (warrantiesData?.data?.length > 0) {
      setWarrantyList(warrantiesData?.data);
    }
  }, [warrantiesData?.data]);

  useEffect(() => {
    if (deleteWarrantySuccess) {
      toast({
        title: "Warranty Delete Message",
        description: "Warranty deleted successfully",
      });
    }
  }, [toast, deleteWarrantySuccess]);

  //  WARRANTY COLUMN
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "warranty",
      header: ({ column }) => {
        return (
          <button
            className="flex items-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Warranty Title
            <ArrowUpDown className="ml-1 size-3" />
          </button>
        );
      },
    },
    {
      accessorKey: "warrantyType",
      header: "Warranty Type",
    },

    {
      header: "Action",
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const warranty = row.original as any;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                onMouseEnter={() => setActionItem(warranty)}
                variant="ghost"
                className="h-8 w-8 p-0"
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="flex flex-col gap-1">
              <DropdownMenuLabel>Warranty Actions</DropdownMenuLabel>

              {/* WARRANTY UPDATE BUTTON */}
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
                <DialogContent>
                  {/* EDIT UNIT FORM CONTAINER */}
                  <EditWarranty actionItem={actionItem} />
                </DialogContent>
              </Dialog>

              {/* WARRANTY DELETE BUTTON */}
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
                      This warranty will be delete permanently. Are you sure you
                      want to delete the warranty?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="btn-destructive-fill">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => deleteWarranty(warranty?.id)}
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

  // WARRANTY DATA LOADER
  if (isWarrantyLoading) {
    return <DataLoader />;
  }

  return (
    <section>
      {/* UTILITY BUTTONS AND SEARCH WARRANTY FIELD */}
      <div className="flex justify-end items-end w-full">
        {/* SEARCH WARRANTY FILED */}
        <div className="flex justify-end items-center space-x-2">
          <InputWrapper
            label="Write Warranty Name"
            labelFor="search_warranty"
            error=""
          >
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setWarrantySearch(e.target.value)
              }
              className="w-full md:w-[250px]"
              id="search_warranty"
              placeholder="Write warranty name for searching"
            />
          </InputWrapper>
          <InputWrapper label="#" error="" labelFor="">
            <Dialog open={addWarrantyOpen} onOpenChange={setAddWarrantyOpen}>
              <DialogTrigger asChild>
                <Button
                  className="group relative"
                  variant="outline"
                  size="icon"
                >
                  <LuPlus className="h-4 w-4" />
                  <span className="sr-only">Add New Warranty Button</span>
                  <span className="custom-tooltip-top">Add New Warranty</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                {/* ADD WARRANTY FORM CONTAINER */}
                <AddWarranty setAddWarrantyOpen={setAddWarrantyOpen} />
              </DialogContent>
            </Dialog>
          </InputWrapper>
        </div>
      </div>
      {/*  WARRANTY TABLE CONTAINER */}
      <InfoWrapper className="my-2" heading="Warranty Information">
        <DataTable columns={columns} data={warrantyList} />
      </InfoWrapper>
    </section>
  );
};

export default WarrantyList;
