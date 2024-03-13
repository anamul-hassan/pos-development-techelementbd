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
import { useGetSingleBranchQuery } from "@/store/branch/branchApi";
import { useUpdateSupplierMutation } from "@/store/supplier/supplierApi";
import { ADD_EDIT_SUPPLIER_FORM } from "@/utils/constants/contacts/add_edit_supplier_form";
import { actionManager } from "@/utils/helpers/actionManager";
import { removeEmptyStringOrZeroProperties } from "@/utils/helpers/removeEmptyStringProperties";

import { yupResolver } from "@hookform/resolvers/yup";
import { AlertCircle } from "lucide-react";
import { ChangeEvent, FC, useEffect } from "react";
import { useForm } from "react-hook-form";

interface IEditSupplierProps {
  actionItem: any;
}

const EditSupplier: FC<IEditSupplierProps> = ({ actionItem }) => {
  const locale = "en";
  const { toast } = useToast();

  const { data: branchData } = useGetSingleBranchQuery(
    actionItem?.branchId
  ) as any;

  // REACT HOOK FORM TO ADD SUPPLIER
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm({ resolver: yupResolver(addEditSupplierSchema) });

  const [
    updateSupplier,
    { isLoading: updateSupplierLoading, error: updateSupplierError },
  ] = useUpdateSupplierMutation({}) as any;

  const handleUpdateSupplier = async (data: any) => {
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

    delete updateData.branchId;

    const result = await updateSupplier({
      id: actionItem.id,
      data: updateData,
    });
    if (result?.data?.data && result?.data?.success === true) {
      toast({
        title: "Update Supplier Message",
        description: result?.data?.message,
      });
      reset();
    }
  };

  useEffect(() => {
    setValue("address", actionItem?.address || "");
    setValue("firstName", actionItem?.firstName || "");
    setValue("lastName", actionItem?.lastName || "");
    setValue("advanceAmount", actionItem?.advanceAmount || 0);
    setValue("dueAmount", actionItem?.dueAmount || 0);
    setValue("openingBalance", actionItem?.openingBalance || 0);
    setValue("paidStatus", actionItem?.paidStatus || "");
    setValue("phone", actionItem?.phone || "");
    setValue("peyTerm", actionItem?.payTerm || "");
    setValue("state", actionItem?.state || "");
    setValue("tax", actionItem?.tax || "");
    setValue("zipCode", actionItem?.zipCode || "");
    setValue("city", actionItem?.city || "");
    setValue("email", actionItem?.email || "");
    setValue("branchId", actionItem?.branchId || "");
  }, [setValue, actionItem, watch]);

  return (
    <form onSubmit={handleSubmit(handleUpdateSupplier)}>
      <FormWrapper
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-1 gap-x-4 md:gap-x-6"
        size="full"
        heading="Update Supplier Information"
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
            defaultValue={+actionItem?.openingBalance}
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
            defaultValue={+actionItem?.advanceAmount}
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
            defaultValue={+actionItem?.dueAmount}
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
          <Select
            value={
              watch("peyTerm")?.toString() || actionItem?.peyTerm?.toString()
            }
            onValueChange={(value: string) => setValue("peyTerm", value)}
          >
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
            value={
              watch("paidStatus")?.toString() ||
              actionItem?.paidStatus?.toString()
            }
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
            <Input
              readOnly
              type="text"
              placeholder={
                branchData?.data?.branchName ||
                ADD_EDIT_SUPPLIER_FORM.branchId.placeholder[locale]
              }
            />
          </InputWrapper>
        )}
      </FormWrapper>

      {/* ERROR MESSAGE */}
      <div className="flex justify-between items-center my-2 w-full">
        <div className="flex justify-start w-full md:max-w-[300px]">
          {updateSupplierError &&
            Object?.keys(updateSupplierError)?.length > 0 &&
            "data" in updateSupplierError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Add Supplier Error</AlertTitle>
                <AlertDescription>
                  {updateSupplierError?.data?.message ||
                    "Something went wrong! try again"}
                </AlertDescription>
              </Alert>
            )}
        </div>
        {/* ADD SUPPLIER BUTTON */}
        <div className="flex justify-end w-1/2">
          <Button disabled={updateSupplierLoading} type="submit">
            {updateSupplierLoading && <ButtonLoader />}
            Update Now
          </Button>
        </div>
      </div>
    </form>
  );
};

export default EditSupplier;
