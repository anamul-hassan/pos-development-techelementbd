import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegEdit, FaRegFilePdf } from "react-icons/fa";
import { VscFilePdf } from "react-icons/vsc";
import { CiViewColumn } from "react-icons/ci";
import { IoPrintOutline } from "react-icons/io5";
import { BsFiletypeCsv } from "react-icons/bs";
import { useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addBranchSchema } from "@/schemas/branch/branch_schema";
import {
  useAddBranchMutation,
  useDeleteBranchMutation,
  useGetBranchesQuery,
  useUpdateBranchMutation,
} from "@/store/branch/branchApi";
import { useToast } from "@/components/ui/use-toast";
import DataLoader from "@/components/common/loader/DataLoader";
import Button from "@/components/previous/all/Button";
import {
  TBody,
  THeader,
  Table,
  Tbrow,
  Td,
  Th,
} from "@/components/previous/all/Table";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHead,
} from "@/components/previous/all/Modal";
import InputField from "@/components/previous/all/InputField";
import Pagination from "@/components/previous/all/Pagination";
import { actionManager } from "@/utils/helpers/actionManager";

const BranchPage = () => {
  const { toast } = useToast() as any;
  const [modalAddBranch, setModalAddBranch] = useState<any>(null);
  const [modal1, setModal] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [deleteBranch, { data: Delete, isLoading: isLoadingDeleteBranch }] =
    useDeleteBranchMutation() as any;
  const [addBranch, { isLoading: isLoadingCreateBranch }] =
    useAddBranchMutation() as any;
  const {
    data: branches,
    isLoading: isGetBranchLoading,
    error,
    isError,
    isSuccess,
  } = useGetBranchesQuery(undefined);

  const [editBranch, { isLoading }] = useUpdateBranchMutation() as any;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(addBranchSchema) });
  // HANDLER FOR EDIT BRANCH
  const handleEditBranch = async (data: any) => {
    try {
      const result = await editBranch({ id: modal1, data });
      if (result?.data?.data && result?.data?.success === true) {
        setModal(null);
        toast({
          title: "Edit Branch",
          description: result?.message,
        });
        toast.success();
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  const {
    register: registerBranch,
    handleSubmit: submitBranch,
    formState: { errors: addBranchError },
    // setValue,
  } = useForm({ resolver: yupResolver(addBranchSchema) });
  const handleCreateBranch = async (data: any) => {
    try {
      const result = await addBranch(data);
      if (result?.data?.data && result?.data?.success === true) {
        setModalAddBranch(false);
        toast({
          title: "User Create Message",
          description: result?.data?.message,
        });
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (Delete?.data?.success) {
      toast({
        title: "Delete Branch",
        description: Delete?.message,
      });
    }
  }, [Delete?.message, toast, Delete?.data]);

  // IS BRANCH DATA ONWAY:LOADING
  if (isGetBranchLoading) {
    return <DataLoader />;
  }

  return (
    <div>
      <div>
        <h1 className="my-3 ml-5">
          <span className="text-3xl font-bold">Branch List</span>{" "}
          <span className="font-light text-lg">Manage branch List</span>
        </h1>
      </div>
      <div className="w-[98%] mx-auto bg-slate-100 pb-10 pt-4 shadow-xl rounded">
        {/* top side area */}
        <div className="lg:flex items-center justify-between">
          <div className="flex items-center lg:flex-row flex-col gap-3 ml-3">
            <div>
              <Button
                bgColor="bg-[#163020]"
                bgHoverColor="hover:bg-[#255f3c]"
                rounded="rounded-md"
              >
                <BsFiletypeCsv />
                CSV
              </Button>
            </div>
            <div>
              <Button
                bgColor="bg-[#097640]"
                bgHoverColor="hover:bg-[#287647]"
                rounded="rounded-md"
              >
                <FaRegFilePdf />
                Excel
              </Button>
            </div>
            <div>
              <Button
                bgColor="bg-[#0069D9]"
                bgHoverColor="hover:bg-[#2466ac]"
                rounded="rounded-md"
              >
                <IoPrintOutline />
                Print
              </Button>
            </div>
            <div>
              <Button
                bgColor="bg-[#18B294]"
                bgHoverColor="hover:bg-[#2d9d87]"
                rounded="rounded-md"
              >
                <CiViewColumn />
                Column
              </Button>
            </div>{" "}
            <div>
              <Button
                bgColor="bg-[#527853]"
                bgHoverColor="hover:bg-[#70ae71]"
                rounded="rounded-md"
              >
                <VscFilePdf />
                PDF
              </Button>
            </div>
          </div>
          <div className="mr-4 lg:flex items-center gap-5">
            {/* <div className="w-[300px]"> */}
            {/* {" "}
              <Input
                Icon={<IoIosSearch className="text-2xl" />}
                name={"search-user"}
                placeholder={"search"}
                setValues={setSearch}
              />
            </div> */}
          </div>

          <div>
            {actionManager(["admin"]) && (
              <Button
                handleClick={() => setModalAddBranch(true)}
                bgColor="bg-[#527853]"
                bgHoverColor="hover:bg-[#70ae71]"
                rounded="rounded-md"
              >
                <VscFilePdf />
                Add Branch
              </Button>
            )}
          </div>

          <Modal
            isModal={modalAddBranch}
            modal_bg="bg-[#ffffff7e]"
            width="w-[400px]"
            height="h-fit"
          >
            <ModalHead
              title={"Create Branch"}
              setIsModal={() => setModalAddBranch(false)}
            />
            <form>
              <ModalBody>
                <div className="mb-3">
                  <InputField
                    isPassword={false}
                    isIcon={false}
                    register={registerBranch}
                    name={"branchName"}
                    label={"Branch Name"}
                    type={"text"}
                    errors={addBranchError}
                  />
                </div>
                <div>
                  <InputField
                    isPassword={false}
                    isIcon={false}
                    register={registerBranch}
                    name={"branchLocation"}
                    label={"Branch Location"}
                    type={"text"}
                    errors={addBranchError}
                  />
                </div>
              </ModalBody>
            </form>
            <ModalFooter>
              <div className="flex gap-3">
                <Button
                  handleClick={submitBranch(handleCreateBranch)}
                  bgColor="bg-indigo-500"
                  bgHoverColor="hover:bg-indigo-600"
                  rounded="rounded-md"
                >
                  CREATE
                  {isLoadingCreateBranch && (
                    <span className="animate-spin text-lg flex items-center justify-center">
                      <AiOutlineLoading />
                    </span>
                  )}
                </Button>
                <Button
                  bgColor="bg-rose-500"
                  bgHoverColor="hover:bg-rose-600"
                  rounded="rounded-md"
                  handleClick={() => setModal(false)}
                >
                  CLOSE
                </Button>
              </div>
            </ModalFooter>
          </Modal>
        </div>
      </div>

      {/* Top side area */}
      {/* tabel area */}
      <div>
        <div className="w-[98%] mx-auto mt-5 h-fit">
          <Table>
            <THeader>
              <Th>Branch Name</Th>
              <Th>Branch Location</Th>
              <Th>Action</Th>
            </THeader>
            <TBody>
              {isGetBranchLoading ? (
                <div className="flex items-center gap-4">Searching</div>
              ) : (
                <>
                  {!isError &&
                    !error &&
                    isSuccess &&
                    branches?.data
                      ?.slice(currentPage * 5 - 5, currentPage * 5)
                      ?.map((branch: any) => (
                        <Tbrow key={branch?.id}>
                          <Td>{branch?.branchName}</Td>
                          <Td>{branch?.branchLocation}</Td>
                          <Td>
                            <div className="flex items-center justify-around gap-2">
                              <div>
                                <Button
                                  handleClick={() => setModal(branch?.id)}
                                  bgColor="bg-indigo-500"
                                  bgHoverColor="hover:bg-indigo-600"
                                >
                                  <FaRegEdit />
                                  Edit
                                </Button>
                                <Modal
                                  isModal={modal1}
                                  modal_bg="bg-[#ffffff7e]"
                                  width="w-[400px]"
                                  height="h-fit"
                                >
                                  <ModalHead
                                    title={"Update Branch"}
                                    setIsModal={() => setModal(null)}
                                  />
                                  <form>
                                    <ModalBody>
                                      <div className="mb-3">
                                        <InputField
                                          isPassword={false}
                                          isIcon={false}
                                          register={register}
                                          name={"branchName"}
                                          label={"Branch Name"}
                                          type={"text"}
                                          errors={errors}
                                        />
                                      </div>
                                      <div>
                                        <InputField
                                          isPassword={false}
                                          isIcon={false}
                                          register={register}
                                          name={"branchLocation"}
                                          label={"Branch Location"}
                                          type={"text"}
                                          errors={errors}
                                        />
                                      </div>
                                    </ModalBody>
                                  </form>
                                  <ModalFooter>
                                    <div className="flex gap-3">
                                      <Button
                                        handleClick={handleSubmit(
                                          handleEditBranch
                                        )}
                                        bgColor="bg-indigo-500"
                                        bgHoverColor="hover:bg-indigo-600"
                                        rounded="rounded-md"
                                      >
                                        Edit
                                        {isLoading && (
                                          <span className="animate-spin text-lg flex items-center justify-center">
                                            <AiOutlineLoading />
                                          </span>
                                        )}
                                      </Button>
                                      <Button
                                        bgColor="bg-rose-500"
                                        bgHoverColor="hover:bg-rose-600"
                                        rounded="rounded-md"
                                        handleClick={() => setModal(null)}
                                      >
                                        CLOSE
                                      </Button>
                                    </div>
                                  </ModalFooter>
                                </Modal>
                              </div>
                              <div>
                                <Button
                                  handleClick={() => deleteBranch(branch?.id)}
                                  bgColor="bg-red-500"
                                  bgHoverColor="hover:bg-red-600"
                                >
                                  <FaRegTrashCan />
                                  Delete
                                  {isLoadingDeleteBranch && (
                                    <span className="animate-spin text-lg flex items-center justify-center">
                                      <AiOutlineLoading />
                                    </span>
                                  )}
                                </Button>
                              </div>
                            </div>
                          </Td>
                        </Tbrow>
                      ))}
                </>
              )}
            </TBody>
            {/* <TFooter>
                 <Td row={1} column={1}></Td>
                 <Td row={1} column={1}>
                   <div className="whitespace-nowrap">
                     Total Users: {userData?.meta?.total}
                   </div>
                 </Td>
                 <Td row={1} column={1}>
                   <div className="whitespace-nowrap">
                     Total Name: {userData?.meta?.total}
                   </div>
                 </Td>
                 <Td row={1} column={1}>
                   <div className="text-left whitespace-nowrap">
                     Total Role: {userData?.meta?.total} <br />
                     Total USER: {user?.length} <br />
                     Total MANAGER: {manager?.length} <br />
                     Total CASHIER: {cashier?.length} <br />
                     Total SALESMAN: {saleman?.length} <br />
                     Total MARKETINGOFFICER: {marketOfficer?.length} <br />
                   </div>
                 </Td>
                 <Td row={1} column={1}>
                   <div className="whitespace-nowrap">
                     All Email: {userData?.meta?.total}
                   </div>
                 </Td>
                 <Td row={1} column={1}>
                   <div className="text-left whitespace-nowrap">
                     Total Active: {activeStatus?.length} <br />
                     Total Deactive: {deactiveStatus?.length} <br />
                   </div>
                 </Td>
               </TFooter> */}
          </Table>
        </div>
      </div>
      {/* table area */}
      {branches?.data?.length > 5 && (
        <div className="mt-5 mr-8 flex justify-end">
          <Pagination
            currPage={currentPage}
            setCurrPage={setCurrentPage}
            isLoading={null}
            totalItems={branches?.data?.length}
            totalPage={Math.ceil(branches?.data?.length / 5)}
            pageLength={5}
          />
        </div>
      )}
    </div>
  );
};

export default BranchPage;
