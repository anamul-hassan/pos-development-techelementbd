import InfoWrapper from "@/components/common/InfoWrapper";
import PaginationWrapper, {
  IPagination,
} from "@/components/common/PaginationWrapper";
import InputWrapper from "@/components/common/form/InputWrapper";
import DataLoader from "@/components/common/loader/DataLoader";
import { DataTable } from "@/components/common/table/DataTable";
import AddExpense from "@/components/dashboard/expense/AddExpense";
import EditExpense from "@/components/dashboard/expense/EditExpense";
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
  useDeleteExpenseMutation,
  useGetExpensesQuery,
} from "@/store/expense/expenseApi";
import { capitalizeEveryWord } from "@/utils/helpers/capitalizeEveryWord";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";

interface IExpenseListProps {}

const ExpenseList: FC<IExpenseListProps> = () => {
  const [actionItem, setActionItem] = useState<any>();
  const { toast } = useToast() as any;
  const [expenseSearch, setExpenseSearch] = useState("");
  // POPOVER STATES
  const [addExpenseOpen, setAddExpenseOpen] = useState(false);

  // BRAND LIST STATE
  const [expenseList, setExpenseList] = useState([]);
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
  // GET ALL EXPENSES QUERY
  const { data: expensesData, isLoading: expensesLoading } =
    useGetExpensesQuery({
      search: expenseSearch,
      page: pagination?.page,
      size: pagination?.size,
      sort: pagination?.sort,
    }) as any;

  // DELETE EXPENSE MUTATION
  const [deleteExpense, { isSuccess: deleteExpenseSuccess }] =
    useDeleteExpenseMutation({}) as any;

  useEffect(() => {
    if (expensesData?.data?.length > 0) {
      const customizeExpense = expensesData?.data?.map((singleExpense: any) => {
        return {
          ...singleExpense,
          dummyCategoryName: capitalizeEveryWord(singleExpense?.name),
        };
      });
      setExpenseList(customizeExpense);
      setPagination((previousData) => ({
        ...previousData,
        meta: expensesData?.meta,
      }));
    }
  }, [pagination.size, expensesData?.data, expensesData?.meta]);

  useEffect(() => {
    if (deleteExpenseSuccess) {
      toast({
        title: "Expense Delete Message",
        description: "Expense deleted successfully",
      });
    }
  }, [deleteExpenseSuccess, toast]);

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
              <DropdownMenuLabel>Expense Actions</DropdownMenuLabel>

              {/* EXPENSE UPDATE BUTTON */}
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
                <DialogContent className="sm:max-w-[800px] max-h-[90%] overflow-y-auto">
                  {/* EDIT EXPENSE FORM CONTAINER */}
                  <EditExpense actionItem={actionItem} />
                </DialogContent>
              </Dialog>

              {/* EXPENSE DELETE BUTTON */}
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
                      This expense will be delete permanently. Are you sure you
                      want to delete the expense?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="btn-destructive-fill">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => deleteExpense(category?.id)}
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

  // // EXPENSE DATA LOADER
  if (expensesLoading) {
    return <DataLoader />;
  }

  return (
    <section className="my-6">
      {/* UTILITY BUTTONS AND SEARCH CATEGORY FIELD */}
      <div className="flex justify-end items-end w-full">
        {/* SEARCH CATEGORY FILED */}
        <div className="flex justify-end items-center space-x-2">
          <InputWrapper
            label="Write Expense Name"
            labelFor="search_expense"
            error=""
          >
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setExpenseSearch(e.target.value)
              }
              className="w-full md:w-[250px]"
              id="search_expense"
              placeholder="Write expense name for searching"
            />
          </InputWrapper>
          <InputWrapper label="#" error="" labelFor="">
            <Dialog open={addExpenseOpen} onOpenChange={setAddExpenseOpen}>
              <DialogTrigger asChild>
                <Button
                  className="group relative"
                  variant="outline"
                  size="icon"
                >
                  <LuPlus className="h-4 w-4" />
                  <span className="sr-only">Add New Expense Button</span>
                  <span className="custom-tooltip-left">Add New Expense</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[800px] max-h-[90%] overflow-y-auto">
                {/* ADD EXPENSE FORM CONTAINER */}
                <AddExpense setAddExpenseOpen={setAddExpenseOpen} />
              </DialogContent>
            </Dialog>
          </InputWrapper>
        </div>
      </div>
      {/*  EXPENSE TABLE CONTAINER */}
      <InfoWrapper className="my-2" heading="Expense Information">
        <DataTable columns={columns} data={expenseList} />
      </InfoWrapper>
      {/* PAGINATION CONTAINER */}
      <PaginationWrapper
        pagination={pagination}
        setPagination={setPagination}
      />
    </section>
  );
};

export default ExpenseList;
