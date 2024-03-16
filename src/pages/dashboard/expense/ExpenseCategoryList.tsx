import InputWrapper from "@/components/common/form/InputWrapper";
import DataLoader from "@/components/common/loader/DataLoader";
import { ColumnDef } from "@tanstack/react-table";
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
import { ChangeEvent, useEffect, useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { LuPlus } from "react-icons/lu";
import { DataTable } from "@/components/common/table/DataTable";
import PaginationWrapper, {
  IPagination,
} from "@/components/common/PaginationWrapper";
import InfoWrapper from "@/components/common/InfoWrapper";
import { capitalizeEveryWord } from "@/utils/helpers/capitalizeEveryWord";
import {
  useDeleteExpenseCategoryMutation,
  useGetAllExpenseCategoryQuery,
} from "@/store/expense_category/expenseCategoryApi";
import AddExpenseCategory from "@/components/dashboard/expense/expense_category/AddExpenseCategory";
import EditExpenseCategory from "@/components/dashboard/expense/expense_category/EditExpenseCategory";

const ExpenseCategoryList = () => {
  const [actionItem, setActionItem] = useState<any>();
  const { toast } = useToast() as any;
  const [categorySearch, setCategorySearch] = useState("");
  // POPOVER STATES
  const [addCategoryOpen, setAddCategoryOpen] = useState(false);

  // BRAND LIST STATE
  const [categoryList, setCategoryList] = useState([]);
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

  // GET EXPENSE CATEGORY QUERY
  const { data: expenseCategories, isLoading: expenseCategoryLoading } =
    useGetAllExpenseCategoryQuery({
      page: pagination?.page,
      size: pagination?.size,
      search: categorySearch,
    });
  // DELETE CATEGORY MUTATION
  const [deleteCategory, { isSuccess: deleteCategorySuccess }] =
    useDeleteExpenseCategoryMutation();

  useEffect(() => {
    if (expenseCategories?.data?.length > 0) {
      const category = expenseCategories?.data?.map((singleCategory: any) => {
        return {
          ...singleCategory,
          dummyCategoryName: capitalizeEveryWord(singleCategory?.name),
        };
      });
      setCategoryList(category);
      setPagination((previousData) => ({
        ...previousData,
        meta: expenseCategories?.meta,
      }));
    }
  }, [pagination.size, expenseCategories?.data, expenseCategories?.meta]);

  useEffect(() => {
    if (deleteCategorySuccess) {
      toast({
        title: "Category Delete Message",
        description: "Category deleted successfully",
      });
    }
  }, [deleteCategorySuccess, toast]);

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "dummyCategoryName",
      header: "Category Name",
    },
    {
      header: "Action",
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const category = row.original as any;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                onMouseEnter={() => setActionItem(category)}
                variant="ghost"
                className="h-8 w-8 p-0"
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="flex flex-col gap-1">
              <DropdownMenuLabel>Category Actions</DropdownMenuLabel>

              {/* EXPENSE CATEGORY UPDATE BUTTON */}
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
                  <EditExpenseCategory actionItem={actionItem} />
                </DialogContent>
              </Dialog>

              {/* EXPENSE CATEGORY DELETE BUTTON */}
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

  // CATEGORY DATA LOADER
  if (expenseCategoryLoading) {
    return <DataLoader />;
  }

  return (
    <section className="my-6">
      {/* UTILITY BUTTONS AND SEARCH CATEGORY FIELD */}
      <div className="flex justify-end items-end w-full">
        {/* SEARCH CATEGORY FILED */}
        <div className="flex justify-end items-center space-x-2">
          <InputWrapper
            label="Write Category Name"
            labelFor="search_category"
            error=""
          >
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCategorySearch(e.target.value)
              }
              className="w-full md:w-[250px]"
              id="search_category"
              placeholder="Write category name for searching"
            />
          </InputWrapper>
          <InputWrapper label="#" error="" labelFor="add_new_method">
            <Dialog open={addCategoryOpen} onOpenChange={setAddCategoryOpen}>
              <DialogTrigger asChild>
                <Button
                  className="group relative"
                  variant="outline"
                  size="icon"
                >
                  <LuPlus className="h-4 w-4" />
                  <span className="sr-only">Add New Category Button</span>
                  <span className="custom-tooltip-left">
                    Add New Expense Category
                  </span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                {/* ADD CATEGORY FORM CONTAINER */}
                <AddExpenseCategory setAddCategoryOpen={setAddCategoryOpen} />
              </DialogContent>
            </Dialog>
          </InputWrapper>
        </div>
      </div>
      {/*  CATEGORY TABLE CONTAINER */}
      <InfoWrapper className="my-2" heading="Expense Category Information">
        <DataTable columns={columns} data={categoryList} />
      </InfoWrapper>
      {/* PAGINATION CONTAINER */}
      <PaginationWrapper
        pagination={pagination}
        setPagination={setPagination}
      />
    </section>
  );
};

export default ExpenseCategoryList;
