import { useForm } from "react-hook-form";
import { useState } from "react";
// import { useGetBranchQuery } from "../../../../../redux/Branch/BranchApi";

import { FaRegTrashCan } from "react-icons/fa6";
import { AiOutlineLoading } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useGetAccountsQuery } from "@/store/account/accountApi";
import { useGetBranchesQuery } from "@/store/branch/branchApi";
import {
  useAddInvestMutation,
  useGetInvestsQuery,
} from "@/store/invest/investApi";
import { yupResolver } from "@hookform/resolvers/yup";
import { AddInvestSchema } from "@/schemas/invest/invest_schema";
import DataLoader from "@/components/common/loader/DataLoader";
import InputField from "@/components/previous/all/InputField";
import { Option, Select } from "@/components/previous/all/Select";
import Button from "@/components/previous/all/Button";
import ReportSelector from "@/components/previous/all/ReportSelector";
import {
  TBody,
  THeader,
  Table,
  Tbrow,
  Td,
  Th,
} from "@/components/previous/all/Table";
import Pagination from "@/components/previous/all/Pagination";

const AddInvestPage = () => {
  const { toast } = useToast() as any;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOption, setSelectedOption] = useState("All");
  const { data: accounts } = useGetAccountsQuery("All") as any;
  const { data: branches } = useGetBranchesQuery(undefined) as any;
  const [createInvest, { isLoading: isLoadingAddInvest }] =
    useAddInvestMutation() as any;
  const { data: getInvest, isLoading: isLoadingGetInvest } = useGetInvestsQuery(
    undefined
  ) as any;
  const options = ["All", "Cash", "Bank", "MobileBanking"];
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    clearErrors,
  } = useForm({ resolver: yupResolver(AddInvestSchema) });

  const handleAddInvest = async (data: any) => {
    try {
      const result = await createInvest(data);
      if (result?.data?.data && result?.data?.success === true) {
        toast({
          description: result?.data?.message,
        });

        reset();
        clearErrors();
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  if (isLoadingGetInvest) {
    return <DataLoader />;
  }
  // invest with acc name branch
  const feachingInvest = getInvest?.data?.map((inv: any) => {
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
      <div className="text-[30px] font-bold lg:ml-14 mt-5 ml-5">Add Invest</div>
      <div className="w-[94%]  bg-slate-100 pb-10 shadow-lg rounded border-t-2 border-brand mx-auto mt-5">
        <form>
          <div className="">
            <div className="flex  gap-4 md:flex-row items-center justify-center w-[90%] mx-auto">
              {/* left 1  */}
              <div className="flex-1 w-full p-2 mt-4">
                <div className="my-4">
                  <InputField
                    isPassword={false}
                    isIcon={false}
                    name={"investName"}
                    register={register}
                    label={"invest name*"}
                    type={"text"}
                    errors={errors}
                  />{" "}
                </div>
              </div>
              {/* left 1  */}
              {/* left 1  */}
              <div className="flex-1 w-full p-2 mt-4">
                <div className="my-4">
                  <InputField
                    isPassword={false}
                    isIcon={false}
                    name={"investBalances"}
                    register={register}
                    label={"invest balances*"}
                    type={"number"}
                    errors={errors}
                  />{" "}
                </div>
              </div>
              {/* left 1  */}
              {/* left 2  */}
              <div className="flex-1 w-full p-2">
                <div className="mt-3">
                  <div className="flex justify-center items-center mt-1">
                    <div className="w-[100%] ">
                      <div className="">
                        <Select
                          name={"accountId"}
                          setValue={setValue}
                          label="Please Select"
                          onChange={() => {}}
                        >
                          {accounts &&
                            accounts?.data?.map((acc: any) => (
                              <Option key={acc?.id} value={acc?.id}>
                                {acc?.accountName}
                              </Option>
                            ))}
                        </Select>
                      </div>
                    </div>{" "}
                  </div>
                </div>
              </div>
              {/* left 2 */}
            </div>
          </div>

          <div>
            <div className="mt-2 flex xl:justify-end md:justify-center items-center gap-8 lg:mr-20 mr-3">
              <div className="my-2">
                <Button
                  handleClick={handleSubmit(handleAddInvest)}
                  bgColor="bg-brand"
                  bgHoverColor="hover:bg-blue-900"
                  rounded="rounded"
                >
                  New Add Invest
                  {isLoadingAddInvest && (
                    <span className="animate-spin text-lg flex items-center justify-center">
                      <AiOutlineLoading />
                    </span>
                  )}
                </Button>
              </div>
              <div className="my-2">
                <Button
                  handleClick={() => reset()}
                  bgColor="bg-red-500"
                  bgHoverColor="hover:bg-red-600"
                  rounded="rounded"
                >
                  Cancel
                </Button>
              </div>{" "}
            </div>
          </div>
        </form>
      </div>
      <div className="w-[94%] bg-slate-100 pb-10 shadow-lg rounded border-t-2 border-brand mx-auto mt-5 px-0">
        <div className="mt-10 w-fit ml-auto mr-12 lg:mt-[15px] z-10">
          <div className="flex items-center gap-5">
            <div className="w-[300px]">
              <ReportSelector
                options={options}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
              />
            </div>
          </div>
        </div>
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
                <Th>Invest Name</Th>
                <Th>Invest Balance</Th>
                <Th>Action</Th>
              </THeader>
              <TBody>
                {getInvest &&
                  feachingInvest
                    ?.slice(currentPage * 5 - 5, currentPage * 5)
                    ?.map((invest: any) => (
                      <Tbrow key={invest?.id}>
                        <Td>{invest?.account?.accountName}</Td>
                        <Td>{invest?.account?.bankName}</Td>
                        <Td>{invest?.account?.accountHolderName}</Td>
                        <Td>{invest?.account?.accountNumber}</Td>
                        <Td>{invest?.account?.accountType}</Td>
                        <Td>{invest?.account?.branchName}</Td>
                        <Td>{invest?.investName}</Td>
                        <Td>{invest?.investBalances}</Td>
                        <Td>
                          <div className="flex items-center gap-3">
                            <div>
                              <Link to={`/edit_invest/${invest?.id}`}>
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
                                // handleClick={() => deleteUser(user?.id)}
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
          {feachingInvest?.length > 5 && (
            <div className="mt-5 mr-8 flex justify-end">
              <Pagination
                currPage={currentPage}
                setCurrPage={setCurrentPage}
                isLoading={null}
                totalItems={feachingInvest?.length}
                totalPage={Math.ceil(feachingInvest?.length / 5)}
                pageLength={5}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddInvestPage;
