import DataLoader from "@/components/common/loader/DataLoader";
import InputField from "@/components/previous/all/InputField";
import { Option, Select } from "@/components/previous/all/Select";
import { useToast } from "@/components/ui/use-toast";
import { UnitsEditSchema } from "@/schemas/units/unit_edit_schema";
import { useGetUnitsQuery, useUpdateUnitMutation } from "@/store/unit/unitApi";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const UnitEdit = () => {
  const { id } = useParams();
  const { toast } = useToast();

  const { data: Invests, isLoading } = useGetUnitsQuery("All") as any;
  // const { data: accounts } = useGetAccountsQuery("All");

  const [updateInvests] = useUpdateUnitMutation({}) as any;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue: setValue,
  } = useForm({ resolver: yupResolver(UnitsEditSchema) });
  const handleEditInvests = async (data: any) => {
    try {
      const result = await updateInvests({ id, data });
      if (result?.data?.data && result?.data?.success === true) {
        toast({
          description: result?.data?.message,
        });
        navigate("/unit_list");
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
          <div className="w-full">
            <InputField
              isPassword={false}
              isIcon={false}
              name={"name"}
              register={register}
              label={"Name*"}
              type={"text"}
              defaultValue={singleInvest?.name}
              errors={errors}
            />{" "}
          </div>
          <div className="w-full">
            <InputField
              isPassword={false}
              isIcon={false}
              name={"shortName"}
              register={register}
              label={"Short Name*"}
              type={"text"}
              defaultValue={singleInvest?.shortName}
              errors={errors}
            />{" "}
          </div>
          <div className="w-[100%]">
            <Select setValue={setValue} name="allowDecimal" onChange={() => {}}>
              <Option value="Yes">Yes</Option>
              <Option value="No">No</Option>
            </Select>
          </div>
        </div>

        <div className="flex justify-center items-center mt-7">
          <button className="relative rounded px-5 py-2.5 overflow-hidden group bg-brand  hover:bg-gradient-to-r hover:from-brand2 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300">
            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
            <span className="relative">Edit Unit</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default UnitEdit;
