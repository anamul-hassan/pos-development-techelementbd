import DataLoader from "@/components/common/loader/DataLoader";
import InputField from "@/components/previous/all/InputField";
import { Option, Select } from "@/components/previous/all/Select";
import { useToast } from "@/components/ui/use-toast";
import { addProductSchema } from "@/schemas/product/product_schema";
import { useGetBrandsQuery } from "@/store/brand/brandApi";
import { useGetAllExpenseCategoryQuery } from "@/store/expense_category/expenseCategoryApi";
import { useUpdateProductMutation } from "@/store/product/productApi";
import { useGetSubCategoryQuery } from "@/store/sub_category/subCategoryApi";
import { useGetUnitsQuery } from "@/store/unit/unitApi";
import { shareBranchAndUserInfo } from "@/utils/helpers/shareBranchAndUserInfo";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const EditProductPage = () => {
  const { toast } = useToast();
  const { branchId } = shareBranchAndUserInfo();
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: brands } = useGetBrandsQuery(undefined) as any;
  const { data: categories } = useGetAllExpenseCategoryQuery(undefined) as any;
  const { data: subCategories } = useGetSubCategoryQuery(undefined) as any;
  const { data: units } = useGetUnitsQuery(undefined) as any;
  const [
    editProduct,
    { isLoading: isLoadingEditProduct, isSuccess: editProductSuccess },
  ] = useUpdateProductMutation({}) as any;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({ resolver: yupResolver(addProductSchema) });
  const handleEditProduct = async (data: any) => {
    if (data?.branchId) {
      data.branchId = branchId;
    }
    await editProduct({ id, data });
  };

  useEffect(() => {
    if (editProductSuccess) {
      toast({
        description: "Product info updated successfully",
      });
      reset();
      navigate("/list_products");
    }
  }, [editProductSuccess, toast, reset, navigate]);

  if (isLoadingEditProduct) {
    return <DataLoader />;
  }

  return (
    <div>
      <div className="w-[94%] mx-auto">
        <h1 className="my-5 ml-2">
          <span className="text-2xl font-bold">Add New Product</span>{" "}
        </h1>
      </div>
      <form onSubmit={handleSubmit(handleEditProduct)} className="px-10 pb-5">
        {/* part 1 */}
        <div className="w-[98%] mx-auto bg-slate-100 pb-10 shadow-lg rounded border-t-2 border-brand">
          <div className="flex flex-col md:flex-row items-center justify-center w-[90%] mx-auto">
            {/* right part1 65b2944347bcb9977fd3a8c6 */}
            <div className="flex-1 w-full p-2">
              <div className="my-4">
                <InputField
                  isPassword={false}
                  isIcon={false}
                  register={register}
                  name={"productName"}
                  label={"Products Name"}
                  type={"text"}
                  errors={errors}
                  // defaultValue={productName}
                />{" "}
              </div>
              <div className="my-4">
                <InputField
                  isPassword={false}
                  isIcon={false}
                  register={register}
                  name={"sku"}
                  label={"SKU"}
                  type={"text"}
                  errors={errors}
                />{" "}
              </div>
              <div className="my-4">
                <Select
                  name={"brandId"}
                  label="Select Brand"
                  setValue={setValue}
                >
                  {brands &&
                    brands?.data.length > 0 &&
                    brands?.data?.map((br: any) => (
                      <Option key={br?.id} value={br?.id}>
                        {br?.brand}
                      </Option>
                    ))}
                </Select>
              </div>
              <div className="my-4">
                <InputField
                  isPassword={false}
                  isIcon={false}
                  register={register}
                  name={"purchasePrice"}
                  label={"Purchase Price"}
                  type={"number"}
                  errors={errors}
                />{" "}
              </div>
            </div>
            {/* right part1 */}
            {/* midel part2 */}
            <div className="flex-1 w-full p-2">
              <div className="my-4">
                <Select
                  name={"categoryId"}
                  label="Select Category"
                  setValue={setValue}
                >
                  {categories &&
                    categories?.data.length > 0 &&
                    categories?.data?.map((ct: any) => (
                      <Option key={ct?.id} value={ct?.id}>
                        {ct?.categoryName}
                      </Option>
                    ))}
                </Select>
              </div>
              <div className="my-4">
                <Select
                  name={"subCategoryId"}
                  label="Select Sub Category"
                  setValue={setValue}
                >
                  {subCategories &&
                    subCategories?.data.length > 0 &&
                    subCategories?.data?.map((sct: any) => (
                      <Option key={sct?.id} value={sct?.id}>
                        {sct?.subCategoryName}
                      </Option>
                    ))}
                </Select>
              </div>
              <div className="my-4">
                <Select
                  name={"unitsId"}
                  label="Select Unit"
                  setValue={setValue}
                >
                  {units &&
                    units?.data.length > 0 &&
                    units?.data?.map((ut: any) => (
                      <Option key={ut?.id} value={ut?.id}>
                        {ut?.name}
                      </Option>
                    ))}
                </Select>
              </div>
              <div className="my-4">
                <InputField
                  isPassword={false}
                  isIcon={false}
                  register={register}
                  name={"wholesalePrice"}
                  label={"Whole Sell Price"}
                  type={"number"}
                  errors={errors}
                />{" "}
              </div>
            </div>
            {/* midel part2 */}
            {/* left part3  */}
            <div className="flex-1 w-full p-2">
              <div className="my-4">
                <InputField
                  isPassword={false}
                  isIcon={false}
                  register={register}
                  name={"warranty"}
                  label={"Warranty Duration"}
                  type={"text"}
                  errors={errors}
                />{" "}
              </div>
              <div className="my-4">
                <InputField
                  isPassword={false}
                  isIcon={false}
                  name={"alertQuantity"}
                  register={register}
                  label={"Alert Quantity"}
                  type={"number"}
                  errors={errors}
                />{" "}
              </div>
              <div className="my-4">
                <InputField
                  isPassword={false}
                  isIcon={false}
                  register={register}
                  name={"IME"}
                  label={"IME"}
                  type={"text"}
                  errors={errors}
                />{" "}
              </div>
              <div className="my-4">
                <InputField
                  isPassword={false}
                  isIcon={false}
                  register={register}
                  name={"retailPrice"}
                  label={"Retail Price"}
                  type={"number"}
                  errors={errors}
                />{" "}
              </div>
            </div>

            {/* left part4 */}
            <div className="flex-1 w-full p-2">
              <div className="">
                <div className="my-4">
                  <InputField
                    isPassword={false}
                    isIcon={false}
                    register={register}
                    name={"image"}
                    label={"Product Image"}
                    type={"text"}
                    errors={errors}
                  />{" "}
                </div>
                <div className="my-4">
                  <InputField
                    isPassword={false}
                    isIcon={false}
                    register={register}
                    name={"quantity"}
                    label={"Quantity"}
                    type={"number"}
                    errors={errors}
                  />{" "}
                </div>
                <div className="my-4 flex items-center gap-3">
                  <div>
                    <InputField
                      isPassword={false}
                      isIcon={false}
                      register={register}
                      name={"ram"}
                      label={"RAM"}
                      type={"text"}
                      errors={errors}
                    />{" "}
                  </div>
                  <div>/</div>
                  <div>
                    <InputField
                      isPassword={false}
                      isIcon={false}
                      register={register}
                      name={"rom"}
                      label={"ROM"}
                      type={"text"}
                      errors={errors}
                    />{" "}
                  </div>
                </div>
                <div className="my-4">
                  <InputField
                    isPassword={false}
                    isIcon={false}
                    register={register}
                    name={"totalMargin"}
                    label={"Total Margin"}
                    type={"number"}
                    errors={errors}
                  />{" "}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* part 1 */}
        <div className="flex justify-center items-center mt-7">
          <button className="relative rounded px-5 py-2.5 overflow-hidden group bg-brand  hover:bg-gradient-to-r hover:from-brand2 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300">
            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
            <span className="relative">Edit Product</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProductPage;
