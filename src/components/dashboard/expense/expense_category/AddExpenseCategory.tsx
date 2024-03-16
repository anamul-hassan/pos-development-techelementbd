import FormWrapper from "@/components/common/form/FormWrapper";
import InputWrapper from "@/components/common/form/InputWrapper";
import ButtonLoader from "@/components/common/loader/ButtonLoader";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { AlertCircle } from "lucide-react";
import { FC } from "react";
import { useForm } from "react-hook-form";

import { useAddExpenseCategoryMutation } from "@/store/expense_category/expenseCategoryApi";
import { addEditExpenseCategorySchema } from "@/schemas/expense/expense_category_schema";

interface IAddCategoryProps {
  setAddCategoryOpen: (addCategoryOpen: boolean) => void;
}

const AddExpenseCategory: FC<IAddCategoryProps> = ({ setAddCategoryOpen }) => {
  const [
    addExpenseCategory,
    { isLoading: addExpenseCategoryLoading, error: addExpenseCategoryError },
  ] = useAddExpenseCategoryMutation() as any;
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(addEditExpenseCategorySchema),
  });

  const onSubmit = handleSubmit(async (data: any) => {
    const result = await addExpenseCategory(data);
    if (result?.data?.success) {
      toast({
        title: "Add Category Message",
        description: "Expense category added successfully",
      });
      reset();
      setAddCategoryOpen(false);
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <FormWrapper size="full" heading="Add New Expense Category">
        {/* CATEGORY NAME */}
        <InputWrapper
          label="Write Category Name ✽"
          labelFor="new_category"
          error={errors?.name?.message?.toString()}
        >
          <Input
            {...register("name")}
            type="text"
            id="new_category"
            placeholder="Write category name"
          />
        </InputWrapper>

        {/* ERROR MESSAGE */}
        <div className="flex justify-between items-center my-2 w-full">
          <div className="flex justify-start w-full md:max-w-[300px]">
            {addExpenseCategoryError &&
              Object?.keys(addExpenseCategoryError)?.length > 0 &&
              "data" in addExpenseCategoryError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Add Expense Category Error</AlertTitle>
                  <AlertDescription>
                    {addExpenseCategoryError?.data?.message ||
                      "Something went wrong! try again"}
                  </AlertDescription>
                </Alert>
              )}
          </div>
          {/* UPDATE EXPENSE CATEGORY  BUTTON */}
          <div className="flex justify-end w-1/2">
            <Button disabled={addExpenseCategoryLoading} type="submit">
              {addExpenseCategoryLoading && <ButtonLoader />}
              Add Now
            </Button>
          </div>
        </div>
      </FormWrapper>
    </form>
  );
};

export default AddExpenseCategory;
