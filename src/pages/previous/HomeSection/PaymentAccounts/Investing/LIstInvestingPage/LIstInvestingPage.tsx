import { VscFilePdf } from "react-icons/vsc";
import { CiViewColumn } from "react-icons/ci";
import { IoPrintOutline } from "react-icons/io5";
import { FaRegFilePdf, FaRegTrashCan } from "react-icons/fa6";
import { BsFiletypeCsv } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGetAccountsQuery } from "@/store/account/accountApi";
import { useGetBranchesQuery } from "@/store/branch/branchApi";
import {
  // useAddInvestingMutation,
  useDeleteInvestingMutation,
  useGetAllInvestingQuery,
} from "@/store/investing/investingApi";
import { useToast } from "@/components/ui/use-toast";
import { AddInvestingSchema } from "@/schemas/investing/investing_schema";
import DataLoader from "@/components/common/loader/DataLoader";
import InputField from "@/components/previous/all/InputField";
import { Link } from "react-router-dom";
import {
  TBody,
  THeader,
  Table,
  Tbrow,
  Td,
  Th,
} from "@/components/previous/all/Table";
import Button from "@/components/previous/all/Button";
import { FaRegEdit } from "react-icons/fa";
import Pagination from "@/components/previous/all/Pagination";
import { actionManager } from "@/utils/helpers/actionManager";

const LIstInvestingPage = () => {
  const { toast } = useToast() as any;
  const [currentPage, setCurrentPage] = useState(1);
  const { data: accounts } = useGetAccountsQuery("All") as any;
  const { data: branches } = useGetBranchesQuery(undefined) as any;
  // const [createInvesting, { isLoading: isLoadingAddinvesting }] =
  //   useAddInvestingMutation() as any;
  const { data: investings, isLoading: isLoadingGetInvestings } =
    useGetAllInvestingQuery(undefined);

  // delete area
  const [
    deleteInvesting,
    {
      // isError: isDeleteError,
      // error: deleteError,
      isSuccess: isInvest,
    },
  ] = useDeleteInvestingMutation() as any;
  if (isInvest) {
    toast({
      description: "Investing Deleted Successfully",
    });
  }
  const {
    register,
    // handleSubmit,
    formState: { errors },
    // setValue,
    // reset,
    // clearErrors,
    // clear,
  } = useForm({ resolver: yupResolver(AddInvestingSchema) });

  if (isLoadingGetInvestings) {
    return <DataLoader />;
  }

  const feachingInvesting = investings?.data?.map((inv: any) => {
    const findAcc = accounts?.data?.find(
      (acc: any) => acc?.id === inv?.accountId
    );
    const findBranch = branches?.data?.find(
      (br: any) => br?.id === findAcc?.branchId
    );
    return {
      ...inv,
      account: {
        ...findAcc,
        ...findBranch,
      },
    };
  });
  return (
    <div>
      <div>
        <h1 className="my-3 ml-4 ">
          <span className="text-3xl font-bold">Investing List</span>{" "}
          <span className="font-light"></span>
        </h1>
      </div>
      <div className="w-[98%] mx-auto  bg-slate-100 border-t-2 border-brand mb-10 flex pb-10 shadow-xl rounded">
        <div className="flex-1 w-full p-2 ">
          <div className="my-4">
            <InputField
              isPassword={false}
              isIcon={false}
              register={register}
              name={"firstName"}
              label={"Business Location:"}
              type={"text"}
              errors={errors}
            />
          </div>
        </div>
        <div className="flex-1 w-full p-2 ">
          <div className="my-4">
            <InputField
              isPassword={false}
              isIcon={false}
              register={register}
              name={"firstName"}
              label={"Expense for"}
              type={"text"}
              errors={errors}
            />
          </div>
        </div>
        <div className="flex-1 w-full p-2 ">
          <div className="my-4">
            <InputField
              isPassword={false}
              isIcon={false}
              register={register}
              name={"Contact"}
              label={"Subcriptions:"}
              type={"text"}
              errors={errors}
            />
          </div>
        </div>
        <div className="flex-1 w-full p-2 ">
          <div className="my-4">
            <InputField
              isPassword={false}
              isIcon={false}
              labelColor="text-balck"
              register={register}
              name={"firstName"}
              label={"Expense Category"}
              type={"text"}
              errors={errors}
            />
          </div>
          <div className="mb-10"></div>
        </div>
      </div>
      <div className="w-[98%] mx-auto bg-slate-100 border-t-2 border-brand pb-10 shadow-xl rounded">
        {/* top side area */}
        <div className="lg:flex justify-between">
          <div className="flex mt-4 ml-3">
            <div>
              <button className="flex text-lg bg-[#163020] rounded-md py-1 px-2 mx-2 shadow-md cursor-pointer text-white font-semibold">
                <BsFiletypeCsv className="mt-1 mr-1" />
                CSV
              </button>
            </div>
            <div>
              <button className="flex text-lg bg-[#097640] rounded-md py-1 px-2 mx-2 shadow-md cursor-pointer text-white font-semibold">
                <FaRegFilePdf className="mt-1 mr-1" />
                Excel
              </button>
            </div>{" "}
            <div>
              <button className="flex text-lg bg-[#0069D9] rounded-md py-1 px-2 mx-2 shadow-md cursor-pointer text-white font-semibold">
                <IoPrintOutline className="mt-1 mr-1" />
                Pribt
              </button>
            </div>{" "}
            <div>
              <button className="flex text-lg bg-[#18B294] rounded-md py-1 px-2 mx-2 shadow-md cursor-pointer text-white font-semibold">
                <CiViewColumn className="mt-1 mr-1" />
                Column
              </button>
            </div>{" "}
            <div>
              <button className="flex text-lg bg-[#527853] rounded-md py-1 px-2 mx-2 shadow-md cursor-pointer text-white font-semibold">
                <VscFilePdf className="mt-1 mr-1" />
                PDF
              </button>
            </div>
          </div>
          <div className="mt-4 mr-5 lg:flex gap-5">
            <div className="mt-3">
              {" "}
              <InputField
                isPassword={false}
                isIcon={false}
                register={register}
                label={"Search:"}
                name={"lastName"}
                type={"text"}
                errors={errors}
              />
            </div>
            {actionManager(["manager"]) && (
              <Link
                to={"/add_investing"}
                className="relative inline-block text-lg group mt-2"
              >
                <span className="relative z-10 block px-5 py-2 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                  <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                  <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                  <span className="relative">+ADD</span>
                </span>
                <span
                  className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
                  data-rounded="rounded-lg"
                ></span>
              </Link>
            )}
          </div>
        </div>
        {/* Top side area */}
        {/* tabel area */}
        <div>
          <div className="mt-5 mx-12">
            <div>
              <Table>
                <THeader>
                  <Th>Account Name</Th>
                  <Th>Bank Name</Th>
                  <Th>Account Holder Name</Th>
                  <Th>Account No.</Th>
                  <Th>Account Type</Th>
                  <Th>Branch Name</Th>
                  <Th>Investing Name</Th>
                  <Th>Investing Balance</Th>
                  <Th>Action</Th>
                </THeader>
                <TBody>
                  {investings &&
                    feachingInvesting
                      ?.slice(currentPage * 5 - 5, currentPage * 5)
                      ?.map((investing: any) => (
                        <Tbrow key={investing?.id}>
                          <Td>{investing?.account?.accountName}</Td>
                          <Td>{investing?.account?.bankName}</Td>
                          <Td>{investing?.account?.accountHolderName}</Td>
                          <Td>{investing?.account?.accountNumber}</Td>
                          <Td>{investing?.account?.accountType}</Td>
                          <Td>{investing?.account?.branchName}</Td>
                          <Td>{investing?.investingName}</Td>
                          <Td>{investing?.investingBalances}</Td>
                          <Td>
                            <div className="flex items-center gap-3">
                              <div>
                                <Link to={`/edit_investing/${investing?.id}`}>
                                  <Button
                                    // handleClick={() => setModal(account?.id)}
                                    bgColor="bg-indigo-500"
                                    bgHoverColor="hover:bg-indigo-600"
                                  >
                                    <FaRegEdit />
                                    Edit
                                  </Button>
                                </Link>

                                {/* <Modal
                                                            isModal={modal}
                                                            modal_bg="bg-[#ffffff7e]"
                                                            width="w-[60vw]"
                                                            height="h-fit"
                                                        >
                                                            <ModalHead
                                                                title={"Create Branch"}
                                                                setIsModal={() => setModal(null)}
                                                            />
                                                            <form>
                                                                <ModalBody>
                                                                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-3">
                                                                        <div className="mb-3">
                                                                            <InputField
                                                                                isPassword={false}
                                                                                isIcon={false}
                                                                                name={"accountName"}
                                                                                register={register}
                                                                                label={"account name"}
                                                                                type={"text"}
                                                                                errors={errors}
                                                                            />{" "}
                                                                        </div>
                                                                        <div className="mb-3">
                                                                            <InputField
                                                                                isPassword={false}
                                                                                isIcon={false}
                                                                                name={"bankName"}
                                                                                register={register}
                                                                                label={"bank name"}
                                                                                type={"text"}
                                                                                requird
                                                                                errors={errors}
                                                                            />{" "}
                                                                        </div>
                                                                        <div className="">
                                                                            <div className="mb-3">
                                                                                <InputField
                                                                                    isPassword={false}
                                                                                    isIcon={false}
                                                                                    name={"accountHolderName"}
                                                                                    register={register}
                                                                                    label={"account holder name"}
                                                                                    type={"text"}
                                                                                    requird
                                                                                    errors={errors}
                                                                                />{" "}
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3">
                                                                            <InputField
                                                                                isPassword={false}
                                                                                isIcon={false}
                                                                                name={"openingBalance"}
                                                                                register={register}
                                                                                label={"opening Balance"}
                                                                                type={"number"}
                                                                                errors={errors}
                                                                            />{" "}
                                                                        </div>
                                                                        <div className="mb-3">
                                                                            <Select name={"accountType"} setValue={setValue} label="Select Acc. Type">
                                                                                <Option value="Cash">Cash</Option>
                                                                                <Option value="Bank">Bank</Option>
                                                                                <Option value="MobileBanking">Mobile Banking</Option>
                                                                            </Select>
                                                                        </div>
                                                                        <div className="mb-3">
                                                                            <Select name={"branchId"} setValue={setValue} label="Select Branch">
                                                                                {
                                                                                    branches && branches?.data?.map(branch =>
                                                                                        <Option key={branch?.id} value={branch?.id}>
                                                                                            {branch?.branchName}
                                                                                        </Option>
                                                                                    )
                                                                                }
                                                                            </Select>
                                                                        </div>
                                                                        <div className="col-span-3">
                                                                            <InputField
                                                                                isPassword={false}
                                                                                isIcon={false}
                                                                                name={"accountNumber"}
                                                                                register={register}
                                                                                label={"account number"}
                                                                                type={"text"}
                                                                                errors={errors}
                                                                            />{" "}
                                                                        </div>
                                                                    </div>
                                                                </ModalBody>
                                                            </form>
                                                            <ModalFooter>
                                                                <div className="flex gap-3">
                                                                    <Button
                                                                        handleClick={handleSubmit()}
                                                                        bgColor="bg-indigo-500"
                                                                        bgHoverColor="hover:bg-indigo-600"
                                                                        rounded="rounded-md"
                                                                    >
                                                                        SAVE
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
                                                        </Modal> */}
                              </div>

                              <div>
                                <Button
                                  handleClick={() =>
                                    deleteInvesting(investing?.id)
                                  }
                                  bgColor="bg-red-500"
                                  bgHoverColor="hover:bg-red-600"
                                >
                                  <FaRegTrashCan />
                                  Delete
                                </Button>
                              </div>
                            </div>
                          </Td>
                        </Tbrow>
                      ))}
                </TBody>
              </Table>
            </div>
            <hr className="m-5" />
            {feachingInvesting?.length > 5 && (
              <div className="mt-5 mr-8 flex justify-end">
                <Pagination
                  currPage={currentPage}
                  setCurrPage={setCurrentPage}
                  isLoading={null}
                  totalItems={feachingInvesting?.length}
                  totalPage={Math.ceil(feachingInvesting?.length / 5)}
                  pageLength={5}
                />
              </div>
            )}
          </div>
        </div>
        {/* table area */}
      </div>
    </div>
  );
};

export default LIstInvestingPage;
