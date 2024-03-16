import FormWrapper from "@/components/common/form/FormWrapper";
import InputWrapper from "@/components/common/form/InputWrapper";
import ButtonLoader from "@/components/common/loader/ButtonLoader";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { brandEditSchema } from "@/schemas/brand/brand_edit_schema";
import { useUpdateBrandMutation } from "@/store/brand/brandApi";
import { removeEmptyStringOrZeroProperties } from "@/utils/helpers/removeEmptyStringProperties";
import { yupResolver } from "@hookform/resolvers/yup";
import { AlertCircle } from "lucide-react";
import { FC } from "react";
import { useForm } from "react-hook-form";
interface IEditBrandFormData {
  brand?: string;
  note?: string;
}
interface IEditBrandProps {
  actionItem: any;
}
const EditBrand: FC<IEditBrandProps> = ({ actionItem }) => {
  const [
    updateBrand,
    { isLoading: updateBrandLoading, error: updateBrandError },
  ] = useUpdateBrandMutation({}) as any;
  // BRAND UPDATE REACT HOOK FORM
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IEditBrandFormData>({
    resolver: yupResolver(brandEditSchema),
  });

  const handleEditBrand = async (data: any) => {
    const updateData = removeEmptyStringOrZeroProperties(data, ["note"]);
    const result = await updateBrand({
      id: actionItem?.id,
      data: updateData,
    });
    if (result?.data?.data && result?.data?.success === true) {
      toast({
        title: "Brand Update Message",
        description: result?.data?.message,
      });
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(handleEditBrand)}>
      <FormWrapper size="full" heading="Update Brand Information">
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
            placeholder="Write brand name"
            defaultValue={actionItem?.brand}
          />
        </InputWrapper>
        {/* BRAND NOTE */}
        <InputWrapper
          label="Write Brand Note"
          labelFor="brand_note"
          error={errors?.note?.message}
        >
          <Textarea
            {...register("note")}
            id="brand_note"
            placeholder="Write brand note"
            defaultValue={actionItem?.note}
          />
        </InputWrapper>
        {/* ERROR MESSAGE */}
        <div className="flex justify-between items-center my-2 w-full">
          <div className="flex justify-start w-full md:max-w-[300px]">
            {updateBrandError &&
              Object?.keys(updateBrandError)?.length > 0 &&
              "data" in updateBrandError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Add Product Error</AlertTitle>
                  <AlertDescription>
                    {updateBrandError?.data?.message ||
                      "Something went wrong! try again"}
                  </AlertDescription>
                </Alert>
              )}
          </div>
          {/* EDIT BRAND BUTTON */}
          <div className="flex justify-end w-1/2">
            <Button disabled={updateBrandLoading} type="submit">
              {updateBrandLoading && <ButtonLoader />}
              Update Now
            </Button>
          </div>
        </div>
      </FormWrapper>
    </form>
  );
};

export default EditBrand;
