import DataLoader from "@/components/common/loader/DataLoader";
import InputField from "@/components/previous/all/InputField";
import { Option, Select } from "@/components/previous/all/Select";
import { useToast } from "@/components/ui/use-toast";
import { ExpenseSubEditCategorySchema } from "@/schemas/expense/expense_sub_category_edit";
import { useGetAllExpenseCategoryQuery } from "@/store/expense_category/expenseCategoryApi";
import {
  useGetAllExpenseSubCategoryQuery,
  useUpdateExpenseSubCategoryMutation,
} from "@/store/expense_sub_category/expense_sub_category";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const SubExpenseCategoryEdit = () => {
  const { id } = useParams();
  const { toast } = useToast() as any;
  const { data: Invests, isLoading } = useGetAllExpenseSubCategoryQuery(
    "All"
  ) as any;
  // const { data: accounts } = useGetAccountsQuery("All");

  const [updateInvests] = useUpdateExpenseSubCategoryMutation() as any;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue: setValue,
  } = useForm({ resolver: yupResolver(ExpenseSubEditCategorySchema) });
  const { data: categories } = useGetAllExpenseCategoryQuery(undefined);
  const handleEditInvests = async (data: any) => {
    try {
      const result = await updateInvests({ id, data });
      if (result?.data?.data && result?.data?.success === true) {
        toast({
          description: result?.data?.message,
        });

        navigate("/expense_sub_category");
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
              isPassword={false}
              isIcon={false}
              register={register}
              name={"name"}
              label={"Sub Category Name"}
              type={"text"}
              errors={errors}
              defaultValue={singleInvest?.name}
            />
          </div>

          <div className="w-full mb-3">
            <Select
              label="select Category Name"
              setValue={setValue}
              name="expenseCategoryId"
            >
              {categories?.data?.map((category: any) => (
                <Option key={category?.id} value={category?.id}>
                  {category?.name}
                </Option>
              ))}
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

export default SubExpenseCategoryEdit;
