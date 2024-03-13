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
import { addOrEditSubCategorySchema } from "@/schemas/product/sub_category_schema";
import { useGetProductCategoriesQuery } from "@/store/product_category/productCategoryApi";
import { useAddProductSubCategoryMutation } from "@/store/product_sub_category/productSubCategoryApi";
import { capitalizeEveryWord } from "@/utils/helpers/capitalizeEveryWord";

import { yupResolver } from "@hookform/resolvers/yup";
import { AlertCircle } from "lucide-react";
import { FC } from "react";
import { useForm } from "react-hook-form";

interface IAddSubCategoryProps {
  setAddSubCategoryOpen: (addSubCategoryOpen: boolean) => void;
}

const AddSubCategory: FC<IAddSubCategoryProps> = ({
  setAddSubCategoryOpen,
}) => {
  const { toast } = useToast();

  // GET ALL CATEGORIES QUERY
  const { data: categoryList, isLoading: categoryLoading } =
    useGetProductCategoriesQuery({
      page: 1,
      size: 1000000,
    }) as any;

  // ADD SUB-CATEGORY MUTATION
  const [
    addSubCategory,
    { isLoading: addSubCategoryLoading, error: addSubCategoryError },
  ] = useAddProductSubCategoryMutation({}) as any;

  // REACT HOOK FORM TO ADD PRODUCT
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm({ resolver: yupResolver(addOrEditSubCategorySchema) });

  const handleAddSubCategory = async (data: any) => {
    const result = await addSubCategory(data);
    if (result?.data?.data && result?.data?.success === true) {
      toast({
        title: "Add Sub-category Message",
        description: result?.data?.message,
      });
      reset();
      setAddSubCategoryOpen(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleAddSubCategory)}>
      <FormWrapper
        className="flex flex-col gap-y-1 gap-x-4 md:gap-x-6"
        size="full"
        heading="Add New Sub-category"
      >
        {/* SUB-CATEGORY NAME */}
        <InputWrapper
          label="Write Sub-category Name"
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
          {addSubCategoryError &&
            Object?.keys(addSubCategoryError)?.length > 0 &&
            "data" in addSubCategoryError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Add Product Error</AlertTitle>
                <AlertDescription>
                  {addSubCategoryError?.data?.message ||
                    "Something went wrong! try again"}
                </AlertDescription>
              </Alert>
            )}
        </div>
        {/* ADD SUB-CATEGORY BUTTON */}
        <div className="flex justify-end w-1/2">
          <Button disabled={addSubCategoryLoading} type="submit">
            {addSubCategoryLoading && <ButtonLoader />}
            Add Now
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AddSubCategory;
