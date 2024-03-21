import InfoWrapper from "@/components/common/InfoWrapper";
import PaginationWrapper, {
  IPagination,
} from "@/components/common/PaginationWrapper";
import InputWrapper from "@/components/common/form/InputWrapper";
import DataLoader from "@/components/common/loader/DataLoader";
import { DataTable } from "@/components/common/table/DataTable";
import AddUser from "@/components/dashboard/user_management/user/AddUser";
import EditUser from "@/components/dashboard/user_management/user/EditUser";
import UserDetails from "@/components/dashboard/user_management/user/UserDetails";
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
import { useDeleteUserMutation, useGetUserQuery } from "@/store/user/userApi";
import { capitalizeEveryWord } from "@/utils/helpers/capitalizeEveryWord";
import { fullNameConverter } from "@/utils/helpers/fullNameConverter";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";

interface IUser {
  status: string;
  email: string;
  name: string;
  role: string;
  active: any;
}

const UserList = () => {
  const { toast } = useToast();
  // DIALOG STATE
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [actionItem, setActionItem] = useState<any>();
  // PRODUCT SEARCH INPUT STATE
  const [userSearch, setUserSearch] = useState("");
  // USER LIST DATA
  const [userList, setUserList] = useState([]);

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

  // GET USERS, SEARCH, SORTING, PAGE
  const { data: userData, isLoading: isLoadingUserGet } = useGetUserQuery({
    sort: pagination?.sort,
    page: pagination?.page,
    size: pagination?.size,
    search: userSearch,
  }) as any;

  // DELETE USER MUTATION
  const [deleteUser, { isSuccess: deleteUserSuccess }] = useDeleteUserMutation(
    {}
  ) as any;

  useEffect(() => {
    if (userData?.data?.length > 0) {
      const customizeUserData = userData?.data.map((singleUser: any) => {
        return {
          ...singleUser,
          dummyActive: singleUser?.active ? "Activate" : "Deactivate",
          dummyName:
            fullNameConverter(singleUser.firstName, singleUser.lastName) ||
            "Not Found",
          dummyRole: capitalizeEveryWord(singleUser?.role),
        };
      });
      setUserList(customizeUserData);
    }
  }, [userData?.data]);

  useEffect(() => {
    if (deleteUserSuccess) {
      toast({
        title: "User Delete Message",
        description: "User deleted successfully",
      });
    }
  }, [deleteUserSuccess, toast]);

  const columns: ColumnDef<IUser>[] = [
    {
      accessorKey: "dummyActive",
      header: "Status",
    },
    {
      accessorKey: "dummyName",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "dummyRole",
      header: "Role",
    },
    {
      header: "Action",
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const user = row.original as any;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                onMouseEnter={() => setActionItem(user)}
                variant="ghost"
                className="h-8 w-8 p-0"
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="flex flex-col gap-1">
              <DropdownMenuLabel>User Actions</DropdownMenuLabel>
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
                <DialogContent className="sm:max-w-[1200px] max-h-[90%] overflow-y-auto">
                  {/* EDIT USER FORM CONTAINER */}
                  <EditUser actionItem={actionItem} />
                </DialogContent>
              </Dialog>

              {/* USER DETAILS */}

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
                <DialogContent className="sm:max-w-[800px]">
                  {/* USER DETAILS FORM CONTAINER */}
                  <UserDetails actionItem={actionItem} />
                </DialogContent>
              </Dialog>

              {/* USER DELETE */}
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
                      This user will be delete permanently. Are you sure you
                      want to delete the user?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="btn-destructive-fill">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={() => deleteUser(user?.id)}>
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

  if (isLoadingUserGet) {
    return <DataLoader />;
  }

  return (
    <section className="my-6">
      {/* UTILITY BUTTONS AND SEARCH USER FIELD */}
      <div className="flex justify-end items-end w-full">
        {/* SEARCH USER FILED */}
        <div className="flex justify-end items-center space-x-2">
          <InputWrapper label="Write User Name" labelFor="search_user" error="">
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setUserSearch(e.target.value)
              }
              className="w-full md:w-[250px]"
              id="search_user"
              placeholder="Write user name for searching"
            />
          </InputWrapper>
          <InputWrapper label="#" error="" labelFor="">
            <Dialog open={addUserOpen} onOpenChange={setAddUserOpen}>
              <DialogTrigger asChild>
                <Button
                  className="group relative"
                  variant="outline"
                  size="icon"
                >
                  <LuPlus className="h-4 w-4" />
                  <span className="sr-only">Add New User Button</span>
                  <span className="custom-tooltip-left">Add New User</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[1200px] max-h-[90%] overflow-y-auto">
                {/* ADD NEW USER FORM CONTAINER */}
                <AddUser setAddUserOpen={setAddUserOpen} />
              </DialogContent>
            </Dialog>
          </InputWrapper>
        </div>
      </div>
      {/* USER TABLE CONTAINER */}

      <InfoWrapper className="my-2" heading=" User Information">
        <DataTable columns={columns} data={userList} />
      </InfoWrapper>
      {/* PAGINATION CONTAINER */}
      <PaginationWrapper
        pagination={pagination}
        setPagination={setPagination}
      />
    </section>
  );
};

export default UserList;
