import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useGetInvestsQuery,
  useUpdateInvestMutation,
} from "@/store/invest/investApi";
import { useToast } from "@/components/ui/use-toast";
import { useGetAccountsQuery } from "@/store/account/accountApi";
import { AddInvestSchema } from "@/schemas/invest/invest_schema";
import DataLoader from "@/components/common/loader/DataLoader";
import InputField from "@/components/previous/all/InputField";
import { Option, Select } from "@/components/previous/all/Select";

const EditInvestPage = () => {
  const { id } = useParams();
  const { toast } = useToast() as any;
  const { data: Invests, isLoading } = useGetInvestsQuery("All") as any;
  const { data: accounts } = useGetAccountsQuery("All") as any;

  const [updateInvests] = useUpdateInvestMutation() as any;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue: setValue,
  } = useForm({ resolver: yupResolver(AddInvestSchema) });
  const handleEditInvests = async (data: any) => {
    try {
      const result = await updateInvests({ id, data });
      if (result?.data?.data && result?.data?.success === true) {
        toast({
          description: result?.data?.message,
        });
        navigate("/invest_list");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (isLoading) {
    return <DataLoader />;
  }
  const singleInvest = Invests?.data?.length
    ? Invests.data.find((account: any) => account.id === id)
    : {};

  return (
    <div>
      <form onSubmit={handleSubmit(handleEditInvests)}>
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
                  defaultValue={singleInvest?.investName}
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
                  defaultValue={singleInvest?.investBalances}
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

        <div className="flex justify-center items-center mt-7">
          <button className="relative rounded px-5 py-2.5 overflow-hidden group bg-brand  hover:bg-gradient-to-r hover:from-brand2 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300">
            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
            <span className="relative">Edit Invest</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditInvestPage;
