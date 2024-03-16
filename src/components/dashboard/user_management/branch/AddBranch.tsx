import FormWrapper from "@/components/common/form/FormWrapper";
import InputWrapper from "@/components/common/form/InputWrapper";
import ButtonLoader from "@/components/common/loader/ButtonLoader";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { addEditBranchSchema } from "@/schemas/branch/branch_schema";
import { useAddBranchMutation } from "@/store/branch/branchApi";
import { ADD_EDIT_BRANCH_FORM } from "@/utils/constants/user_management/add_edit_branch_form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AlertCircle } from "lucide-react";
import { FC } from "react";
import { useForm } from "react-hook-form";

interface IAddBranchProps {
  setAddBranchOpen: (addBranchOpen: boolean) => void;
}
const AddBranch: FC<IAddBranchProps> = ({ setAddBranchOpen }) => {
  const locale = "en";
  //   ADD BRANCH MUTATION
  const [addBranch, { isLoading: addBranchLoading, error: addBranchError }] =
    useAddBranchMutation() as any;
  // REACT HOOK FORM TO ADD USER
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(addEditBranchSchema) });

  const handleAddBranch = async (data: any) => {
    const result = await addBranch(data);
    if (result?.data?.data && result?.data?.success === true) {
      toast({
        title: "Add Branch Message",
        description: result?.data?.message,
      });
      reset();
      setAddBranchOpen(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleAddBranch)}>
      <FormWrapper
        className="flex flex-col justify-center gap-y-1 gap-x-6"
        size="full"
        heading="Add New Branch"
      >
        {/* BRANCH NAME */}
        <InputWrapper
          label={ADD_EDIT_BRANCH_FORM.branchName.label[locale]}
          labelFor="branch_name"
          error={errors?.branchName?.message}
        >
          <Input
            {...register("branchName")}
            type="text"
            id="branch_name"
            placeholder={
              ADD_EDIT_BRANCH_FORM.branchLocation.placeholder[locale]
            }
          />
        </InputWrapper>

        {/* BRANCH LOCATION */}
        <InputWrapper
          label={ADD_EDIT_BRANCH_FORM.branchLocation.label[locale]}
          labelFor="branch_location"
          error={errors?.branchLocation?.message}
        >
          <Input
            {...register("branchLocation")}
            type="text"
            id="branch_location"
            placeholder={
              ADD_EDIT_BRANCH_FORM.branchLocation.placeholder[locale]
            }
          />
        </InputWrapper>
      </FormWrapper>

      {/* ERROR MESSAGE */}
      <div className="flex justify-between items-center my-2 w-full">
        <div className="flex justify-start w-full md:max-w-[300px]">
          {addBranchError &&
            Object?.keys(addBranchError)?.length > 0 &&
            "data" in addBranchError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Add Branch Error</AlertTitle>
                <AlertDescription>
                  {addBranchError?.data?.message ||
                    "Something went wrong! try again"}
                </AlertDescription>
              </Alert>
            )}
        </div>
        {/* ADD BRANCH BUTTON */}
        <div className="flex justify-end w-1/2">
          <Button disabled={addBranchLoading} type="submit">
            {addBranchLoading && <ButtonLoader />}
            Add Now
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AddBranch;
