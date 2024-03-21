import { ChangeEvent, useEffect, useState } from "react";
import {
  useDeleteBranchMutation,
  useGetBranchesQuery,
} from "@/store/branch/branchApi";
import { useToast } from "@/components/ui/use-toast";
import DataLoader from "@/components/common/loader/DataLoader";
import InputWrapper from "@/components/common/form/InputWrapper";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { LuPlus } from "react-icons/lu";
import InfoWrapper from "@/components/common/InfoWrapper";
import { DataTable } from "@/components/common/table/DataTable";
import PaginationWrapper, {
  IPagination,
} from "@/components/common/PaginationWrapper";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { capitalizeEveryWord } from "@/utils/helpers/capitalizeEveryWord";
import EditBranch from "@/components/dashboard/user_management/branch/EditBranch";
import AddBranch from "@/components/dashboard/user_management/branch/AddBranch";

interface IBranch {
  branchName: string;
  branchLocation: string;
}

const BranchList = () => {
  // DIALOG STATE
  const [addBranchOpen, setAddBranchOpen] = useState(false);
  //    BRANCH LIST DATA
  const [branchList, setBranchList] = useState([]);
  const [actionItem, setActionItem] = useState<any>();
  // PRODUCT SEARCH INPUT STATE
  const [branchSearch, setBranchSearch] = useState("");
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

  //    BRANCH DELETE MUTATION
  const [deleteBranch, { isSuccess: deleteBranchSuccess }] =
    useDeleteBranchMutation() as any;

  const { data: branchData, isLoading: isGetBranchLoading } =
    useGetBranchesQuery({
      page: pagination?.page,
      size: pagination?.size,
      search: branchSearch,
      sort: pagination?.sort,
    });

  // BRANCH TABLE DATA
  useEffect(() => {
    if (branchData?.data?.length > 0) {
      const customizeBranches = branchData?.data?.map((singleBranch: any) => {
        return {
          ...singleBranch,
          branchLocation: capitalizeEveryWord(singleBranch?.branchLocation),
        };
      });
      setBranchList(customizeBranches);
      setPagination((previousData) => ({
        ...previousData,
        meta: branchData?.meta,
      }));
    }
  }, [branchData?.data, branchData?.meta]);

  useEffect(() => {
    if (deleteBranchSuccess) {
      toast({
        title: "Branch Delete Message",
        description: "Branch deleted successfully",
      });
    }
  }, [deleteBranchSuccess, toast]);

  const columns: ColumnDef<IBranch>[] = [
    {
      accessorKey: "branchName",
      header: "Branch Name",
    },
    {
      accessorKey: "branchLocation",
      header: "Branch Location",
    },

    {
      header: "Action",
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const branch = row.original as any;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                onMouseEnter={() => setActionItem(branch)}
                variant="ghost"
                className="h-8 w-8 p-0"
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="flex flex-col gap-1">
              <DropdownMenuLabel>Branch Actions</DropdownMenuLabel>
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
                  {/* EDIT BRANCH FORM CONTAINER */}
                  <EditBranch actionItem={actionItem} />
                </DialogContent>
              </Dialog>

              {/* BRANCH DELETE */}
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
                      This branch will be delete permanently. Are you sure you
                      want to delete the branch?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="btn-destructive-fill">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={() => deleteBranch(branch?.id)}>
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

  if (isGetBranchLoading) {
    return <DataLoader />;
  }

  return (
    <section className="my-6">
      {/* UTILITY BUTTONS AND SEARCH BRANCH FIELD */}
      <div className="flex justify-end items-end w-full">
        {/* SEARCH BRANCH FILED */}
        <div className="flex justify-end items-center space-x-2">
          <InputWrapper
            label="Write Branch Name"
            labelFor="search_branch"
            error=""
          >
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setBranchSearch(e.target.value)
              }
              className="w-full md:w-[250px]"
              id="search_branch"
              placeholder="Write branch name for searching"
            />
          </InputWrapper>
          <InputWrapper label="#" error="" labelFor="">
            <Dialog open={addBranchOpen} onOpenChange={setAddBranchOpen}>
              <DialogTrigger asChild>
                <Button
                  className="group relative"
                  variant="outline"
                  size="icon"
                >
                  <LuPlus className="h-4 w-4" />
                  <span className="sr-only">Add New Branch Button</span>
                  <span className="custom-tooltip-left">Add New Branch</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                {/* ADD NEW BRANCH FORM CONTAINER */}
                <AddBranch setAddBranchOpen={setAddBranchOpen} />
              </DialogContent>
            </Dialog>
          </InputWrapper>
        </div>
      </div>
      {/* BRANCH TABLE CONTAINER */}
      <InfoWrapper className="my-2" heading="Branch Information">
        <DataTable columns={columns} data={branchList} />
      </InfoWrapper>
      {/* PAGINATION CONTAINER */}
      <PaginationWrapper
        pagination={pagination}
        setPagination={setPagination}
      />
    </section>
  );
};

export default BranchList;
