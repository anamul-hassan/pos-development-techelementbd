import FormWrapper from "@/components/common/form/FormWrapper";
import InputWrapper from "@/components/common/form/InputWrapper";
import ButtonLoader from "@/components/common/loader/ButtonLoader";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { addEditProductCategorySchema } from "@/schemas/product/product_category_schema";
import { useUpdateProductCategoryMutation } from "@/store/product_category/productCategoryApi";
import { removeEmptyStringOrZeroProperties } from "@/utils/helpers/removeEmptyStringProperties";
import { yupResolver } from "@hookform/resolvers/yup";
import { AlertCircle } from "lucide-react";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";

interface IEditProductCategoryProps {
  actionItem: any;
}

const EditProductCategory: FC<IEditProductCategoryProps> = ({ actionItem }) => {
  const { toast } = useToast();

  // UPDATE CATEGORY MUTATION
  const [
    updateProductCategory,
    { isLoading: updateCategoryLoading, error: updateCategoryError },
  ] = useUpdateProductCategoryMutation({}) as any;

  // REACT HOOK FORM TO EDIT CATEGORY
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({ resolver: yupResolver(addEditProductCategorySchema) });

  // CATEGORY EDIT HANDLER
  const handleEditCategory = async (data: any) => {
    const updateData = removeEmptyStringOrZeroProperties(data, [
      "categoryCode",
      "description",
    ]);

    const result = await updateProductCategory({
      id: actionItem.id,
      data: updateData,
    });
    if (result?.data?.data && result?.data?.success === true) {
      toast({
        title: "Update Category Message",
        description: result?.data?.message,
      });
      reset();
    }
  };

  // SET PREVIOUS DATA TO THE FORM
  useEffect(() => {
    setValue("categoryName", actionItem?.categoryName || "");
    setValue("categoryCode", actionItem?.categoryCode || "");
    setValue("description", actionItem?.description || "");
  }, [actionItem, setValue]);

  return (
    <form onSubmit={handleSubmit(handleEditCategory)}>
      <FormWrapper
        className="flex flex-col gap-y-1 gap-x-4 md:gap-x-6"
        size="full"
        heading="Add New Sub-category"
      >
        {/* CATEGORY NAME */}
        <InputWrapper
          label="Write Category Name ✽"
          labelFor="category_name"
          error={errors?.categoryName?.message}
        >
          <Input
            {...register("categoryName")}
            type="text"
            id="category_name"
            placeholder="Write sub-category name"
          />
        </InputWrapper>

        {/* CATEGORY CODE  */}
        <InputWrapper
          label="Write Category Code"
          labelFor="category_code"
          error={errors?.categoryCode?.message}
        >
          <Input
            {...register("categoryCode")}
            type="text"
            id="category_code"
            placeholder="Write category code"
          />
        </InputWrapper>
        {/* CATEGORY DESCRIPTION */}
        <InputWrapper
          label="Write Category Description"
          labelFor="category_description"
          error={errors?.categoryCode?.message}
        >
          <Textarea
            {...register("description")}
            id="category_description"
            placeholder="Write category description"
          />
        </InputWrapper>
      </FormWrapper>

      {/* ERROR MESSAGE */}
      <div className="flex justify-between items-center my-2 w-full">
        <div className="flex justify-start w-full md:max-w-[300px]">
          {updateCategoryError &&
            Object?.keys(updateCategoryError)?.length > 0 &&
            "data" in updateCategoryError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Add Product Error</AlertTitle>
                <AlertDescription>
                  {updateCategoryError?.data?.message ||
                    "Something went wrong! try again"}
                </AlertDescription>
              </Alert>
            )}
        </div>
        {/* EDIT CATEGORY BUTTON */}
        <div className="flex justify-end w-1/2">
          <Button disabled={updateCategoryLoading} type="submit">
            {updateCategoryLoading && <ButtonLoader />}
            Update Now
          </Button>
        </div>
      </div>
    </form>
  );
};

export default EditProductCategory;
