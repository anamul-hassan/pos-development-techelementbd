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
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUpdateExpenseSubCategoryMutation } from "@/store/expense_sub_category/expense_sub_category";
import { useGetAllExpenseCategoryQuery } from "@/store/expense_category/expenseCategoryApi";
import { addEditExpenseSubCategorySchema } from "@/schemas/expense/expense_sub_category_schema";

interface IEditSubCategoryProps {
  actionItem: any;
}
const EditExpenseSubCategory: FC<IEditSubCategoryProps> = ({ actionItem }) => {
  const { toast } = useToast();

  // CATEGORY LIST QUERY
  const { data: categories, isLoading: categoryLoading } =
    useGetAllExpenseCategoryQuery(undefined) as any;

  const [
    updateExpenseSubCategory,
    {
      isLoading: updateExpenseSubCategoryLoading,
      error: updateExpenseSubCategoryError,
    },
  ] = useUpdateExpenseSubCategoryMutation({}) as any;

  // REACT HOOK FORM TO ADD USER
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm({ resolver: yupResolver(addEditExpenseSubCategorySchema) });

  const handleEditSubCategory = async (data: any) => {
    const result = (await updateExpenseSubCategory({
      id: actionItem?.id,
      data: data,
    })) as any;
    if (result?.data?.success) {
      toast({
        title: "Update Sub-category Message",
        description: result?.data?.message,
      });
      reset();
    }
  };

  useEffect(() => {
    setValue("name", actionItem?.name || "");
    setValue("expenseCategoryId", actionItem?.expenseCategoryId);
  }, [actionItem, setValue]);

  return (
    <form onSubmit={handleSubmit(handleEditSubCategory)}>
      <FormWrapper
        className="flex flex-col gap-y-1 gap-x-6"
        size="full"
        heading="Update Sub-category Information"
      >
        <div className="flex flex-col items-center gap-2">
          <InputWrapper
            label="Write Sub Category Name"
            labelFor="new_sub"
            error={errors?.name?.message?.toString()}
          >
            <Input
              {...register("name")}
              type="text"
              id="new_sub"
              placeholder="Write Sub Category Name"
              defaultValue={actionItem?.name}
            />
          </InputWrapper>
          <InputWrapper
            label="Category Name"
            labelFor="category"
            error={errors?.expenseCategoryId?.message?.toString()}
            className="w-full col-span-4"
          >
            <Select
              value={watch("expenseCategoryId")?.toString()}
              onValueChange={(value: string) =>
                setValue("expenseCategoryId", +value)
              }
            >
              <SelectTrigger id="category" className="">
                <SelectValue placeholder="Category Name" />
              </SelectTrigger>
              <SelectContent>
                {categories?.data?.length > 0 &&
                  categories?.data?.map((singleCategory: any) => (
                    <SelectItem
                      key={singleCategory?.id}
                      value={singleCategory?.id?.toString()}
                    >
                      {capitalizeEveryWord(singleCategory?.name)}
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
        {/* ERROR MESSAGE */}
        <div className="flex justify-between items-center my-2 w-full">
          <div className="flex justify-start w-full md:max-w-[300px]">
            {updateExpenseSubCategoryError &&
              Object?.keys(updateExpenseSubCategoryError)?.length > 0 &&
              "data" in updateExpenseSubCategoryError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Update Expense Sub-category Error</AlertTitle>
                  <AlertDescription>
                    {updateExpenseSubCategoryError?.data?.message ||
                      "Something went wrong! try again"}
                  </AlertDescription>
                </Alert>
              )}
          </div>
          {/* UPDATE EXPENSE  SUB-CATEGORY  BUTTON */}
          <div className="flex justify-end w-1/2">
            <Button disabled={updateExpenseSubCategoryLoading} type="submit">
              {updateExpenseSubCategoryLoading && <ButtonLoader />}
              Update Now
            </Button>
          </div>
        </div>
      </FormWrapper>
    </form>
  );
};

export default EditExpenseSubCategory;
