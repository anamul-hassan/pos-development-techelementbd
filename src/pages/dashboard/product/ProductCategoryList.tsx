import InfoWrapper from "@/components/common/InfoWrapper";
import PaginationWrapper, {
  IPagination,
} from "@/components/common/PaginationWrapper";
import InputWrapper from "@/components/common/form/InputWrapper";
import DataLoader from "@/components/common/loader/DataLoader";
import { DataTable } from "@/components/common/table/DataTable";
import AddProductCategory from "@/components/dashboard/product/product_category/AddProductCategory";
import EditProductCategory from "@/components/dashboard/product/product_category/EditProductCategory";
import ProductCategoryDetails from "@/components/dashboard/product/product_category/ProductCategoryDetails";
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
  useDeleteProductCategoryMutation,
  useGetProductCategoriesQuery,
} from "@/store/product_category/productCategoryApi";

import { capitalizeEveryWord } from "@/utils/helpers/capitalizeEveryWord";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";

interface IProductCategoryListProps {}

const ProductCategoryList: FC<IProductCategoryListProps> = () => {
  const { toast } = useToast();
  // CATEGORY UPDATE STATE
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
  // INITIAL CATEGORY LIST
  const [categoryList, setCategoryList] = useState([]);
  // ADD CATEGORY DIALOG STATE
  const [addCategoryOpen, setAddCategoryOpen] = useState(false);
  // SEARCH CATEGORY INPUT STATE
  const [searchCategory, setSearchCategory] = useState("");
  // GET CATEGORY QUERY
  const { data: categoriesData, isLoading: categoriesLoading } =
    useGetProductCategoriesQuery({
      search: searchCategory,
      page: pagination?.page,
      size: pagination?.size,
    });
  // CATEGORY TABLE DATA
  useEffect(() => {
    if (categoriesData?.data?.length > 0) {
      const customizeSubCategory = categoriesData?.data?.map(
        (singleCategory: any) => ({
          ...singleCategory,
          categoryName: capitalizeEveryWord(singleCategory?.categoryName),
          dummyCategoryCode:
            singleCategory?.categoryCode?.toLowerCase() || "Not found",
        })
      );
      setCategoryList(customizeSubCategory);
      setPagination((previousState) => ({
        ...previousState,
        meta: categoriesData?.meta,
      }));
    }
  }, [categoriesData?.data, categoriesData?.meta]);

  const [deleteCategory, { isSuccess: isDeleteCategorySuccess }] =
    useDeleteProductCategoryMutation({}) as any;

  useEffect(() => {
    if (isDeleteCategorySuccess) {
      toast({
        title: "Category Delete Message",
        description: "Category deleted successfully",
      });
    }
  }, [isDeleteCategorySuccess, toast]);

  // CATEGORY ACTIONS AND CATEGORY TABLE COLUMNS
  const columns: ColumnDef<any>[] = [
    {
      size: 20,
      accessorKey: "categoryName",
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
      accessorKey: "dummyCategoryCode",
      header: " Code",
      size: 20,
    },
    {
      size: 5,
      header: "Action",
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const category = row.original as any;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0"
                onMouseEnter={() => {
                  setActionItem(category);
                }}
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="flex flex-col gap-1">
              <DropdownMenuLabel>Category Actions</DropdownMenuLabel>

              {/* EDIT CATEGORY CONTAINER */}

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
                  {/* EDIT CATEGORY FORM CONTAINER */}
                  <EditProductCategory actionItem={actionItem} />
                </DialogContent>
              </Dialog>
              {/* CATEGORY DETAILS CONTAINER */}
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
                  {/* EDIT CATEGORY FORM CONTAINER */}
                  <ProductCategoryDetails actionItem={actionItem} />
                </DialogContent>
              </Dialog>

              {/* DELETE CATEGORY BUTTON */}
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
                      This category will be delete permanently. Are you sure you
                      want to delete the category?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="btn-destructive-fill">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => deleteCategory(category?.id)}
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

  if (categoriesLoading) {
    return <DataLoader />;
  }
  return (
    <section>
      <div className="flex justify-end items-end w-full">
        {/* SEARCH CATEGORY  FILED */}
        <div className="flex justify-end items-center space-x-2">
          <InputWrapper
            label="Write Category Name"
            labelFor="search_category"
            error=""
          >
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSearchCategory(e.target.value)
              }
              className="w-full md:w-[250px]"
              id="search_category"
              placeholder="Write category for searching"
            />
          </InputWrapper>

          {/* ADD NEW CATEGORY */}
          <InputWrapper label="#" error="" labelFor="add_new_sub_category">
            <Dialog open={addCategoryOpen} onOpenChange={setAddCategoryOpen}>
              <DialogTrigger asChild>
                <Button
                  className="group relative"
                  variant="outline"
                  size="icon"
                >
                  <LuPlus className="h-4 w-4" />
                  <span className="sr-only">Add New Category Button</span>
                  <span className="custom-tooltip-left">Add New Category</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                {/* ADD NEW CATEGORY FORM CONTAINER */}
                <AddProductCategory setAddCategoryOpen={setAddCategoryOpen} />
              </DialogContent>
            </Dialog>
          </InputWrapper>
        </div>
      </div>
      <div>
        {/* CATEGORY TABLE CONTAINER */}
        <InfoWrapper className="my-2" heading="Product Category Information">
          <DataTable columns={columns} data={categoryList} />
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

export default ProductCategoryList;
