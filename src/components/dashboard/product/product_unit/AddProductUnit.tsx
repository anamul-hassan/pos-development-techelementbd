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
import { useAddUnitMutation } from "@/store/unit/unitApi";
import { yupResolver } from "@hookform/resolvers/yup";
import { AlertCircle } from "lucide-react";
import { FC } from "react";
import { useForm } from "react-hook-form";

interface IAddProductUnitProps {
  setAddUnitOpen: (addUnitOpen: boolean) => void;
}

const AddProductUnit: FC<IAddProductUnitProps> = ({ setAddUnitOpen }) => {
  const { toast } = useToast();
  const [addUnit, { isLoading: addUnitLoading, error: addUnitError }] =
    useAddUnitMutation({}) as any;

  const {
    register,
    setValue,
    watch,
    reset,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(addEditUnitSchema),
  });

  const onSubmit = handleSubmit(async (data: any) => {
    const result = await addUnit(data);
    if (result?.data?.success) {
      toast({
        title: "Add Unit Message",
        description: "Unit added successfully",
      });
      reset();
      setAddUnitOpen(false);
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <FormWrapper size="full" heading="Add New Unit">
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
            placeholder="Write unit name"
          />
        </InputWrapper>
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
          />
        </InputWrapper>
        <InputWrapper
          label="Select Decimal ✽"
          labelFor="decimal"
          error={errors?.allowDecimal?.message?.toString()}
        >
          <Select
            value={watch("allowDecimal")}
            onValueChange={(value: string) => {
              setValue("allowDecimal", value);
              setError("allowDecimal", { type: "custom", message: "" });
            }}
          >
            <SelectTrigger id="decimal">
              <SelectValue placeholder="Allow decimal" />
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
            {addUnitError &&
              Object?.keys(addUnitError)?.length > 0 &&
              "data" in addUnitError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Add Unit Error</AlertTitle>
                  <AlertDescription>
                    {addUnitError?.data?.message ||
                      "Something went wrong! try again"}
                  </AlertDescription>
                </Alert>
              )}
          </div>
          {/* ADD UNIT BUTTON */}
          <div className="flex justify-end w-1/2">
            <Button disabled={addUnitLoading} type="submit">
              {addUnitLoading && <ButtonLoader />}
              Add Now
            </Button>
          </div>
        </div>
      </FormWrapper>
    </form>
  );
};

export default AddProductUnit;
