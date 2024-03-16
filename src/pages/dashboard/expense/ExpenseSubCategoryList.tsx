/* eslint-disable react-refresh/only-export-components */
import { ChangeEvent, useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import DataLoader from "@/components/common/loader/DataLoader";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/common/table/DataTable";

import { Button } from "@/components/ui/button";
import InputWrapper from "@/components/common/form/InputWrapper";
import { Input } from "@/components/ui/input";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { LuPlus } from "react-icons/lu";
import PaginationWrapper, {
  IPagination,
} from "@/components/common/PaginationWrapper";
import InfoWrapper from "@/components/common/InfoWrapper";
import { capitalizeEveryWord } from "@/utils/helpers/capitalizeEveryWord";
import { MoreHorizontal } from "lucide-react";
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

import {
  useDeleteExpenseSubCategoryMutation,
  useGetExpenseSubCategoriesQuery,
} from "@/store/expense_sub_category/expense_sub_category";
import EditExpenseSubCategory from "@/components/dashboard/expense/expense_sub_category/EditExpenseSubCategory";
import AddExpenseSubCategory from "@/components/dashboard/expense/expense_sub_category/AddExpenseSubCategory";

const ExpenseSubCategoryList = () => {
  // DIALOG STATE
  const [addSubCategoryOpen, setAddSubCategoryOpen] = useState(false);
  const [actionItem, setActionItem] = useState<any>();
  // SUB-CATEGORY SEARCH INPUT STATE
  const [subCategorySearch, setSubCategorySearch] = useState("");
  // SUB-CATEGORY LIST DATA STATE
  const [subCategoryList, setSubCategoryList] = useState([]);
  const { toast } = useToast() as any;
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

  // GET EXPENSE SUB-CATEGORY QUERY
  const { data: getSubCategories, isLoading: subCategoryLoading } =
    useGetExpenseSubCategoriesQuery({
      sort: pagination?.sort,
      page: pagination?.page,
      size: pagination?.size,
      search: subCategorySearch,
    });

  const [deleteSubCategory, { isSuccess: deleteSubCategorySuccess }] =
    useDeleteExpenseSubCategoryMutation() as any;

  // USER TABLE DATA
  useEffect(() => {
    if (getSubCategories?.data?.length > 0) {
      const customizeSubCategory = getSubCategories?.data?.map(
        (singleSubCategory: any) => {
          return {
            ...singleSubCategory,

            dummyCategoryName: capitalizeEveryWord(
              singleSubCategory?.expenseCategory?.name
            ),
            dummySubCategoryName: capitalizeEveryWord(singleSubCategory?.name),
          };
        }
      );
      setSubCategoryList(customizeSubCategory);
      setPagination((previousData) => ({
        ...previousData,
        meta: getSubCategories?.meta,
      }));
    }
  }, [pagination.size, getSubCategories?.data, getSubCategories?.meta]);

  useEffect(() => {
    if (deleteSubCategorySuccess) {
      toast({
        title: "Sub-category Delete Message",
        description: "Sub-category deleted successfully",
      });
    }
  }, [deleteSubCategorySuccess, toast]);

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "dummyCategoryName",
      header: "Category Name",
    },
    {
      accessorKey: "dummySubCategoryName",
      header: "Sub-category Name",
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
                onMouseEnter={() => setActionItem(subCategory)}
                variant="ghost"
                className="h-8 w-8 p-0"
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="flex flex-col gap-1">
              <DropdownMenuLabel>Sub-category Actions</DropdownMenuLabel>
              {/* EDIT PRODUCT INFORMATION */}
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
                  {/* EDIT EXPENSE SUB CATEGORY FORM CONTAINER */}
                  <EditExpenseSubCategory actionItem={actionItem} />
                </DialogContent>
              </Dialog>

              {/* SUB CATEGORY DELETE */}
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
    <section className="my-6">
      {/* UTILITY BUTTONS AND SEARCH EXPENSE SUB-CATEGORY FIELD */}
      <div className="flex justify-end items-end w-full">
        {/* SEARCH USER FILED */}
        <div className="flex justify-end items-center space-x-2">
          <InputWrapper
            label="Write Sub-category Name"
            labelFor="search_sub_category"
            error=""
          >
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSubCategorySearch(e.target.value)
              }
              className="w-full md:w-[250px]"
              id="search_sub_category"
              placeholder="Write sub-category name for searching"
            />
          </InputWrapper>
          <InputWrapper label="#" error="" labelFor="">
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
                  <span className="sr-only">Add New Sub Category Button</span>
                  <span className="custom-tooltip-left">
                    Add New Sub Category
                  </span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                {/* ADD NEW EXPENSE SUB CATEGORY FORM CONTAINER */}
                <AddExpenseSubCategory
                  setAddSubCategoryOpen={setAddSubCategoryOpen}
                />
              </DialogContent>
            </Dialog>
          </InputWrapper>
        </div>
      </div>
      {/* EXPENSE SUB-CATEGORY TABLE CONTAINER */}

      <InfoWrapper className="my-2" heading="Expense Sub-category Information">
        <DataTable columns={columns} data={subCategoryList} />
      </InfoWrapper>
      {/* PAGINATION CONTAINER */}
      <PaginationWrapper
        pagination={pagination}
        setPagination={setPagination}
      />
    </section>
  );
};

export default ExpenseSubCategoryList;
