import DataLoader from "@/components/common/loader/DataLoader";
import InputField from "@/components/previous/all/InputField";
import { Option, Select } from "@/components/previous/all/Select";
import { useToast } from "@/components/ui/use-toast";
import { addEditCustomerSchema } from "@/schemas/customer/customer_schema";
import { useAddCustomerMutation } from "@/store/customer/customerApi";
import { shareBranchAndUserInfo } from "@/utils/helpers/shareBranchAndUserInfo";
import { yupResolver } from "@hookform/resolvers/yup";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface AddCustomerPageProps {}
const AddCustomer: FC<AddCustomerPageProps> = () => {
  const { toast } = useToast();
  const { branchId } = shareBranchAndUserInfo();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({ resolver: yupResolver(addEditCustomerSchema) });
  // const { data: branchData } = useGetBranchQuery();
  const [addCustomer, { isLoading: isLoadingCustomer }] =
    useAddCustomerMutation() as any;

  const navigate = useNavigate();

  const handleAddCustomer = async (data: any) => {
    try {
      if (!data.branchId) {
        data.branchId = branchId;
      }
      const result = await addCustomer(data);

      if (result?.data?.data && result?.data?.success === true) {
        reset();
        toast({
          description: result?.data?.message,
        });
        navigate("/list_customers");
      }
    } catch (err) {
      toast({
        variant: "destructive",
        description: "Customer Created Unsuccessful",
      });
    }
  };

  if (isLoadingCustomer) {
    return <DataLoader />;
  }

  return (
    <div>
      <div className="w-[94%] mx-auto">
        <h1 className="my-5 ml-2">
          <span className="text-3xl font-bold">Add Customer</span>{" "}
          <span className="font-light text-lg">Manage Customer</span>
        </h1>
      </div>
      <form onSubmit={handleSubmit(handleAddCustomer)} className="px-10 pb-5">
        {/* part 1 */}
        <div className="w-[98%] mx-auto bg-slate-100 pb-10 shadow-lg rounded border-t-2 border-Customer">
          <div className="flex flex-col md:flex-row items-center justify-center py-[20px] w-[90%] mx-auto">
            {/* right part */}
            <div className="flex-1 w-full p-2 ">
              {/* {" "}
              <div className="my-4">
                <Select
                  name="branchId"
                  setValue={setValueur}
                  label="Select Branch*"
                  onChange={() => { }}
                >
                  {branchData &&
                    branchData?.data?.map((branch) => (
                      <Option key={branch?.id} value={branch?.id}>
                        {branch?.branchName}
                      </Option>
                    ))}
                </Select>
              </div> */}
              <div className="my-4">
                <InputField
                  isPassword={false}
                  isIcon={false}
                  name={"firstName"}
                  register={register}
                  label={"First Name* :"}
                  type={"text"}
                  errors={errors}
                />{" "}
              </div>
              <div className="my-4">
                <InputField
                  isPassword={false}
                  isIcon={false}
                  name={"lastName"}
                  register={register}
                  label={"Last Name:"}
                  type={"text"}
                  errors={errors}
                />{" "}
              </div>
              <div className="my-4">
                <InputField
                  isPassword={false}
                  isIcon={false}
                  register={register}
                  name={"email"}
                  label={"Email* :"}
                  type={"email"}
                  errors={errors}
                />
              </div>
              <div className="my-4">
                <InputField
                  isPassword={false}
                  isIcon={false}
                  name={"phone"}
                  register={register}
                  label={"Phone* :"}
                  type={"number"}
                  errors={errors}
                />
              </div>
              <div className="mt-4 lg:mb-4">
                <InputField
                  isPassword={false}
                  isIcon={false}
                  register={register}
                  name={"tax"}
                  label={"Tax:"}
                  type={"number"}
                  errors={errors}
                />{" "}
              </div>
            </div>
            {/* right part */}
            {/* midel part */}
            <div className="flex-1 w-full p-2">
              <div className="lg:mt-4 mb-4">
                <InputField
                  isPassword={false}
                  isIcon={false}
                  register={register}
                  name={"openingBalance"}
                  label={"Opening Balance :"}
                  type={"number"}
                  errors={errors}
                />{" "}
              </div>
              <div className="my-4">
                <div className="my-4">
                  <Select
                    name="peyTerm"
                    setValue={setValue}
                    label="Pay Term"
                    onChange={() => {}}
                  >
                    <Option value="Months">Months</Option>
                    <Option value="Days">Days</Option>
                  </Select>
                </div>
              </div>
              <div className="my-4">
                <InputField
                  isPassword={false}
                  isIcon={false}
                  register={register}
                  name={"creditLimit"}
                  label={"Credit Limit :"}
                  type={"number"}
                  errors={errors}
                />{" "}
              </div>
              <div className="my-4">
                <InputField
                  isPassword={false}
                  isIcon={false}
                  name={"address"}
                  register={register}
                  label={"Address :"}
                  type={"text"}
                  errors={errors}
                />{" "}
              </div>
              <div className="mt-4 lg:mb-4">
                <InputField
                  isPassword={false}
                  isIcon={false}
                  name={"familyPhone"}
                  register={register}
                  label={"Family Phone:"}
                  type={"number"}
                  errors={errors}
                />{" "}
              </div>{" "}
              <div className="lg:mb-[72px]"></div>
            </div>
            {/* midel part */}
            {/* left part  */}
            <div className="flex-1 w-full p-2 ">
              {" "}
              <div className="lg:mt-4 mb-4">
                <InputField
                  isPassword={false}
                  isIcon={false}
                  name={"alternatePhone"}
                  register={register}
                  label={"Alternate Phone :"}
                  type={"number"}
                  errors={errors}
                />{" "}
              </div>
              <div className="my-4">
                <InputField
                  isPassword={false}
                  isIcon={false}
                  name={"city"}
                  register={register}
                  label={"City :"}
                  type={"text"}
                  errors={errors}
                />{" "}
              </div>
              <div className="my-4">
                <InputField
                  isPassword={false}
                  isIcon={false}
                  name={"state"}
                  register={register}
                  label={"State :"}
                  type={"text"}
                  errors={errors}
                />{" "}
              </div>
              <div className="my-4">
                <InputField
                  isPassword={false}
                  isIcon={false}
                  name={"zipCode"}
                  register={register}
                  label={"Zip Code :"}
                  type={"text"}
                  errors={errors}
                />{" "}
              </div>
              <div className="my-4">
                <div className="my-4">
                  <InputField
                    isPassword={false}
                    isIcon={false}
                    placeholder="department  "
                    labelColor="text-balck"
                    // Icon={<PiContactlessPaymentFill />}
                    name={"department"}
                    register={register}
                    label={"Department :"}
                    type={"text"}
                    errors={errors}
                  />{" "}
                </div>{" "}
              </div>
              <div className="lg:mb-[72px]"></div>
            </div>
            {/* left part */}
          </div>{" "}
        </div>
        {/* part 1 */}
        {/* part 2 */}
        <div className="flex justify-center items-center mt-6">
          <button className="relative rounded px-5 py-2.5 overflow-hidden group bg-brand  hover:bg-gradient-to-r hover:from-brand2 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300">
            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
            <span className="relative uppercase">ADD New Customer</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCustomer;
