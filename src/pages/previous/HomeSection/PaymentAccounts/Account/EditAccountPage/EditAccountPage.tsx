import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useGetAccountsQuery,
  useUpdateAccountMutation,
} from "@/store/account/accountApi";
import { accountUpdateSchema } from "@/schemas/account/account_update_schema";
import { useToast } from "@/components/ui/use-toast";
import DataLoader from "@/components/common/loader/DataLoader";
import InputField from "@/components/previous/all/InputField";
import { Option, Select } from "@/components/previous/all/Select";
import { useEffect } from "react";

const EditAccountPage = () => {
  const { toast } = useToast();
  const { id } = useParams();
  const { data: accounts, isLoading } = useGetAccountsQuery("All") as any;

  const [updateAccount, { isSuccess: accountEditSuccess }] =
    useUpdateAccountMutation() as any;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue: setValue,
  } = useForm({ resolver: yupResolver(accountUpdateSchema) });
  const handleEditAccount = async (data: any) => {
    try {
      const result = await updateAccount({ id, data });
      if (result?.data?.data && result?.data?.success === true) {
        toast({
          description: result?.data?.message,
        });
        navigate("/account_list");
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (accountEditSuccess) {
      toast({
        description: "Account updated successfully",
      });
    }
  }, [accountEditSuccess, toast]);

  if (isLoading) {
    return <DataLoader />;
  }

  const singleAccount = accounts?.data?.length
    ? accounts.data.find((account: any) => account.id === id)
    : {};

  return (
    <div>
      <div className="w-full">
        <form onSubmit={handleSubmit(handleEditAccount)}>
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
                    defaultValue={singleAccount?.accountName}
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
                    defaultValue={singleAccount?.bankName}
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
                      defaultValue={singleAccount?.accountHolderName}
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
                    defaultValue={singleAccount?.accountNumber}
                  />{" "}
                </div>
              </div>
              {/* left 1  */}
              {/* left 2  */}
              <div className="w-full">
                <div className="-mt-[70px]">
                  <h2 className=" w-[200px] font-bold">Account Type</h2>
                  <div className="flex justify-center items-center mt-1">
                    <div className="w-[100%] ">
                      <div className="">
                        <Select
                          name={"accountType"}
                          setValue={setValue}
                          label="Select Acc. Type*"
                          onChange={() => {}}
                        >
                          <Option value="Cash">Cash</Option>
                          <Option value="Bank">Bank</Option>
                          <Option value="MobileBanking">Mobile Banking</Option>
                        </Select>
                      </div>
                    </div>{" "}
                  </div>
                </div>
                <div className="-mt-1">
                  <div className="flex justify-center items-center mt-1">
                    <div className="w-[100%] "></div>{" "}
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
                    defaultValue={singleAccount?.openingBalance}
                  />{" "}
                </div>
                <div className="mb-[70px]"></div>
              </div>
              {/* left 2 */}
            </div>
          </div>
          <div className="flex justify-center items-center mt-7">
            <button
              type="submit"
              className="relative rounded px-5 py-2.5 overflow-hidden group bg-brand  hover:bg-gradient-to-r hover:from-brand2 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300"
            >
              <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
              <span className="relative">Edit Account</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAccountPage;
