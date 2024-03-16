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
import { addEditUnitSchema } from "@/schemas/units/units_schema";
import { useUpdateUnitMutation } from "@/store/unit/unitApi";
import { yupResolver } from "@hookform/resolvers/yup";
import { AlertCircle } from "lucide-react";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";

interface IEditProductUnitProps {
  actionItem: any;
}

const EditProductUnit: FC<IEditProductUnitProps> = ({ actionItem }) => {
  const { toast } = useToast();
  //EDIT BRANCH MUTATION
  const [
    updateUnit,
    {
      isLoading: editUnitLoading,

      error: editUnitError,
    },
  ] = useUpdateUnitMutation({}) as any;

  // UNIT UPDATE REACT HOOK FORM
  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(addEditUnitSchema),
  });

  const handleEditUnit = async (data: any) => {
    const result = await updateUnit({
      id: actionItem?.id,
      data: data,
    });
    if (result?.data?.success) {
      toast({
        title: "Update Unit Message",
        description: result?.data?.message,
      });
      reset();
    }
  };

  useEffect(() => {
    setValue("allowDecimal", actionItem?.allowDecimal);
  }, [setValue, actionItem]);

  return (
    <form onSubmit={handleSubmit(handleEditUnit)}>
      <FormWrapper size="full" heading="Update Unit Information">
        {/* UNIT NAME */}
        <InputWrapper
          label="Write Unit Name ✽"
          labelFor="unit_name"
          error={errors?.name?.message?.toString()}
        >
          <Input
            {...register("name")}
            type="text"
            id="unit_name"
            placeholder="Write Unit name"
            defaultValue={actionItem?.name}
          />
        </InputWrapper>
        {/* UNIT CODE */}
        <InputWrapper
          label="Write Unit Short Name ✽"
          labelFor="unit_short_name"
          error={errors?.shortName?.message?.toString()}
        >
          <Input
            {...register("shortName")}
            type="text"
            id="unit_short_name"
            placeholder="Write unit short name"
            defaultValue={actionItem?.shortName}
          />
        </InputWrapper>
        {/* UNIT ALLOW DECIMAL */}
        <InputWrapper
          label="Select Decimal Option"
          labelFor="decimal"
          error={errors?.allowDecimal?.message?.toString()}
        >
          <Select
            onValueChange={(value: string) => setValue("allowDecimal", value)}
            defaultValue={actionItem?.allowDecimal}
          >
            <SelectTrigger id="decimal" className="">
              <SelectValue placeholder="Select decimal option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
            </SelectContent>
          </Select>
        </InputWrapper>

        {/* ERROR MESSAGE */}
        <div className="flex justify-between items-center my-2 w-full">
          <div className="flex justify-start w-full md:max-w-[300px]">
            {editUnitError &&
              Object?.keys(editUnitError)?.length > 0 &&
              "data" in editUnitError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Update Unit Error</AlertTitle>
                  <AlertDescription>
                    {editUnitError?.data?.message ||
                      "Something went wrong! try again"}
                  </AlertDescription>
                </Alert>
              )}
          </div>
          {/* UPDATE UNIT BUTTON */}
          <div className="flex justify-end w-1/2">
            <Button disabled={editUnitLoading} type="submit">
              {editUnitLoading && <ButtonLoader />}
              Update Now
            </Button>
          </div>
        </div>

        <div className="flex justify-end w-full my-4"></div>
      </FormWrapper>
    </form>
  );
};
export default EditProductUnit;
