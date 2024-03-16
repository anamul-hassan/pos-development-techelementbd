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
import { toast } from "@/components/ui/use-toast";
import { addEditWarrantySchema } from "@/schemas/warranty/warranty_schema";
import { useAddWarrantyMutation } from "@/store/warranty/warrantyApi";
import { yupResolver } from "@hookform/resolvers/yup";
import { AlertCircle } from "lucide-react";
import { FC } from "react";
import { useForm } from "react-hook-form";

interface IAddWarrantyFormData {
  warrantyType: string;
  warranty: string;
}

interface IAddWarrantyProps {
  setAddWarrantyOpen: (addWarrantyOpen: boolean) => void;
}

const AddWarranty: FC<IAddWarrantyProps> = ({ setAddWarrantyOpen }) => {
  const [
    // ADD WARRANTY MUTATION
    addWarranty,
    { isLoading: addWarrantyLoading, error: addWarrantyError },
  ] = useAddWarrantyMutation({}) as any;

  // ADD WARRANTY FORM
  const {
    register,
    setValue,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IAddWarrantyFormData>({
    resolver: yupResolver(addEditWarrantySchema),
  });

  // ADD WARRANTY HANDLER
  const onSubmit = handleSubmit(async (data: any) => {
    const result = await addWarranty(data);
    if (result?.data?.success) {
      toast({
        title: "Add Warranty Message",
        description: "Warranty Added Successfully",
      });
      reset();
      setAddWarrantyOpen(false);
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <FormWrapper size="full" heading="Add New Warranty">
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
          />
        </InputWrapper>
        <InputWrapper
          label="Select Warranty Type ✽"
          labelFor="warrantyType"
          error={errors?.warrantyType?.message}
        >
          <Select
            value={watch("warrantyType")}
            onValueChange={(value: string) => setValue("warrantyType", value)}
          >
            <SelectTrigger id="warrantyType" className="">
              <SelectValue placeholder="Select Warranty Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Official">Official</SelectItem>
              <SelectItem value="UnOfficial">Unofficial</SelectItem>
            </SelectContent>
          </Select>
        </InputWrapper>
        {/* ERROR MESSAGE */}
        <div className="flex justify-between items-center my-2 w-full">
          <div className="flex justify-start w-full md:max-w-[300px]">
            {addWarrantyError &&
              Object?.keys(addWarrantyError)?.length > 0 &&
              "data" in addWarrantyError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Add Warranty Error</AlertTitle>
                  <AlertDescription>
                    {addWarrantyError?.data?.message ||
                      "Something went wrong! try again"}
                  </AlertDescription>
                </Alert>
              )}
          </div>
          {/* ADD WARRANTY BUTTON */}
          <div className="flex justify-end w-1/2">
            <Button disabled={addWarrantyLoading} type="submit">
              {addWarrantyLoading && <ButtonLoader />}
              Add Now
            </Button>
          </div>
        </div>
      </FormWrapper>
    </form>
  );
};

export default AddWarranty;
