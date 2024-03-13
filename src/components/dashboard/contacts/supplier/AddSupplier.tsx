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
import { addEditSupplierSchema } from "@/schemas/supplier/supplier_schema";
import { useGetBranchesQuery } from "@/store/branch/branchApi";
import { useAddSupplierMutation } from "@/store/supplier/supplierApi";
import { ADD_EDIT_SUPPLIER_FORM } from "@/utils/constants/contacts/add_edit_supplier_form";
import { actionManager } from "@/utils/helpers/actionManager";
import { capitalizeEveryWord } from "@/utils/helpers/capitalizeEveryWord";
import { removeEmptyStringOrZeroProperties } from "@/utils/helpers/removeEmptyStringProperties";
import { shareBranchAndUserInfo } from "@/utils/helpers/shareBranchAndUserInfo";
import { yupResolver } from "@hookform/resolvers/yup";
import { AlertCircle } from "lucide-react";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface IAddSupplierProps {
  setAddSupplierOpen: (addSupplierOpen: boolean) => void;
}

const AddSupplier: FC<IAddSupplierProps> = ({ setAddSupplierOpen }) => {
  const locale = "en";
  const { branchId } = shareBranchAndUserInfo();
  const { toast } = useToast();
  const [branch, setBranch] = useState<number>(branchId);

  // BRANCH LIST QUERY
  const { data: branchList, isLoading: branchLoading } =
    useGetBranchesQuery(undefined);

  // REACT HOOK FORM TO ADD SUPPLIER
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({ resolver: yupResolver(addEditSupplierSchema) });

  const [addSupplier, { isLoading: loadingSupplier, error: addSupplierError }] =
    useAddSupplierMutation({}) as any;

  const handleAddSupplier = async (data: any) => {
    const updateData = removeEmptyStringOrZeroProperties(data, [
      "lastName",
      "tax",
      "openingBalance",
      "advanceAmount",
      "dueAmount",
      "address",
      "city",
      "state",
      "zipCode",
      "paidStatus",
      "peyTerm",
    ]);

    const result = await addSupplier(updateData);
    if (result?.data?.data && result?.data?.success === true) {
      toast({
        title: "Add Supplier Message",
        description: result?.data?.message,
      });
      reset();
      setAddSupplierOpen(false);
    }
  };

  useEffect(() => {
    if (branch) {
      setValue("branchId", branch);
    }
  }, [branch, setValue]);

  return (
    <form onSubmit={handleSubmit(handleAddSupplier)}>
      <FormWrapper
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-1 gap-x-4 md:gap-x-6"
        size="full"
        heading="Add New Supplier"
      >
        {/* SUPPLIER FIRST NAME */}
        <InputWrapper
          label={ADD_EDIT_SUPPLIER_FORM.firstName.label[locale]}
          labelFor="first_name"
          error={errors?.firstName?.message}
        >
          <Input
            {...register("firstName")}
            type="text"
            id="first_name"
            placeholder={ADD_EDIT_SUPPLIER_FORM.firstName.placeholder[locale]}
          />
        </InputWrapper>
        {/* SUPPLIER LAST NAME */}
        <InputWrapper
          className="overflow-hidden"
          error={errors?.lastName?.message}
          labelFor="last_name"
          label={ADD_EDIT_SUPPLIER_FORM.lastName.label[locale]}
        >
          <Input
            {...register("lastName")}
            type="text"
            id="last_name"
            placeholder={ADD_EDIT_SUPPLIER_FORM.lastName.placeholder[locale]}
          />
        </InputWrapper>
        {/* SUPPLIER EMAIL */}
        <InputWrapper
          className="overflow-hidden"
          error={errors?.email?.message}
          labelFor="email"
          label={ADD_EDIT_SUPPLIER_FORM.email.label[locale]}
        >
          <Input
            {...register("email")}
            type="email"
            id="email"
            placeholder={ADD_EDIT_SUPPLIER_FORM.email.placeholder[locale]}
          />
        </InputWrapper>
        {/* SUPPLIER PHONE */}
        <InputWrapper
          className="overflow-hidden"
          error={errors?.phone?.message}
          labelFor="phone"
          label={ADD_EDIT_SUPPLIER_FORM.phone.label[locale]}
        >
          <Input
            {...register("phone")}
            type="phone"
            id="phone"
            placeholder={ADD_EDIT_SUPPLIER_FORM.phone.placeholder[locale]}
          />
        </InputWrapper>
        {/* SUPPLIER OPENING BALANCE */}
        <InputWrapper
          className="overflow-hidden"
          error={errors?.openingBalance?.message}
          labelFor="opening_balance"
          label={ADD_EDIT_SUPPLIER_FORM.openingBalance.label[locale]}
        >
          <Input
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setValue("openingBalance", +e.target.value)
            }
            type="number"
            id="opening_balance"
            placeholder={
              ADD_EDIT_SUPPLIER_FORM.openingBalance.placeholder[locale]
            }
          />
        </InputWrapper>
        {/* SUPPLIER ADVANCE BALANCE */}
        <InputWrapper
          className="overflow-hidden"
          error={errors?.advanceAmount?.message}
          labelFor="advance_balance"
          label={ADD_EDIT_SUPPLIER_FORM.advanceAmount.label[locale]}
        >
          <Input
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setValue("advanceAmount", +e.target.value)
            }
            type="number"
            id="advance_balance"
            placeholder={
              ADD_EDIT_SUPPLIER_FORM.advanceAmount.placeholder[locale]
            }
          />
        </InputWrapper>
        {/* SUPPLIER DUE BALANCE */}
        <InputWrapper
          className="overflow-hidden"
          error={errors?.dueAmount?.message}
          labelFor="due_balance"
          label={ADD_EDIT_SUPPLIER_FORM.dueAmount.label[locale]}
        >
          <Input
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setValue("dueAmount", +e.target.value)
            }
            type="number"
            id="due_balance"
            placeholder={ADD_EDIT_SUPPLIER_FORM.dueAmount.placeholder[locale]}
          />
        </InputWrapper>

        {/* SUPPLIER TAX */}
        <InputWrapper
          className="overflow-hidden"
          error={errors?.tax?.message}
          labelFor="tax"
          label={ADD_EDIT_SUPPLIER_FORM.tax.label[locale]}
        >
          <Input
            {...register("tax")}
            type="text"
            id="tax"
            placeholder={ADD_EDIT_SUPPLIER_FORM.tax.placeholder[locale]}
          />
        </InputWrapper>
        {/* SUPPLIER ADDRESS */}
        <InputWrapper
          className="overflow-hidden"
          error={errors?.address?.message}
          labelFor="address"
          label={ADD_EDIT_SUPPLIER_FORM.address.label[locale]}
        >
          <Input
            {...register("address")}
            type="text"
            id="address"
            placeholder={ADD_EDIT_SUPPLIER_FORM.address.placeholder[locale]}
          />
        </InputWrapper>
        {/* SUPPLIER CITY */}
        <InputWrapper
          className="overflow-hidden"
          error={errors?.city?.message}
          labelFor="city"
          label={ADD_EDIT_SUPPLIER_FORM.city.label[locale]}
        >
          <Input
            {...register("city")}
            type="text"
            id="city"
            placeholder={ADD_EDIT_SUPPLIER_FORM.city.placeholder[locale]}
          />
        </InputWrapper>
        {/* SUPPLIER STATE */}
        <InputWrapper
          className="overflow-hidden"
          error={errors?.state?.message}
          labelFor="state"
          label={ADD_EDIT_SUPPLIER_FORM.state.label[locale]}
        >
          <Input
            {...register("state")}
            type="text"
            id="state"
            placeholder={ADD_EDIT_SUPPLIER_FORM.state.placeholder[locale]}
          />
        </InputWrapper>

        {/* SUPPLIER ZIP */}
        <InputWrapper
          className="overflow-hidden"
          error={errors?.zipCode?.message}
          labelFor="zip_code"
          label={ADD_EDIT_SUPPLIER_FORM.zipCode.label[locale]}
        >
          <Input
            {...register("zipCode")}
            type="text"
            id="zip_code"
            placeholder={ADD_EDIT_SUPPLIER_FORM.zipCode.placeholder[locale]}
          />
        </InputWrapper>
        {/* PAY TERM  */}
        <InputWrapper
          label={ADD_EDIT_SUPPLIER_FORM.payTerm.label[locale]}
          labelFor="pay_term"
          error={errors?.peyTerm?.message}
        >
          <Select onValueChange={(value: string) => setValue("peyTerm", value)}>
            <SelectTrigger id="pay_term">
              <SelectValue
                placeholder={ADD_EDIT_SUPPLIER_FORM.payTerm.placeholder[locale]}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Days">Daily</SelectItem>
              <SelectItem value="Months">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </InputWrapper>
        {/* PAID STATUS */}
        <InputWrapper
          label={ADD_EDIT_SUPPLIER_FORM.payTerm.label[locale]}
          labelFor="paid_status"
          error={errors?.paidStatus?.message}
        >
          <Select
            onValueChange={(value: string) => setValue("paidStatus", value)}
          >
            <SelectTrigger id="paid_status">
              <SelectValue
                placeholder={
                  ADD_EDIT_SUPPLIER_FORM.paidStatus.placeholder[locale]
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Paid">Paid</SelectItem>
              <SelectItem value="Due">Due</SelectItem>
            </SelectContent>
          </Select>
        </InputWrapper>

        {/* BRANCH LIST */}
        {actionManager(["admin"]) && (
          <InputWrapper
            label={ADD_EDIT_SUPPLIER_FORM.branchId.label[locale]}
            labelFor="branch"
            error={errors?.branchId?.message}
          >
            <Select
              value={branch?.toString()}
              onValueChange={(value: string) => setBranch(+value)}
            >
              <SelectTrigger id="branch" className="">
                <SelectValue
                  placeholder={
                    ADD_EDIT_SUPPLIER_FORM.branchId.placeholder[locale]
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {branchList?.data?.length > 0 &&
                  branchList?.data?.map((singleBranch: any) => (
                    <SelectItem
                      key={singleBranch?.id}
                      value={singleBranch?.id?.toString()}
                    >
                      {capitalizeEveryWord(singleBranch?.branchName)}
                    </SelectItem>
                  ))}
                {!branchList?.data?.length && branchLoading && (
                  <div className="flex justify-center w-full h-8 items-center bg-accent rounded-md">
                    <ButtonLoader />
                  </div>
                )}
              </SelectContent>
            </Select>
          </InputWrapper>
        )}
      </FormWrapper>

      {/* ERROR MESSAGE */}
      <div className="flex justify-between items-center my-2 w-full">
        <div className="flex justify-start w-full md:max-w-[300px]">
          {addSupplierError &&
            Object?.keys(addSupplierError)?.length > 0 &&
            "data" in addSupplierError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Add Supplier Error</AlertTitle>
                <AlertDescription>
                  {addSupplierError?.data?.message ||
                    "Something went wrong! try again"}
                </AlertDescription>
              </Alert>
            )}
        </div>
        {/* ADD SUPPLIER BUTTON */}
        <div className="flex justify-end w-1/2">
          <Button disabled={loadingSupplier} type="submit">
            {loadingSupplier && <ButtonLoader />}
            Add Now
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AddSupplier;
