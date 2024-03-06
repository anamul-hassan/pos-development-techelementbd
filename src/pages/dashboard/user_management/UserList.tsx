import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import DataLoader from "@/components/common/loader/DataLoader";
import Pagination from "@/components/previous/all/Pagination";
import { useSearchCustomerQuery } from "@/store/customer/customerApi";
import {
  useDeleteUserMutation,
  useGetUserQuery,
  useUpdateUserMutation,
} from "@/store/user/userApi";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/common/table/DataTable";
import { fullNameConverter } from "@/utils/helpers/fullNameConverter";
import { Button } from "@/components/ui/button";
import InputWrapper from "@/components/common/form/InputWrapper";
import { Command } from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAppContext } from "@/context/hook/useAppContext";
import { ChevronsUpDown, MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import ButtonLoader from "@/components/common/loader/ButtonLoader";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface IUser {
  status: string;
  email: string;
  name: string;
  role: string;
  active: any;
}

export const columns: ColumnDef<IUser>[] = [
  {
    accessorKey: "active",
    header: "Status",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
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
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="flex flex-col gap-1">
            <DropdownMenuLabel>User Actions</DropdownMenuLabel>
            <Link to={`../edit_user/${user.id}`}>
              <Button
                variant="outline"
                className="w-full flex justify-start"
                size="xs"
              >
                Edit
              </Button>
            </Link>

            <Link to={`../edit_user/${user.id}`}>
              <Button
                variant="outline"
                className="w-full flex justify-start"
                size="xs"
              >
                View Details
              </Button>
            </Link>
            <Button
              variant="destructive"
              className="w-full flex justify-start"
              size="xs"
            >
              Delete User
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const UserList = () => {
  // APP CONTEXT
  const { sidebarOpen } = useAppContext();
  // POPOVER STATES
  const [userOpen, setUserOpen] = useState(false);
  // const [productValue, setProductValue] = useState("");

  const { toast } = useToast() as any;
  const [currentPage, setCurrentPage] = useState(1);

  // const [userSearch, setUserSearch] = useState("");
  // const { data: branchData } = useGetBranchesQuery(undefined) as any;

  // GET USERS, SEARCH, SORTING, PAGE
  const { data: userData, isLoading: isLoadingUserGet } = useGetUserQuery(
    undefined
  ) as any;

  const [userList, setUserList] = useState([]);

  const { data: searchUser, isLoading: isUserSearching } =
    useSearchCustomerQuery({
      // search: userSearch,
      size: 5,
      page: currentPage,
    }) as any;

  useEffect(() => {
    if (userData?.data?.length > 0) {
      const customizeUserData = userData?.data.map((singleUser: any) => {
        return {
          ...singleUser,
          active: singleUser?.active ? "Activate" : "Deactivate",
          name: fullNameConverter(singleUser.firstName, singleUser.lastName),
          role:
            singleUser?.role?.charAt(0).toUpperCase() +
            singleUser?.role?.slice(1).toLowerCase(),
        };
      });
      setUserList(customizeUserData);
    }
  }, [userData]);

  // Delete user
  const [
    // deleteUser,
    { isSuccess: isDeleteUser },
  ] = useDeleteUserMutation({}) as any;

  const [, { data: updated, isSuccess: isUpdateUser }] = useUpdateUserMutation(
    {}
  );

  // User Activate
  // const handleUserActive = async (id: any) => {
  //   try {
  //     const result = (await updateUserActive({
  //       id,
  //       data: { active: true },
  //     })) as any;
  //     if (result?.data?.success === true) {
  //       toast({
  //         title: "Activation Message",
  //         description: result?.data?.message,
  //       });
  //     }
  //   } catch (err) {
  //
  //   }
  // };

  // role speacific
  // const user = userData?.data?.filter((role: any) => role?.role === "USERS");
  // const manager = userData?.data?.filter(
  //   (role: any) => role?.role === "MANAGER"
  // );
  // const marketOfficer = userData?.data?.filter(
  //   (role: any) => role?.role === "MARKETINGOFFICER"
  // );
  // const saleman = userData?.data?.filter(
  //   (role: any) => role?.role === "SALESMAN"
  // );
  // const cashier = userData?.data?.filter(
  //   (role: any) => role?.role === "CASHIER"
  // );
  // // total active and deactive users
  // const activeStatus = userData?.data?.filter(
  //   (status: any) => status?.active === true
  // );
  // const deactiveStatus = userData?.data?.filter(
  //   (status: any) => status?.active === false
  // );

  useEffect(() => {
    if (isDeleteUser) {
      toast({
        title: "Delete Message",
        description: "User deleted successfully",
      });
    }

    // update user,
    if (isUpdateUser) {
      toast({
        title: "Update Message",
        description: updated?.message,
      });
    }
  }, [isUpdateUser, isDeleteUser, toast, updated]);

  // Loading user Get
  if (isLoadingUserGet) {
    return <DataLoader />;
  }

  // Delete user,

  return (
    <section className="my-6">
      {/* UTILITY BUTTONS AND SEARCH USER FIELD */}
      <div className="flex justify-between items-end w-full">
        {/* UTILITY BUTTONS */}
        <ul className="flex space-x-3 w-full">
          <li>
            <Button variant="tertiary" size="sm">
              EXCEL
            </Button>
          </li>
          <li>
            <Button variant="destructive" size="sm">
              PDF
            </Button>
          </li>
        </ul>

        {/* SEARCH USER FILED */}
        <div className="flex justify-end items-center space-x-2">
          <InputWrapper
            label="Write User's Name/ Phone"
            labelFor="search_supplier"
            error=""
          >
            <Popover open={userOpen} onOpenChange={setUserOpen}>
              <PopoverTrigger
                id="search_supplier"
                asChild
                className={`w-full

                ${
                  sidebarOpen
                    ? "md:w-[197px] lg:w-[178px] xl:w-[254px] truncate"
                    : "md:w-[324px] lg:w-[247px] xl:w-[313px] 2xl:!w-[321px]"
                }

                `}
              >
                <Button
                  variant="outline"
                  role="search_supplier"
                  aria-expanded={userOpen}
                  className="w-full justify-between font-thin"
                >
                  {/* {selectedSupplier?.firstName
                  ? selectedSupplier?.firstName +
                    " " +
                    selectedSupplier?.lastName
                  : generalInfo?.search_supplier.placeholder[locale]} */}
                  User name/ phone
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                align="start"
                className={`w-full  ${
                  sidebarOpen
                    ? "md:w-[197px] lg:w-[178px] xl:w-[254px] truncate"
                    : "md:w-[324px] lg:w-[247px] xl:w-[313px] 2xl:!w-[321px]"
                }`}
              >
                <Command>
                  <div className="flex justify-center p-2">
                    {/* SUPPLIER SEARCH INPUT */}
                    <Input
                      // onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      //   setSupplierSearch(e.target.value)
                      // }
                      placeholder="Write user name for searching"
                    />
                  </div>
                  {isUserSearching && (
                    <div className="my-5 flex justify-center opacity-90">
                      <ButtonLoader />
                    </div>
                  )}
                  {/* <CommandGroup className="max-h-52 overflow-y-auto">
                  {supplierList?.map((singleSupplier: any) => (
                    <CommandItem
                      className="my-1 cursor-pointer border border-transparent hover:border-tertiary transition-all duration-300 bg-accent/80"
                      key={singleSupplier.id}
                      value={singleSupplier?.id}
                      onSelect={(currentValue) => {
                        // setSupplierValue(
                        //   currentValue === supplierValue ? "" : currentValue
                        // );
                        // setSelectedSupplier(singleSupplier);
                        // setSupplierOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          productValue === singleSupplier?.id
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {singleSupplier?.firstName +
                        " " +
                        singleSupplier?.lastName}
                    </CommandItem>
                  ))}
                </CommandGroup> */}
                </Command>
              </PopoverContent>
            </Popover>
          </InputWrapper>
          <InputWrapper label="#" error="" labelFor="">
            <Link to="/add_user">
              <Button>Add User</Button>
            </Link>
          </InputWrapper>
        </div>
      </div>
      {/* USER TABLE CONTAINER */}
      <h4 className="py-1 mt-4 mb-1 heading-secondary">User Information</h4>
      <DataTable columns={columns} data={userList} />

      <div className="">
        {/* table area */}
        {userData?.meta?.total >= 5 && (
          <div className="mt-5 mr-8 flex justify-end">
            <Pagination
              currPage={currentPage}
              setCurrPage={setCurrentPage}
              isLoading={isLoadingUserGet}
              totalItems={searchUser?.meta?.total}
              totalPage={searchUser?.meta?.totalPage}
              pageLength={searchUser?.meta?.size}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default UserList;
