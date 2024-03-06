import DataLoader from "@/components/common/loader/DataLoader";
import InputField from "@/components/previous/all/InputField";
import { Option, Select } from "@/components/previous/all/Select";
import { useToast } from "@/components/ui/use-toast";
import { supplierSchema } from "@/schemas/supplier/supplier_schema";
import { useAddSupplierMutation } from "@/store/supplier/supplierApi";
import { shareBranchAndUserInfo } from "@/utils/helpers/shareBranchAndUserInfo";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const AddSupplierPage = () => {
  const { toast } = useToast();
  const { branchId } = shareBranchAndUserInfo();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue: setValue,
    reset: reset,
  } = useForm({ resolver: yupResolver(supplierSchema) });
  // const { data: branchData } = useGetBranchQuery();
  const [addSupplier, { isLoading: loadingSupplier }] = useAddSupplierMutation(
    {}
  ) as any;

  const navigate = useNavigate();

  const handleAddSupplier = async (data: any) => {
    try {
      if (!data.branchId) {
        data.branchId = branchId;
      }
      const result = await addSupplier(data);

      if (result?.data?.data && result?.data?.success === true) {
        toast({
          description: result?.data?.message,
        });
        reset();
        navigate("/supplier_list");
      }
    } catch (err: any) {
      toast({
        description: "Supplier Created Unsuccessful",
      });
    }
  };

  if (loadingSupplier) {
    return <DataLoader />;
  }

  return (
    <div>
      <div className="w-[94%] mx-auto">
        <h1 className="my-5 ">
          <span className="text-2xl font-bold">Add Suppliers</span>{" "}
          <span className="font-light">Manage Suppliers</span>
        </h1>
      </div>
      <form onSubmit={handleSubmit(handleAddSupplier)} className="px-10 pb-5">
        {/* part 1 */}
        <div className="w-[98%] mx-auto bg-slate-100 pb-10 shadow-lg rounded border-t-2 border-brand">
          <div className="flex flex-col md:flex-row items-center justify-center w-[90%] py-[20px] mx-auto">
            {/* right part */}
            <div className="flex-1 w-full p-2 ">
              {/* <div className="my-4">
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
              <div className="my-2">
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
              <div className="my-2">
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
              <div className="my-2">
                <InputField
                  isPassword={false}
                  isIcon={false}
                  register={register}
                  name={"email"}
                  label={"Email* :"}
                  type={"email "}
                  errors={errors}
                />
              </div>
              <div className="mt-2 lg:mb-2">
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
            </div>
            {/* right part */}
            {/* midel part */}
            <div className="flex-1 w-full p-2">
              {" "}
              <div className="lg:mt-2 mb-2">
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
              <div className="my-2">
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
              <div className="my-2">
                <InputField
                  isPassword={false}
                  isIcon={false}
                  register={register}
                  name={"advanceAmount"}
                  label={"Advance Amount:"}
                  type={"number"}
                  errors={errors}
                />{" "}
              </div>
              <div className="my-2">
                <InputField
                  isPassword={false}
                  isIcon={false}
                  register={register}
                  name={"dueAmount"}
                  label={"Due Amount:"}
                  type={"number"}
                  errors={errors}
                />{" "}
              </div>
              <div className="mt-2 lg:mb-2">
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
            {/* midel part */}
            {/* left part  */}
            <div className="flex-1 w-full p-2 -mt-1">
              {" "}
              <div className="lg:mt-2 mb-2">
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
              <div className="my-2">
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
              <div className="my-2">
                <InputField
                  isPassword={false}
                  isIcon={false}
                  name={"state"}
                  register={register}
                  label={" state :"}
                  type={"text"}
                  errors={errors}
                />
              </div>
              <div className="my-2">
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
              <div className="my-2">
                <Select
                  name="paidStatus"
                  setValue={setValue}
                  label="Paid Status"
                  onChange={() => {}}
                >
                  <Option value="Paid">Paid</Option>
                  <Option value="Due">Due</Option>
                </Select>
              </div>
            </div>
            {/* left part */}
          </div>{" "}
        </div>
        {/* part 1 */}
        {/* part 2 */}

        <div className="flex justify-center items-center mt-7">
          <button className="relative rounded px-5 py-2.5 overflow-hidden group bg-brand  hover:bg-gradient-to-r hover:from-brand2 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300">
            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
            <span className="relative">ADD New Suppliers</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSupplierPage;
