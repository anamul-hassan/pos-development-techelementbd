import FormWrapper from "@/components/common/form/FormWrapper";
import InputWrapper from "@/components/common/form/InputWrapper";
import ButtonLoader from "@/components/common/loader/ButtonLoader";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { addEditProductCategorySchema } from "@/schemas/product/product_category_schema";
import { useAddProductCategoryMutation } from "@/store/product_category/productCategoryApi";
import { removeEmptyStringOrZeroProperties } from "@/utils/helpers/removeEmptyStringProperties";
import { yupResolver } from "@hookform/resolvers/yup";
import { AlertCircle } from "lucide-react";
import { FC } from "react";
import { useForm } from "react-hook-form";

interface IAddProductCategoryProps {
  setAddCategoryOpen: (addCategoryOpen: boolean) => void;
}

const AddProductCategory: FC<IAddProductCategoryProps> = ({
  setAddCategoryOpen,
}) => {
  const { toast } = useToast();

  // ADD CATEGORY MUTATION
  const [
    addProductCategory,
    { isLoading: addCategoryLoading, error: addCategoryError },
  ] = useAddProductCategoryMutation({}) as any;

  // REACT HOOK FORM TO ADD CATEGORY
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(addEditProductCategorySchema) });

  const handleAddCategory = async (data: any) => {
    const updateData = removeEmptyStringOrZeroProperties(data, [
      "categoryCode",
      "description",
    ]);

    const result = await addProductCategory(updateData);
    if (result?.data?.data && result?.data?.success) {
      toast({
        title: "Add Category Message",
        description: result?.data?.message,
      });
      reset();
      setAddCategoryOpen(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleAddCategory)}>
      <FormWrapper
        className="flex flex-col gap-y-1 gap-x-4 md:gap-x-6"
        size="full"
        heading="Add New Category"
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
          {addCategoryError &&
            Object?.keys(addCategoryError)?.length > 0 &&
            "data" in addCategoryError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Add Product Error</AlertTitle>
                <AlertDescription>
                  {addCategoryError?.data?.message ||
                    "Something went wrong! try again"}
                </AlertDescription>
              </Alert>
            )}
        </div>
        {/* ADD CATEGORY BUTTON */}
        <div className="flex justify-end w-1/2">
          <Button disabled={addCategoryLoading} type="submit">
            {addCategoryLoading && <ButtonLoader />}
            Add Now
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AddProductCategory;
