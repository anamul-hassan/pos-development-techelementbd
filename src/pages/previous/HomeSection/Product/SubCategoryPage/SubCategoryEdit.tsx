import DataLoader from "@/components/common/loader/DataLoader";
import InputField from "@/components/previous/all/InputField";
import { Option, Select } from "@/components/previous/all/Select";
import { useToast } from "@/components/ui/use-toast";
import { addOrEditSubCategorySchema } from "@/schemas/product/sub_category_schema";
import { useGetAllProductCategoriesQuery } from "@/store/product_category/productCategoryApi";
import {
  useGetSubCategoryQuery,
  useUpdateSubCategoryMutation,
} from "@/store/sub_category/subCategoryApi";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const SubCategoryEdit = () => {
  const { toast } = useToast();
  const { id } = useParams();

  const { data: Invests, isLoading } = useGetSubCategoryQuery("All") as any;
  const { data: categories } = useGetAllProductCategoriesQuery(
    undefined
  ) as any;

  const [updateSubCategory] = useUpdateSubCategoryMutation({}) as any;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue: setValue,
  } = useForm({ resolver: yupResolver(addOrEditSubCategorySchema) });
  const handleEditSubCategory = async (data: any) => {
    try {
      const result = await updateSubCategory({ id, data });
      if (result?.data?.data && result?.data?.success === true) {
        toast({
          description: result?.data?.message,
        });
        navigate("/sub_category_list");
      }
    } catch (error: any) {
      toast({
        description: error?.message,
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
      <form onSubmit={handleSubmit(handleEditSubCategory)}>
        <div className="mt-20 lg:flex gap-5">
          <div className="w-full mb-3">
            <InputField
              isPassword={false}
              isIcon={false}
              register={register}
              name={"subCategoryName"}
              label={"Sub Category Name*"}
              type={"text"}
              errors={errors}
              defaultValue={singleInvest?.subCategoryName}
            />
          </div>
          <div className="w-full mb-3">
            <div className="w-[100%]">
              <Select
                label={singleInvest?.warrantyType}
                setValue={setValue}
                name="categoryId"
                onChange={() => {}}
              >
                {categories?.data?.map((category: any) => (
                  <Option key={category?.id} value={category?.id}>
                    {category?.categoryName}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center mt-7">
          <button className="relative rounded px-5 py-2.5 overflow-hidden group bg-brand  hover:bg-gradient-to-r hover:from-brand2 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300">
            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
            <span className="relative">Edit Sub-category</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubCategoryEdit;
