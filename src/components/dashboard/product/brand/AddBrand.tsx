import FormWrapper from "@/components/common/form/FormWrapper";
import InputWrapper from "@/components/common/form/InputWrapper";
import ButtonLoader from "@/components/common/loader/ButtonLoader";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { addEditBrandSchema } from "@/schemas/brand/brand_schema";
import { useAddBrandMutation } from "@/store/brand/brandApi";
import { removeEmptyStringOrZeroProperties } from "@/utils/helpers/removeEmptyStringProperties";
import { yupResolver } from "@hookform/resolvers/yup";
import { AlertCircle } from "lucide-react";
import { FC } from "react";
import { useForm } from "react-hook-form";
interface IAddBrandFormData {
  brand: string;
  note?: string;
}

interface IAddBrandProps {
  setAddBrandOpen: (addBrandOpen: boolean) => void;
}
const AddBrand: FC<IAddBrandProps> = ({ setAddBrandOpen }) => {
  const [addBrand, { isLoading: addBrandLoading, error: addBrandError }] =
    useAddBrandMutation({}) as any;
  // FORM HOOK TO ADD NEW BRAND
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IAddBrandFormData>({
    resolver: yupResolver(addEditBrandSchema),
  });

  const onSubmit = handleSubmit(async (data: any) => {
    const updateData = removeEmptyStringOrZeroProperties(data, ["note"]);
    const result = await addBrand(updateData);
    if (result?.data?.success) {
      toast({
        title: "Add Brand Message",
        description: "Brand added successfully",
      });
      reset();
      setAddBrandOpen(false);
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <FormWrapper size="full" heading="Add New Brand">
        {/* BRAND NAME */}
        <InputWrapper
          label="Write Brand Name ✽"
          labelFor="brand_name"
          error={errors?.brand?.message}
        >
          <Input
            {...register("brand")}
            type="text"
            id="brand_name"
            placeholder="Write Brand Name"
          />
        </InputWrapper>
        <InputWrapper
          label="Write Brand Note"
          labelFor="brand_note"
          error={errors?.note?.message}
        >
          <Textarea
            {...register("note")}
            id="brand_note"
            placeholder="Write brand note"
          />
        </InputWrapper>

        {/* ERROR MESSAGE */}
        <div className="flex justify-between items-center my-2 w-full">
          <div className="flex justify-start w-full md:max-w-[300px]">
            {addBrandError &&
              Object?.keys(addBrandError)?.length > 0 &&
              "data" in addBrandError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Add Brand Error</AlertTitle>
                  <AlertDescription>
                    {addBrandError?.data?.message ||
                      "Something went wrong! try again"}
                  </AlertDescription>
                </Alert>
              )}
          </div>
          {/* ADD BRAND BUTTON */}
          <div className="flex justify-end w-1/2">
            <Button disabled={addBrandLoading} type="submit">
              {addBrandLoading && <ButtonLoader />}
              Add Now
            </Button>
          </div>
        </div>
      </FormWrapper>
    </form>
  );
};

export default AddBrand;
