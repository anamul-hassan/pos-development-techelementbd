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
import { addEditWarrantySchema } from "@/schemas/warranty/warranty_schema";
import { useUpdateWarrantyMutation } from "@/store/warranty/warrantyApi";
import { yupResolver } from "@hookform/resolvers/yup";
import { AlertCircle } from "lucide-react";
import { FC } from "react";
import { useForm } from "react-hook-form";

interface IEditWarrantyProps {
  actionItem: any;
}
interface IEditWarrantyFormData {
  warrantyType: string;
  warranty: string;
}

const EditWarranty: FC<IEditWarrantyProps> = ({ actionItem }) => {
  const { toast } = useToast();
  const [
    updateWarranty,
    { isLoading: editWarrantyLoading, error: editWarrantyError },
  ] = useUpdateWarrantyMutation({}) as any;

  // WARRANTY UPDATE REACT HOOK FORM
  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IEditWarrantyFormData>({
    resolver: yupResolver(addEditWarrantySchema),
  });
  const handleEditWarranty = async (data: any) => {
    const result = await updateWarranty({
      id: actionItem?.id,
      data: data,
    });
    if (result?.data?.success) {
      toast({
        title: "Update Warranty Message",
        description: result?.data?.message,
      });
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(handleEditWarranty)}>
      <FormWrapper size="full" heading="Update Warranty Information">
        {/* WARRANTY NAME */}
        <InputWrapper
          label="Write Warranty Name ✽"
          labelFor="new_warranty"
          error={errors?.warranty?.message}
        >
          <Input
            {...register("warranty")}
            type="text"
            id="new_warranty"
            placeholder="Write warranty name"
            defaultValue={actionItem?.warranty}
          />
        </InputWrapper>
        {/* WARRANTY CODE */}
        <InputWrapper
          label="Select Warranty Type ✽"
          labelFor="warrantyType"
          error={errors?.warrantyType?.message}
        >
          <Select
            onValueChange={(value: string) => setValue("warrantyType", value)}
            defaultValue={actionItem?.warrantyType}
          >
            <SelectTrigger id="warrantyType" className="">
              <SelectValue placeholder="Select Warranty Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Official">Official</SelectItem>
              <SelectItem value="UnOfficial">UnOfficial</SelectItem>
            </SelectContent>
          </Select>
        </InputWrapper>

        {/* ERROR MESSAGE */}
        <div className="flex justify-between items-center my-2 w-full">
          <div className="flex justify-start w-full md:max-w-[300px]">
            {editWarrantyError &&
              Object?.keys(editWarrantyError)?.length > 0 &&
              "data" in editWarrantyError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Update Warranty Error</AlertTitle>
                  <AlertDescription>
                    "Something went wrong! try again"
                  </AlertDescription>
                </Alert>
              )}
          </div>
          {/* UPDATE WARRANTY BUTTON */}
          <div className="flex justify-end w-1/2">
            <Button disabled={editWarrantyLoading} type="submit">
              {editWarrantyLoading && <ButtonLoader />}
              Update Now
            </Button>
          </div>
        </div>
      </FormWrapper>
    </form>
  );
};

export default EditWarranty;
