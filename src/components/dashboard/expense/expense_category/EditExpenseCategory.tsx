import FormWrapper from "@/components/common/form/FormWrapper";
import InputWrapper from "@/components/common/form/InputWrapper";
import ButtonLoader from "@/components/common/loader/ButtonLoader";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { addEditExpenseCategorySchema } from "@/schemas/expense/expense_category_schema";
import { useUpdateExpenseCategoryMutation } from "@/store/expense_category/expenseCategoryApi";
import { yupResolver } from "@hookform/resolvers/yup";
import { AlertCircle } from "lucide-react";
import { FC } from "react";
import { useForm } from "react-hook-form";

interface IEditCategoryProps {
  actionItem: any;
}
const EditExpenseCategory: FC<IEditCategoryProps> = ({ actionItem }) => {
  const [
    updateExpenseCategory,
    {
      isLoading: updateExpenseCategoryLoading,
      error: updateExpenseCategoryError,
    },
  ] = useUpdateExpenseCategoryMutation() as any;
  // EXPENSE CATEGORY UPDATE REACT HOOK FORM
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(addEditExpenseCategorySchema),
  });

  const handleEditCategory = async (data: any) => {
    const result = await updateExpenseCategory({
      id: actionItem?.id,
      data: data,
    });
    if (result?.data?.success) {
      toast({
        title: "Update Category Message",
        description: result?.data?.message,
      });
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(handleEditCategory)}>
      <FormWrapper size="full" heading="Update Category">
        {/* WARRANTY NAME */}
        <InputWrapper
          label="Write Category Name ✽"
          labelFor="new_category"
          error={errors?.name?.message?.toString()}
        >
          <Input
            {...register("name")}
            type="text"
            id="new_category"
            placeholder="Write Category"
            defaultValue={actionItem?.name}
          />
        </InputWrapper>

        {/* ERROR MESSAGE */}
        <div className="flex justify-between items-center my-2 w-full">
          <div className="flex justify-start w-full md:max-w-[300px]">
            {updateExpenseCategoryError &&
              Object?.keys(updateExpenseCategoryError)?.length > 0 &&
              "data" in updateExpenseCategoryError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Update Expense Category Error</AlertTitle>
                  <AlertDescription>
                    {updateExpenseCategoryError?.data?.message ||
                      "Something went wrong! try again"}
                  </AlertDescription>
                </Alert>
              )}
          </div>
          {/* UPDATE EXPENSE CATEGORY  BUTTON */}
          <div className="flex justify-end w-1/2">
            <Button disabled={updateExpenseCategoryLoading} type="submit">
              {updateExpenseCategoryLoading && <ButtonLoader />}
              Update Now
            </Button>
          </div>
        </div>
      </FormWrapper>
    </form>
  );
};

export default EditExpenseCategory;
