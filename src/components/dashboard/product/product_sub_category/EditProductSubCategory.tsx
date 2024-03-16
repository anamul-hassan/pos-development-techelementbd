import FormWrapper from "@/components/common/form/FormWrapper";
import InputWrapper from "@/components/common/form/InputWrapper";
import ButtonLoader from "@/components/common/loader/ButtonLoader";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { addEditProductSubCategorySchema } from "@/schemas/product/product_sub_category_schema";
import { useGetProductCategoriesQuery } from "@/store/product_category/productCategoryApi";
import { useUpdateProductSubCategoryMutation } from "@/store/product_sub_category/productSubCategoryApi";
import { capitalizeEveryWord } from "@/utils/helpers/capitalizeEveryWord";
import { yupResolver } from "@hookform/resolvers/yup";
import { AlertCircle } from "lucide-react";

import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";

interface IEditProductSubCategoryProps {
  actionItem: any;
}

const EditProductSubCategory: FC<IEditProductSubCategoryProps> = ({
  actionItem,
}) => {
  const { toast } = useToast();
  // GET ALL CATEGORIES QUERY
  const { data: categoryList, isLoading: categoryLoading } =
    useGetProductCategoriesQuery({
      search: "",
      page: 1,
      size: 100000000,
    });

  // ADD SUB-CATEGORY MUTATION
  const [
    updateProductSubCategory,
    { isLoading: editSubCategoryLoading, error: editSubCategoryError },
  ] = useUpdateProductSubCategoryMutation({}) as any;

  // REACT HOOK FORM TO ADD PRODUCT
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm({ resolver: yupResolver(addEditProductSubCategorySchema) });

  const handleEditSubCategory = async (data: any) => {
    const result = await updateProductSubCategory({ id: actionItem.id, data });
    if (result?.data?.data && result?.data?.success === true) {
      toast({
        title: "Update Sub-category Message",
        description: result?.data?.message,
      });
      reset();
    }
  };

  // SET THE PREVIOUS DATA TO THE FORM
  useEffect(() => {
    setValue("subCategoryName", actionItem?.subCategoryName || "");
    setValue("categoryId", actionItem?.categoryId);
  }, [actionItem, setValue]);

  return (
    <form onSubmit={handleSubmit(handleEditSubCategory)}>
      <FormWrapper
        className="flex flex-col gap-y-1 gap-x-4 md:gap-x-6"
        size="full"
        heading="Update New Sub-category"
      >
        {/* SUB-CATEGORY NAME */}
        <InputWrapper
          label="Write Sub-category Name ✽"
          labelFor="sub_category_name"
          error={errors?.subCategoryName?.message}
        >
          <Input
            {...register("subCategoryName")}
            type="text"
            id="sub_category_name"
            placeholder="Write sub-category name"
          />
        </InputWrapper>

        {/* CATEGORY  */}
        <InputWrapper
          label="Select Category ✽"
          labelFor="category"
          error={errors?.categoryId?.message}
        >
          <Select
            value={watch("categoryId")?.toString()}
            onValueChange={(value: string) => setValue("categoryId", +value)}
          >
            <SelectTrigger id="category">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="max-h-[200px] overflow-y-auto">
              {categoryList?.data?.length > 0 &&
                categoryList?.data?.map((singleSubCategory: any) => (
                  <SelectItem
                    key={singleSubCategory?.id}
                    value={singleSubCategory?.id?.toString()}
                  >
                    {capitalizeEveryWord(singleSubCategory?.categoryName)}
                  </SelectItem>
                ))}
              {!categoryList?.data?.length && categoryLoading && (
                <div className="flex justify-center w-full h-8 items-center bg-accent rounded-md">
                  <ButtonLoader />
                </div>
              )}
            </SelectContent>
          </Select>
        </InputWrapper>
      </FormWrapper>

      {/* ERROR MESSAGE */}
      <div className="flex justify-between items-center my-2 w-full">
        <div className="flex justify-start w-full md:max-w-[300px]">
          {editSubCategoryError &&
            Object?.keys(editSubCategoryError)?.length > 0 &&
            "data" in editSubCategoryError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Add Product Error</AlertTitle>
                <AlertDescription>
                  {editSubCategoryError?.data?.message ||
                    "Something went wrong! try again"}
                </AlertDescription>
              </Alert>
            )}
        </div>
        {/* ADD SUB-CATEGORY BUTTON */}
        <div className="flex justify-end w-1/2">
          <Button disabled={editSubCategoryLoading} type="submit">
            {editSubCategoryLoading && <ButtonLoader />}
            Update Now
          </Button>
        </div>
      </div>
    </form>
  );
};

export default EditProductSubCategory;
