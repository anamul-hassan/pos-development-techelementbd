import FormWrapper from "@/components/common/form/FormWrapper";
import InputWrapper from "@/components/common/form/InputWrapper";
import ButtonLoader from "@/components/common/loader/ButtonLoader";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { addAndEditVariationSizeSchema } from "@/schemas/variation/add_edit_size_variation_schema";
import { useAddVariationSizeMutation } from "@/store/variation/variationsizeApi";

interface IAddVariationFormData {
  size: string;
}

interface IAddSizeProps {
  setAddSizeOpen: (addSizeOpen: boolean) => void;
}

const AddSize: FC<IAddSizeProps> = ({ setAddSizeOpen }) => {
  // USE TOAST HOOK
  const { toast } = useToast();

  // ADD NEW VARIATION SIZE MUTATION
  const [
    addVariationSize,
    {
      isLoading: isVariationLoading,
      error: addVariationError,
      isSuccess: addVariationSuccess,
    },
  ] = useAddVariationSizeMutation({}) as any;

  // FORM HOOK TO ADD NEW VARIATION
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IAddVariationFormData>({
    resolver: yupResolver(addAndEditVariationSizeSchema),
  });

  const onSubmit = handleSubmit(async (data: any) => {
    const newVariationSizeData = {
      size: data.size,
    };
    await addVariationSize(newVariationSizeData);
  });

  useEffect(() => {
    if (addVariationSuccess) {
      toast({
        title: "Add Variation Message",
        description: "Variation size added successfully",
      });
      reset();
      setAddSizeOpen(false);
    }
  }, [toast, reset, addVariationSuccess, setAddSizeOpen]);
  return (
    <form onSubmit={onSubmit}>
      <FormWrapper size="half" heading="Add New Size">
        {/* SIZE NAME */}
        <InputWrapper
          label="Write Variation Size"
          labelFor="new_variation_size"
          error={errors?.size?.message}
        >
          <Input
            {...register("size")}
            type="text"
            id="new_variation_size"
            placeholder="Write variation size"
          />
        </InputWrapper>
        <div className="flex justify-end w-full my-4">
          <Button disabled={isVariationLoading} type="submit">
            {isVariationLoading && <ButtonLoader />}
            Add Now
          </Button>
        </div>

        {/* ERROR MESSAGE */}
        <div className="my-2">
          {addVariationError && "data" in addVariationError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Add Variation Error</AlertTitle>
              <AlertDescription>
                {addVariationError?.data?.message ||
                  "Something went wrong! try again"}
              </AlertDescription>
            </Alert>
          )}
        </div>
      </FormWrapper>
    </form>
  );
};

export default AddSize;
