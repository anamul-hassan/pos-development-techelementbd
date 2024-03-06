import DataLoader from "@/components/common/loader/DataLoader";
import InputField from "@/components/previous/all/InputField";
import { useToast } from "@/components/ui/use-toast";
import { ExpenseCategoryEditSchema } from "@/schemas/expense/expense_category_edit";
import {
  useGetAllExpenseCategoryQuery,
  useUpdateExpenseCategoryMutation,
} from "@/store/expense_category/expenseCategoryApi";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const ExpenseCategoryEdit = () => {
  const { id } = useParams();
  const { toast } = useToast() as any;

  const { data: Invests, isLoading } = useGetAllExpenseCategoryQuery(
    "All"
  ) as any;
  // const { data: accounts } = useGetAccountsQuery("All");

  const [updateInvests] = useUpdateExpenseCategoryMutation() as any;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    // setValue: setValue,
  } = useForm({ resolver: yupResolver(ExpenseCategoryEditSchema) });
  const handleEditInvests = async (data: any) => {
    try {
      const result = await updateInvests({ id, data });
      if (result?.data?.data && result?.data?.success === true) {
        toast({
          description: result?.data?.message,
        });

        navigate("/expense_category");
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
        <div className="mt-20 lg:flex gap-5">
          <div className="w-full mb-3">
            <InputField
              defaultValue={singleInvest?.name}
              isPassword={false}
              isIcon={false}
              name={"name"}
              register={register}
              label={"Category Name*"}
              type={"text"}
              errors={errors}
            />{" "}
          </div>
        </div>

        <div className="flex justify-center items-center mt-7">
          <button className="relative rounded px-5 py-2.5 overflow-hidden group bg-brand  hover:bg-gradient-to-r hover:from-brand2 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300">
            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
            <span className="relative">Edit Expense Category</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseCategoryEdit;
