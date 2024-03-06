import DataLoader from "@/components/common/loader/DataLoader";
import InputField from "@/components/previous/all/InputField";
import { Option, Select } from "@/components/previous/all/Select";
import { useToast } from "@/components/ui/use-toast";
import { customerSchema } from "@/schemas/customer/customer_schema";
import {
  useGetSingleCustomerQuery,
  useUpdateCustomerMutation,
} from "@/store/customer/customerApi";
import { shareBranchAndUserInfo } from "@/utils/helpers/shareBranchAndUserInfo";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const EditCustomerPage = () => {
  const { branchId } = shareBranchAndUserInfo();
  const { id } = useParams();
  const { data: Customer, isLoading: getCustomerLoading } =
    useGetSingleCustomerQuery(id);

  const { toast } = useToast();

  const [updateCustomer] = useUpdateCustomerMutation({}) as any;
  const navigate = useNavigate();
  // const { data: branchData } = useGetBranchQuery();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue: setValue,
  } = useForm({ resolver: yupResolver(customerSchema) });
  const handleEditCustomer = async (data: any) => {
    try {
      if (!data.branchId) {
        data.branchId = branchId;
      }
      const result = await updateCustomer({ id, data });
      if (result?.data?.data && result?.data?.success === true) {
        toast({
          description: result?.data?.message,
        });
        navigate("/list_customers");
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        description: error?.message,
      });
    }
  };

  if (getCustomerLoading) {
    return <DataLoader />;
  }
  return (
    <div>
      <div>
        <div className="w-[94%] mx-auto">
          <h1 className="my-5 ml-2">
            <span className="text-3xl font-bold">Edit Customer</span>{" "}
            <span className="font-light text-lg">Manage Customer</span>
          </h1>
        </div>
        <form
          onSubmit={handleSubmit(handleEditCustomer)}
          className="px-10 pb-5"
        >
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
                    defaultValue={Customer?.data?.branchId}
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
                    defaultValue={Customer?.data?.firstName}
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
                    defaultValue={Customer?.data?.lastName}
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
                    defaultValue={Customer?.data?.email}
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
                    defaultValue={Customer?.data?.phone}
                  />
                </div>
                <div className="my-4">
                  <InputField
                    isPassword={false}
                    isIcon={false}
                    register={register}
                    name={"tax"}
                    label={"Tax:"}
                    type={"number"}
                    errors={errors}
                    defaultValue={Customer?.data?.tax}
                  />{" "}
                </div>
              </div>
              {/* right part */}
              {/* midel part */}
              <div className="flex-1 w-full p-2">
                <div className="my-4">
                  <InputField
                    isPassword={false}
                    isIcon={false}
                    register={register}
                    name={"openingBalance"}
                    label={"Opening Balance :"}
                    type={"number"}
                    errors={errors}
                    defaultValue={Customer?.data?.openingBalance}
                  />{" "}
                </div>
                <div className="my-4">
                  <div className="my-4">
                    <Select
                      name="peyTerm"
                      setValue={setValue}
                      label="Pay Term"
                      onChange={() => {}}
                      // defaultValue={Customer?.data?.peyTerm}
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
                    defaultValue={Customer?.data?.creditLimit}
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
                    defaultValue={Customer?.data?.address}
                  />{" "}
                </div>
                <div className="my-4">
                  <InputField
                    isPassword={false}
                    isIcon={false}
                    name={"familyPhone"}
                    register={register}
                    label={"Family Phone:"}
                    type={"number"}
                    errors={errors}
                    defaultValue={Customer?.data?.familyPhone}
                  />{" "}
                </div>
                <div className="lg:mb-[74px]"></div>
              </div>
              {/* midel part */}
              {/* left part  */}
              <div className="flex-1 w-full p-2 ">
                <div className="my-4">
                  <InputField
                    isPassword={false}
                    isIcon={false}
                    name={"alternatePhone"}
                    register={register}
                    label={"Alternate Phone :"}
                    type={"number"}
                    errors={errors}
                    defaultValue={Customer?.data?.alternatePhone}
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
                    defaultValue={Customer?.data?.city}
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
                    defaultValue={Customer?.data?.state}
                  />{" "}
                </div>{" "}
                <div className="my-4">
                  <InputField
                    isPassword={false}
                    isIcon={false}
                    name={"zipCode"}
                    register={register}
                    label={"Zip Code :"}
                    type={"text"}
                    errors={errors}
                    defaultValue={Customer?.data?.zipCode}
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
                      defaultValue={Customer?.data?.department}
                    />{" "}
                  </div>{" "}
                </div>
                <div className="lg:mb-[74px]"></div>
              </div>
              {/* left part */}
            </div>{" "}
          </div>
          {/* part 1 */}
          {/* part 2 */}
          <div className="flex justify-center items-center mt-6">
            <button className="relative rounded px-5 py-2.5 overflow-hidden group bg-brand  hover:bg-gradient-to-r hover:from-brand2 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300">
              <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
              <span className="relative uppercase">Edit Customer</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCustomerPage;
