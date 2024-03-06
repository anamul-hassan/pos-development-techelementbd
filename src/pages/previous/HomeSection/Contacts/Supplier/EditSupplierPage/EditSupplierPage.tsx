import DataLoader from "@/components/common/loader/DataLoader";
import InputField from "@/components/previous/all/InputField";
import { Option, Select } from "@/components/previous/all/Select";
import { useToast } from "@/components/ui/use-toast";
import { supplierUpdateSchema } from "@/schemas/supplier/supplier_update_schema";
import {
  useGetSingleSupplierQuery,
  useUpdateSupplierMutation,
} from "@/store/supplier/supplierApi";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const EditSupplierPage = () => {
  const { toast } = useToast();
  const { id } = useParams();

  const { data: supplier, isLoading: loadingSupplier } =
    useGetSingleSupplierQuery(id);

  const [updateSupplier] = useUpdateSupplierMutation({}) as any;
  const navigate = useNavigate();
  // const { data: branchData } = useGetBranchQuery();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue: setValue,
  } = useForm({ resolver: yupResolver(supplierUpdateSchema) });
  const handleEditSupplier = async (data: any) => {
    try {
      const result = await updateSupplier({ id, data });
      if (result?.data?.data && result?.data?.success === true) {
        toast({
          description: result?.data?.message,
        });
        navigate("/list_suppliers");
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        description: error?.message,
      });
    }
  };

  if (loadingSupplier) {
    return <DataLoader />;
  }
  return (
    <div>
      <div>
        <div className="w-[94%] mx-auto">
          <h1 className="my-5 ">
            <span className="text-2xl font-bold">Edit Suppliers</span>{" "}
            <span className="font-light">Manage Suppliers</span>
          </h1>
        </div>
        <form
          onSubmit={handleSubmit(handleEditSupplier)}
          className="px-10 pb-5"
        >
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
                    defaultValue={supplier?.data?.branchId}
                    onChange={() => {}}
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
                    defaultValue={supplier?.data?.firstName}
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
                    defaultValue={supplier?.data?.lastName}
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
                    defaultValue={supplier?.data?.email}
                  />
                </div>
                <div className="my-2">
                  <InputField
                    isPassword={false}
                    isIcon={false}
                    name={"phone"}
                    register={register}
                    label={"Phone* :"}
                    type={"number"}
                    errors={errors}
                    defaultValue={supplier?.data?.phone}
                  />
                </div>
                <div className="my-2">
                  <InputField
                    isPassword={false}
                    isIcon={false}
                    register={register}
                    name={"tax"}
                    label={"Tax:"}
                    type={"number"}
                    errors={errors}
                    defaultValue={supplier?.data?.tax}
                  />{" "}
                </div>{" "}
              </div>
              {/* right part */}
              {/* midel part */}
              <div className="flex-1 w-full p-2">
                <div className="my-2">
                  <InputField
                    isPassword={false}
                    isIcon={false}
                    register={register}
                    name={"openingBalance"}
                    label={"Opening Balance :"}
                    type={"number"}
                    errors={errors}
                    defaultValue={supplier?.data?.openingBalance}
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
                    defaultValue={supplier?.data?.advanceAmount}
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
                    defaultValue={supplier?.data?.dueAmount}
                  />{" "}
                </div>
                <div className="my-2">
                  <Select
                    name="peyTerm"
                    setValue={setValue}
                    defaultValue={supplier?.data?.peyTerm}
                    label="Pay Term"
                    onChange={() => {}}
                  >
                    <Option value="Months">Months</Option>
                    <Option value="Days">Days</Option>
                  </Select>
                </div>
                <div className="my-2">
                  <InputField
                    isPassword={false}
                    isIcon={false}
                    name={"address"}
                    register={register}
                    label={"Address :"}
                    type={"text"}
                    errors={errors}
                    defaultValue={supplier?.data?.address}
                  />{" "}
                </div>
              </div>
              {/* midel part */}
              {/* left part  */}
              <div className="flex-1 w-full p-2 -mt-1">
                {" "}
                <div className="my-2">
                  <InputField
                    isPassword={false}
                    isIcon={false}
                    name={"city"}
                    register={register}
                    label={"City :"}
                    type={"text"}
                    errors={errors}
                    defaultValue={supplier?.data?.city}
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
                    defaultValue={supplier?.data?.state}
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
                    defaultValue={supplier?.data?.zipCode}
                  />{" "}
                </div>
                <div className="my-2">
                  <Select
                    name="paidStatus"
                    setValue={setValue}
                    label="Paid Status"
                    defaultValue={supplier?.data?.paidStatus}
                    onChange={() => {}}
                  >
                    <Option value="Paid">Paid</Option>
                    <Option value="Due">Due</Option>
                  </Select>
                </div>
                <div className="mb-[54px]"></div>
              </div>
              {/* left part */}
            </div>{" "}
          </div>
          {/* part 1 */}
          {/* part 2 */}

          <div className="flex justify-center items-center mt-7">
            <button className="relative rounded px-5 py-2.5 overflow-hidden group bg-brand  hover:bg-gradient-to-r hover:from-brand2 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300">
              <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
              <span className="relative">Edit New Suppliers</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSupplierPage;
