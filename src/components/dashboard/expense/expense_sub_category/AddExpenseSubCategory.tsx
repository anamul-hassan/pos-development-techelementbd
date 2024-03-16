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
import { capitalizeEveryWord } from "@/utils/helpers/capitalizeEveryWord";
import { yupResolver } from "@hookform/resolvers/yup";
import { AlertCircle } from "lucide-react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useAddExpenseSubCategoryMutation } from "@/store/expense_sub_category/expense_sub_category";
import { useGetAllExpenseCategoryQuery } from "@/store/expense_category/expenseCategoryApi";
import { addEditExpenseSubCategorySchema } from "@/schemas/expense/expense_sub_category_schema";

interface IAddSubCategoryProps {
  setAddSubCategoryOpen: (addSubCategoryOpen: boolean) => void;
}

const AddExpenseSubCategory: FC<IAddSubCategoryProps> = ({
  setAddSubCategoryOpen,
}) => {
  const { toast } = useToast();

  // CATEGORY LIST QUERY
  const { data: categories, isLoading: categoryLoading } =
    useGetAllExpenseCategoryQuery(undefined);

  const [
    addExpenseSubCategory,
    {
      isLoading: addExpenseSubCategoryLoading,
      error: addExpenseSubCategoryError,
    },
  ] = useAddExpenseSubCategoryMutation() as any;

  // REACT HOOK FORM TO ADD EXPENSE SUBCATEGORY
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm({ resolver: yupResolver(addEditExpenseSubCategorySchema) });

  const handleAddSubCategory = async (data: any) => {
    const result = await addExpenseSubCategory(data);
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
        className="flex flex-col gap-y-1 gap-x-6"
        size="full"
        heading="Add New Sub Category"
      >
        <div className="flex flex-col items-center gap-2">
          <InputWrapper
            label="Write Sub-Category Name ✽"
            labelFor="new_sub"
            error={errors?.name?.message}
          >
            <Input
              {...register("name")}
              type="text"
              id="new_sub"
              placeholder="Write sub-category name"
            />
          </InputWrapper>
          <InputWrapper
            label="Select Category ✽"
            labelFor="category"
            error={errors?.expenseCategoryId?.message}
            className="w-full col-span-4"
          >
            <Select
              value={watch("expenseCategoryId")?.toString()}
              onValueChange={(value: string) =>
                setValue("expenseCategoryId", +value)
              }
            >
              <SelectTrigger id="category" className="">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories?.data?.length > 0 &&
                  categories?.data?.map((singleSubCategory: any) => (
                    <SelectItem
                      key={singleSubCategory?.id}
                      value={singleSubCategory?.id?.toString()}
                    >
                      {capitalizeEveryWord(singleSubCategory?.name)}
                    </SelectItem>
                  ))}
                {!categories?.data?.length && categoryLoading && (
                  <div className="flex justify-center w-full h-8 items-center bg-accent rounded-md">
                    <ButtonLoader />
                  </div>
                )}
              </SelectContent>
            </Select>
          </InputWrapper>
        </div>
      </FormWrapper>

      {/* ERROR MESSAGE */}
      <div className="flex justify-between items-center my-2 w-full">
        <div className="flex justify-start w-full md:max-w-[300px]">
          {addExpenseSubCategoryError &&
            Object?.keys(addExpenseSubCategoryError)?.length > 0 &&
            "data" in addExpenseSubCategoryError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Add Expense Sub-category Error</AlertTitle>
                <AlertDescription>
                  {addExpenseSubCategoryError?.data?.message ||
                    "Something went wrong! try again"}
                </AlertDescription>
              </Alert>
            )}
        </div>
        {/* ADD EXPENSE SUB-CATEGORY BUTTON */}
        <div className="flex justify-end w-1/2">
          <Button disabled={addExpenseSubCategoryLoading} type="submit">
            {addExpenseSubCategoryLoading && <ButtonLoader />}
            Add Now
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AddExpenseSubCategory;
