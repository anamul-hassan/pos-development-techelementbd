import InfoWrapper from "@/components/common/InfoWrapper";
import InputWrapper from "@/components/common/form/InputWrapper";
import DataLoader from "@/components/common/loader/DataLoader";
import { DataTable } from "@/components/common/table/DataTable";
import AddProductUnit from "@/components/dashboard/product/product_unit/AddProductUnit";
import EditProductUnit from "@/components/dashboard/product/product_unit/EditProductUnit";
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
import { useDeleteUnitMutation, useGetUnitsQuery } from "@/store/unit/unitApi";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";

interface IProductUnitListProps {}

const ProductUnitList: FC<IProductUnitListProps> = () => {
  const [addUnitOpen, setAddUnitOpen] = useState(false);
  const { toast } = useToast();
  const [actionItem, setActionItem] = useState<any>();
  const [unitSearch, setUnitSearch] = useState("");
  // UNIT LIST STATE
  const [unitList, setUnitList] = useState([]);

  const { data: units, isLoading: unitLoading } = useGetUnitsQuery({
    search: unitSearch,
  }) as any;

  const [deleteUnit, { isSuccess: deleteUnitSuccess }] = useDeleteUnitMutation(
    {}
  ) as any;

  useEffect(() => {
    if (units?.data?.length > 0) {
      setUnitList(units?.data);
    }
  }, [units?.data]);

  useEffect(() => {
    if (deleteUnitSuccess) {
      toast({
        title: "Unit Delete Message",
        description: "Unit deleted successfully",
      });
    }
  }, [deleteUnitSuccess, toast]);

  //  UNIT COLUMN
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <button
            className="flex items-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Unit Name
            <ArrowUpDown className="ml-1 size-3" />
          </button>
        );
      },
    },
    {
      accessorKey: "shortName",
      header: "Short Name",
    },
    {
      accessorKey: "allowDecimal",
      header: "Allow Decimal",
    },

    {
      header: "Action",
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const unit = row.original as any;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                onMouseEnter={() => setActionItem(unit)}
                variant="ghost"
                className="h-8 w-8 p-0"
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="flex flex-col gap-1">
              <DropdownMenuLabel>Unit Actions</DropdownMenuLabel>

              {/* UNIT UPDATE BUTTON */}
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
                  <EditProductUnit actionItem={actionItem} />
                </DialogContent>
              </Dialog>

              {/* VARIATION SIZE DELETE BUTTON */}
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
                      This unit will be delete permanently. Are you sure you
                      want to delete the unit?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="btn-destructive-fill">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      disabled={deleteUnitSuccess}
                      onClick={() => deleteUnit(unit?.id)}
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

  if (unitLoading) {
    return <DataLoader />;
  }

  return (
    <section className="my-6">
      {/* UTILITY BUTTONS AND SEARCH VARIATION FIELD */}
      <div className="flex justify-end items-end w-full">
        {/* SEARCH UNIT FILED */}
        <div className="flex justify-end items-center space-x-2">
          <InputWrapper label="Write Unit Name" labelFor="search_unit" error="">
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setUnitSearch(e.target.value)
              }
              className="w-full md:w-[250px]"
              id="search_unit"
              placeholder="Write unit name for searching"
            />
          </InputWrapper>
          <InputWrapper label="#" error="" labelFor="">
            <Dialog open={addUnitOpen} onOpenChange={setAddUnitOpen}>
              <DialogTrigger asChild>
                <Button
                  className="group relative"
                  variant="outline"
                  size="icon"
                >
                  <LuPlus className="h-4 w-4" />
                  <span className="sr-only">Add New Unit Button</span>
                  <span className="custom-tooltip-top">Add New Unit</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                {/* ADD UNIT FORM CONTAINER */}
                <AddProductUnit setAddUnitOpen={setAddUnitOpen} />
              </DialogContent>
            </Dialog>
          </InputWrapper>
        </div>
      </div>
      {/*  UNIT TABLE CONTAINER */}
      <InfoWrapper className="my-2" heading=" Unit Information">
        <DataTable columns={columns} data={unitList} />
      </InfoWrapper>
    </section>
  );
};
export default ProductUnitList;
