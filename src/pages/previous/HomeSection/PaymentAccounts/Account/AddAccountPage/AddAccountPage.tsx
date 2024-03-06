import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { useToast } from "@/components/ui/use-toast";
import { useGetBranchesQuery } from "@/store/branch/branchApi";
import { useAddAccountMutation } from "@/store/account/accountApi";
import { AccountSchema } from "@/schemas/account/account_schema";
import InputField from "@/components/previous/all/InputField";
import { Option, Select } from "@/components/previous/all/Select";
import Button from "@/components/previous/all/Button";
import ReportSelector from "@/components/previous/all/ReportSelector";
import { useNavigate } from "react-router-dom";

const AddAccountPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast() as any;
  const [selectedOption, setSelectedOption] = useState("All");
  // const [modal, setModal] = useState(null);
  const { data: branches } = useGetBranchesQuery(undefined);
  const [createAccount, { isLoading: isLoadingCreateAcc }] =
    useAddAccountMutation() as any;

  const options = ["All", "Cash", "Bank", "MobileBanking"];
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    clearErrors,
  } = useForm({ resolver: yupResolver(AccountSchema) });

  const handleAddAccount = async (data: any) => {
    try {
      const result = await createAccount(data);
      if (result?.data?.data && result?.data?.success === true) {
        toast({
          description: result?.data?.message,
        });
        reset();
        clearErrors();
        navigate("/account_list");
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <div className="text-[30px] font-bold lg:ml-14 mt-5 ml-5">
        Add Account
      </div>
      <div className="w-[94%]  bg-slate-100 pb-10 shadow-lg rounded border-t-2 border-brand mx-auto mt-5">
        <div className="flex flex-col md:flex-row gap-5 items-center justify-center w-[94%] mx-auto">
          <div className="w-full mt-5">
            <form>
              <div className="">
                <div className="flex flex-col gap-4 md:flex-row items-center justify-center w-[90%] mx-auto">
                  {/* left 1  */}
                  <div className="w-full">
                    <div className="my-4">
                      <InputField
                        isPassword={false}
                        isIcon={false}
                        name={"accountName"}
                        register={register}
                        label={"account name*"}
                        type={"text"}
                        errors={errors}
                      />{" "}
                    </div>
                    <div className="my-4">
                      <InputField
                        isPassword={false}
                        isIcon={false}
                        name={"bankName"}
                        register={register}
                        label={"bank name*"}
                        type={"text"}
                        errors={errors}
                      />{" "}
                    </div>
                    <div className="">
                      <div className="my-4">
                        <InputField
                          isPassword={false}
                          isIcon={false}
                          name={"accountHolderName"}
                          register={register}
                          label={"account holder name*"}
                          type={"text"}
                          errors={errors}
                        />{" "}
                      </div>
                    </div>
                    <div className="my-4">
                      <InputField
                        isPassword={false}
                        isIcon={false}
                        name={"accountNumber"}
                        register={register}
                        label={"account number*"}
                        type={"text"}
                        errors={errors}
                      />{" "}
                    </div>
                  </div>
                  {/* left 1  */}
                  {/* left 2  */}
                  <div className="w-full">
                    <div className="-mt-[12px]">
                      <h2 className=" w-[200px] font-bold">Account Type</h2>
                      <div className="flex justify-center items-center mt-1">
                        <div className="w-[100%] ">
                          <div className="">
                            <Select
                              name={"accountType"}
                              setValue={setValue}
                              label="Select Acc. Type*"
                            >
                              <Option value="Cash">Cash</Option>
                              <Option value="Bank">Bank</Option>
                              <Option value="MobileBanking">
                                Mobile Banking
                              </Option>
                            </Select>
                          </div>
                        </div>{" "}
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-center items-center mt-1">
                        <div className="w-[100%] ">
                          <div className="">
                            <Select
                              name={"branchId"}
                              setValue={setValue}
                              label="Select Branch*"
                            >
                              {branches &&
                                branches?.data?.map((branch: any) => (
                                  <Option key={branch?.id} value={branch?.id}>
                                    {branch?.branchName}
                                  </Option>
                                ))}
                            </Select>
                          </div>
                        </div>{" "}
                      </div>
                    </div>
                    <div className="my-4">
                      <InputField
                        isPassword={false}
                        isIcon={false}
                        name={"openingBalance"}
                        register={register}
                        label={"opening Balance*"}
                        type={"number"}
                        errors={errors}
                      />{" "}
                    </div>
                    <div className="mb-[70px]"></div>
                  </div>
                  {/* left 2 */}
                </div>
              </div>
            </form>
            <div>
              <div className="mt-2 flex xl:justify-end md:justify-center items-center gap-8 ">
                <div className="my-2">
                  <Button
                    handleClick={handleSubmit(handleAddAccount)}
                    bgColor="bg-brand"
                    bgHoverColor="hover:bg-blue-900"
                    rounded="rounded"
                  >
                    New Add Account
                    {isLoadingCreateAcc && (
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
          </div>
        </div>
        <div className="mt-10 w-fit ml-auto mr-12 lg:mt-[15px] z-10">
          <div className="flex items-center gap-5">
            {/* <div>
              <Input Icon={<FaSearch className="text-lg" />} />
            </div> */}
            <div className="w-[300px]">
              <ReportSelector
                options={options}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAccountPage;
