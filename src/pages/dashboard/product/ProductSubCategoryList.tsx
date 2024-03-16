import InfoWrapper from "@/components/common/InfoWrapper";
import PaginationWrapper, {
  IPagination,
} from "@/components/common/PaginationWrapper";
import InputWrapper from "@/components/common/form/InputWrapper";
import DataLoader from "@/components/common/loader/DataLoader";
import { DataTable } from "@/components/common/table/DataTable";
import AddProductSubCategory from "@/components/dashboard/product/product_sub_category/AddProductSubCategory";
import EditProductSubCategory from "@/components/dashboard/product/product_sub_category/EditProductSubCategory";
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
  useDeleteProductSubCategoryMutation,
  useGetProductSubCategoriesQuery,
} from "@/store/product_sub_category/productSubCategoryApi";
import { capitalizeEveryWord } from "@/utils/helpers/capitalizeEveryWord";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";

interface IProductSupCategoryListProps {}

const ProductSubCategoryList: FC<IProductSupCategoryListProps> = () => {
  const { toast } = useToast();
  // SUB-CATEGORY UPDATE STATE
  const [actionItem, setActionItem] = useState<any>();
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
  // INITIAL SUB-CATEGORY LIST
  const [subCategoryList, setSubCategoryList] = useState([]);
  // ADD SUB-CATEGORY DIALOG STATE
  const [addSubCategoryOpen, setAddSubCategoryOpen] = useState(false);
  // SEARCH SUB-CATEGORY INPUT STATE
  const [searchSubCategory, setSearchSubCategory] = useState("");
  // GET SUB-CATEGORY QUERY
  const { data: subCategoryData, isLoading: subCategoryLoading } =
    useGetProductSubCategoriesQuery({
      search: searchSubCategory,
      page: pagination?.page,
      size: pagination?.size,
    });

  // SUB-CATEGORY TABLE DATA
  useEffect(() => {
    if (subCategoryData?.data?.length > 0) {
      const customizeSubCategory = subCategoryData?.data?.map(
        (singleSubCategory: any) => ({
          ...singleSubCategory,
          subCategoryName: capitalizeEveryWord(
            singleSubCategory?.subCategoryName
          ),
          category: {
            ...singleSubCategory?.category,
            categoryName: capitalizeEveryWord(
              singleSubCategory?.category?.categoryName
            ),
          },
        })
      );
      setSubCategoryList(customizeSubCategory);
      setPagination((previousState) => ({
        ...previousState,
        meta: subCategoryData?.meta,
      }));
    }
  }, [subCategoryData?.data, subCategoryData?.meta]);

  const [deleteSubCategory, { isSuccess: isDeleteSubCategorySuccess }] =
    useDeleteProductSubCategoryMutation({}) as any;

  useEffect(() => {
    if (isDeleteSubCategorySuccess) {
      toast({
        title: "Sub-category Delete Message",
        description: "Sub-category deleted successfully",
      });
    }
  }, [isDeleteSubCategorySuccess, toast]);

  // SUB-CATEGORY ACTIONS AND SUB-CATEGORY TABLE COLUMNS
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "subCategoryName",
      header: ({ column }) => {
        return (
          <button
            className="flex items-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Sub-category Name
            <ArrowUpDown className="ml-1 size-3" />
          </button>
        );
      },
    },
    {
      accessorKey: "category.categoryName",
      header: ({ column }) => {
        return (
          <button
            className="flex items-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Category Name
            <ArrowUpDown className="ml-1 size-3" />
          </button>
        );
      },
    },

    {
      header: "Action",
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const subCategory = row.original as any;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0"
                onMouseEnter={() => {
                  setActionItem(subCategory);
                }}
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="flex flex-col gap-1">
              <DropdownMenuLabel>Sub-category Actions</DropdownMenuLabel>

              {/* EDIT SUB-CATEGORY CONTAINER */}

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
                  {/* EDIT SUB-CATEGORY FORM CONTAINER */}
                  <EditProductSubCategory actionItem={actionItem} />
                </DialogContent>
              </Dialog>

              {/* DELETE SUB-CATEGORY BUTTON */}
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
                      This sub-category will be delete permanently. Are you sure
                      you want to delete the sub-category?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="btn-destructive-fill">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => deleteSubCategory(subCategory?.id)}
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

  if (subCategoryLoading) {
    return <DataLoader />;
  }
  return (
    <section>
      <div className="flex justify-end items-end w-full">
        {/* SEARCH SUBCATEGORY  FILED */}
        <div className="flex justify-end items-center space-x-2">
          <InputWrapper
            label="Write Sub-category Name"
            labelFor="search_sub_category"
            error=""
          >
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSearchSubCategory(e.target.value)
              }
              className="w-full md:w-[250px]"
              id="search_sub_category"
              placeholder="Write sub-category name for searching"
            />
          </InputWrapper>

          {/* ADD NEW SUB-CATEGORY */}
          <InputWrapper label="#" error="" labelFor="add_new_sub_category">
            <Dialog
              open={addSubCategoryOpen}
              onOpenChange={setAddSubCategoryOpen}
            >
              <DialogTrigger asChild>
                <Button
                  className="group relative"
                  variant="outline"
                  size="icon"
                >
                  <LuPlus className="h-4 w-4" />
                  <span className="sr-only">Add New Sub-category Button</span>
                  <span className="custom-tooltip-left">
                    Add New Sub-category
                  </span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                {/* ADD NEW SUB-CATEGORY FORM CONTAINER */}
                <AddProductSubCategory
                  setAddSubCategoryOpen={setAddSubCategoryOpen}
                />
              </DialogContent>
            </Dialog>
          </InputWrapper>
        </div>
      </div>
      <div>
        {/*  SUB-CATEGORY TABLE CONTAINER */}
        <InfoWrapper
          className="my-2"
          heading="Product Sub-category Information"
        >
          <DataTable columns={columns} data={subCategoryList} />
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

export default ProductSubCategoryList;
