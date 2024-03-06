import { useForm } from "react-hook-form";

import { useNavigate, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useGetSingleWarrantyQuery,
  useUpdateWarrantyMutation,
} from "@/store/warranty/warrantyApi";
import { addWarrantySchema } from "@/schemas/warranty/warranty_schema";
import DataLoader from "@/components/common/loader/DataLoader";
import InputField from "@/components/previous/all/InputField";
import { Option, Select } from "@/components/previous/all/Select";
import { useToast } from "@/components/ui/use-toast";

const WarrantyEdit = () => {
  const { id } = useParams();
  const { toast } = useToast();

  const { data: Invests, isLoading } = useGetSingleWarrantyQuery("All") as any;
  // const { data: accounts } = useGetAccountsQuery("All");

  const [updateInvests] = useUpdateWarrantyMutation({}) as any;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue: setValue,
  } = useForm({ resolver: yupResolver(addWarrantySchema) });
  const handleEditInvests = async (data: any) => {
    try {
      const result = await updateInvests({ id, data });
      if (result?.data?.data && result?.data?.success === true) {
        toast({
          description: result?.data?.message,
        });
        navigate("/warranty_list");
      }
    } catch (err: any) {
      toast({
        description: err.message,
      });
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
        <div className="mt-20 lg:flex gap-5">
          <div className="w-full mb-3">
            <InputField
              isPassword={false}
              defaultValue={singleInvest?.warranty}
              isIcon={false}
              name={"warranty"}
              register={register}
              label={"Warrnty"}
              type={"text"}
              errors={errors}
            />{" "}
            {/* <input
                        type="text"
                        defaultValue={modal2?.warranty}
                        name={"warranty"}
                        {...register("warranty")}
                        className={`peer h-10 w-full border-brand border-[1px] rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg`}
                      /> */}
          </div>
          <div className="w-full">
            <Select
              name={"warrantyType"}
              label={singleInvest?.warrantyType}
              setValue={setValue}
              onChange={() => {}}
            >
              <Option value={"Official"}>Official</Option>
              <Option value={"UnOfficial"}>UnOfficial</Option>
            </Select>
          </div>
        </div>

        <div className="flex justify-center items-center mt-7">
          <button className="relative rounded px-5 py-2.5 overflow-hidden group bg-brand  hover:bg-gradient-to-r hover:from-brand2 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300">
            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
            <span className="relative">Edit Waranty</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default WarrantyEdit;
