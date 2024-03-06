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
import { addAndEditVariationColorSchema } from "@/schemas/variation/add_edit_color_variation_schema";
import { useAddVariationColorMutation } from "@/store/variation/variationcolorApi";

interface IAddVariationFormData {
  color: string;
}

interface IAddColorProps {
  setAddColorOpen: (addColorOpen: boolean) => void;
}

const AddColor: FC<IAddColorProps> = ({ setAddColorOpen }) => {
  // USE TOAST HOOK
  const { toast } = useToast();

  // ADD NEW VARIATION COLOR MUTATION
  const [
    addVariation,
    {
      isLoading: isVariationLoading,
      error: addVariationError,
      isSuccess: addVariationSuccess,
    },
  ] = useAddVariationColorMutation({}) as any;

  // FORM HOOK TO ADD NEW VARIATION
  const {
    register,
    reset,
    handleSubmit: handleAddColorSubmit,
    formState: { errors },
  } = useForm<IAddVariationFormData>({
    resolver: yupResolver(addAndEditVariationColorSchema),
  });

  const onAddColorSubmit = handleAddColorSubmit(async (data: any) => {
    const newVariationData = {
      color: data.color,
    };
    await addVariation(newVariationData);
  });

  useEffect(() => {
    if (addVariationSuccess) {
      toast({
        title: "Add Variation Message",
        description: "Variation color added successfully",
      });
      reset();
      setAddColorOpen(false);
    }
  }, [toast, reset, addVariationSuccess, setAddColorOpen]);
  return (
    <form onSubmit={onAddColorSubmit}>
      <FormWrapper size="half" heading="Add New Color">
        {/* COLOR NAME */}
        <InputWrapper
          label="Write Variation Color"
          labelFor="new_variation_color"
          error={errors?.color?.message}
        >
          <Input
            {...register("color")}
            type="text"
            id="new_variation_color"
            placeholder="Write variation color"
          />
        </InputWrapper>
        <div className="flex justify-end w-full my-4">
          <Button type="submit" disabled={isVariationLoading}>
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

export default AddColor;
