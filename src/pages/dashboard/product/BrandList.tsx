import InfoWrapper from "@/components/common/InfoWrapper";

import InputWrapper from "@/components/common/form/InputWrapper";
import DataLoader from "@/components/common/loader/DataLoader";
import { DataTable } from "@/components/common/table/DataTable";
import AddBrand from "@/components/dashboard/product/brand/AddBrand";
import EditBrand from "@/components/dashboard/product/brand/EditBrand";
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
  useDeleteBrandMutation,
  useGetBrandsQuery,
} from "@/store/brand/brandApi";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";

interface IBrandListProps {}

const BrandList: FC<IBrandListProps> = () => {
  const [actionItem, setActionItem] = useState<any>();
  const { toast } = useToast() as any;
  const [brandSearch, setBrandSearch] = useState("");
  // POPOVER STATES
  const [addBrandOpen, setAddBrandOpen] = useState(false);

  // BRAND LIST STATE
  const [brandList, setBrandList] = useState([]);

  // BRAND DATA
  const {
    data: brandData,

    isLoading: brandLoading,
  } = useGetBrandsQuery({
    search: brandSearch,
  });

  // DELETE BRAND MUTATION
  const [deleteBrand, { isSuccess: deleteBrandSuccess }] =
    useDeleteBrandMutation();

  useEffect(() => {
    if (brandData?.data?.length > 0) {
      const customizeBrands = brandData?.data?.map((singleBrand: any) => {
        return {
          ...singleBrand,
          dummyNote: singleBrand?.note || "Not Found",
        };
      });
      setBrandList(customizeBrands);
    }
  }, [brandData?.data]);

  useEffect(() => {
    // BRAND DELETE MESSAGE
    if (deleteBrandSuccess) {
      toast({
        title: "Brand Delete Message",
        description: "Brand deleted successfully",
      });
    }
  }, [toast, deleteBrandSuccess]);

  //  BRAND TABLE
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "brand",
      header: ({ column }) => {
        return (
          <button
            className="flex items-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Brand
            <ArrowUpDown className="ml-1 size-3" />
          </button>
        );
      },
    },
    {
      accessorKey: "dummyNote",
      header: "Note",
    },

    {
      size: 10,
      header: "Action",
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const brand = row.original as any;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                onMouseEnter={() => setActionItem(brand)}
                variant="ghost"
                className="h-8 w-8 p-0"
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="flex flex-col gap-1">
              <DropdownMenuLabel>Brand Actions</DropdownMenuLabel>

              {/* BRAND UPDATE BUTTON */}
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
                  {/* EDIT BRAND FORM CONTAINER */}
                  <EditBrand actionItem={actionItem} />
                </DialogContent>
              </Dialog>

              {/* VARIATION SIZE DELETE BUTTON */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    size="xs"
                    className="w-full flex justify-start"
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
                      This brand will be delete permanently. Are you sure you
                      want to delete the brand?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="btn-destructive-fill">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={() => deleteBrand(brand?.id)}>
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

  if (brandLoading) {
    return <DataLoader />;
  }

  return (
    <section>
      {/* UTILITY BUTTONS AND SEARCH BRAND FIELD */}
      <div className="flex justify-end items-end w-full">
        {/* SEARCH BRAND FILED */}
        <div className="flex justify-end items-center space-x-2">
          <InputWrapper
            label="Write Brand Name"
            labelFor="search_brand"
            error=""
          >
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setBrandSearch(e.target.value)
              }
              className="w-full md:w-[250px]"
              id="search_brand"
              placeholder="Write brand name for searching"
            />
          </InputWrapper>
          <InputWrapper label="#" error="" labelFor="">
            <Dialog open={addBrandOpen} onOpenChange={setAddBrandOpen}>
              <DialogTrigger asChild>
                <Button
                  className="group relative"
                  variant="outline"
                  size="icon"
                >
                  <LuPlus className="h-4 w-4" />
                  <span className="sr-only">Add New Brand Button</span>
                  <span className="custom-tooltip-top">Add New Brand</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                {/* ADD BRAND FORM CONTAINER */}
                <AddBrand setAddBrandOpen={setAddBrandOpen} />
              </DialogContent>
            </Dialog>
          </InputWrapper>
        </div>
      </div>
      {/*  BRAND TABLE CONTAINER */}
      <InfoWrapper className="my-2" heading="Brand Information">
        <DataTable columns={columns} data={brandList} />
      </InfoWrapper>
    </section>
  );
};

export default BrandList;
