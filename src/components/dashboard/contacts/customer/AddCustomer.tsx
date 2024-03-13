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
import { addEditCustomerSchema } from "@/schemas/customer/customer_schema";
import { useGetBranchesQuery } from "@/store/branch/branchApi";
import { useAddCustomerMutation } from "@/store/customer/customerApi";
import { ADD_EDIT_CUSTOMER_FORM } from "@/utils/constants/contacts/add_edit_customer_form";
import { actionManager } from "@/utils/helpers/actionManager";
import { capitalizeEveryWord } from "@/utils/helpers/capitalizeEveryWord";
import { removeEmptyStringOrZeroProperties } from "@/utils/helpers/removeEmptyStringProperties";
import { shareBranchAndUserInfo } from "@/utils/helpers/shareBranchAndUserInfo";
import { yupResolver } from "@hookform/resolvers/yup";
import { AlertCircle } from "lucide-react";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface IAddCustomerProps {
  setAddCustomerOpen: (addCustomerOpen: boolean) => void;
}

const AddCustomer: FC<IAddCustomerProps> = ({ setAddCustomerOpen }) => {
  const locale = "en";
  const { branchId } = shareBranchAndUserInfo();
  const { toast } = useToast();
  const [branch, setBranch] = useState<number>(branchId);

  // BRANCH LIST QUERY
  const { data: branchList, isLoading: branchLoading } =
    useGetBranchesQuery(undefined);

  // ADD CUSTOMER MUTATION
  const [
    addCustomer,
    { isLoading: addCustomerLoading, error: addCustomerError },
  ] = useAddCustomerMutation({}) as any;
  // REACT HOOK FORM TO ADD SUPPLIER
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({ resolver: yupResolver(addEditCustomerSchema) });
  const handleAddSupplier = async (data: any) => {
    const updateData = removeEmptyStringOrZeroProperties(data, [
      "firstName",
      "lastName",
      "email",
      "tax",
      "openingBalance",
      "peyTerm",
      "creditLimit",
      "address",
      "city",
      "state",
      "zipCode",
      "alternatePhone",
      "familyPhone",
      "department",
      "permanentAddress",
      "memberShipId",
    ]);

    const result = await addCustomer(updateData);
    if (result?.data?.data && result?.data?.success === true) {
      toast({
        title: "Add Customer Message",
        description: result?.data?.message,
      });
      reset();
      setAddCustomerOpen(false);
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
        heading="Add New Customer"
      >
        {/* CUSTOMER FIRST NAME */}
        <InputWrapper
          label={ADD_EDIT_CUSTOMER_FORM.firstName.label[locale]}
          labelFor="first_name"
          error={errors?.firstName?.message}
        >
          <Input
            {...register("firstName")}
            type="text"
            id="first_name"
            placeholder={ADD_EDIT_CUSTOMER_FORM.firstName.placeholder[locale]}
          />
        </InputWrapper>
        {/* CUSTOMER LAST NAME */}
        <InputWrapper
          className="overflow-hidden"
          error={errors?.lastName?.message}
          labelFor="last_name"
          label={ADD_EDIT_CUSTOMER_FORM.lastName.label[locale]}
        >
          <Input
            {...register("lastName")}
            type="text"
            id="last_name"
            placeholder={ADD_EDIT_CUSTOMER_FORM.lastName.placeholder[locale]}
          />
        </InputWrapper>
        {/* CUSTOMER EMAIL */}
        <InputWrapper
          className="overflow-hidden"
          error={errors?.email?.message}
          labelFor="email"
          label={ADD_EDIT_CUSTOMER_FORM.email.label[locale]}
        >
          <Input
            {...register("email")}
            type="email"
            id="email"
            placeholder={ADD_EDIT_CUSTOMER_FORM.email.placeholder[locale]}
          />
        </InputWrapper>
        {/* CUSTOMER PHONE */}
        <InputWrapper
          className="overflow-hidden"
          error={errors?.phone?.message}
          labelFor="phone"
          label={ADD_EDIT_CUSTOMER_FORM.phone.label[locale]}
        >
          <Input
            {...register("phone")}
            type="phone"
            id="phone"
            placeholder={ADD_EDIT_CUSTOMER_FORM.phone.placeholder[locale]}
          />
        </InputWrapper>
        {/* CUSTOMER ALTERNATIVE PHONE */}
        <InputWrapper
          className="overflow-hidden"
          error={errors?.alternatePhone?.message}
          labelFor="alternative_phone"
          label={ADD_EDIT_CUSTOMER_FORM.alternatePhone.label[locale]}
        >
          <Input
            {...register("alternatePhone")}
            type="phone"
            id="alternative_phone"
            placeholder={
              ADD_EDIT_CUSTOMER_FORM.alternatePhone.placeholder[locale]
            }
          />
        </InputWrapper>
        {/* CUSTOMER FAMILY PHONE */}
        <InputWrapper
          className="overflow-hidden"
          error={errors?.familyPhone?.message}
          labelFor="family_phone"
          label={ADD_EDIT_CUSTOMER_FORM.familyPhone.label[locale]}
        >
          <Input
            {...register("familyPhone")}
            type="phone"
            id="family_phone"
            placeholder={ADD_EDIT_CUSTOMER_FORM.familyPhone.placeholder[locale]}
          />
        </InputWrapper>
        {/* CUSTOMER OPENING BALANCE */}
        <InputWrapper
          className="overflow-hidden"
          error={errors?.openingBalance?.message}
          labelFor="opening_balance"
          label={ADD_EDIT_CUSTOMER_FORM.openingBalance.label[locale]}
        >
          <Input
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setValue("openingBalance", +e.target.value)
            }
            type="number"
            id="opening_balance"
            placeholder={
              ADD_EDIT_CUSTOMER_FORM.openingBalance.placeholder[locale]
            }
          />
        </InputWrapper>
        {/* CUSTOMER CREDIT LIMIT */}
        <InputWrapper
          className="overflow-hidden"
          error={errors?.creditLimit?.message}
          labelFor="advance_balance"
          label={ADD_EDIT_CUSTOMER_FORM.creditLimit.label[locale]}
        >
          <Input
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setValue("creditLimit", +e.target.value)
            }
            type="number"
            id="advance_balance"
            placeholder={ADD_EDIT_CUSTOMER_FORM.creditLimit.placeholder[locale]}
          />
        </InputWrapper>
        {/* SUPPLIER DUE BALANCE */}
        <InputWrapper
          className="overflow-hidden"
          error={errors?.memberShipId?.message}
          labelFor="membership_id"
          label={ADD_EDIT_CUSTOMER_FORM.memberShipId.label[locale]}
        >
          <Input
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setValue("memberShipId", e.target.value?.toUpperCase())
            }
            type="text"
            id="membership_id"
            placeholder={
              ADD_EDIT_CUSTOMER_FORM.memberShipId.placeholder[locale]
            }
          />
        </InputWrapper>

        {/* CUSTOMER TAX */}
        <InputWrapper
          className="overflow-hidden"
          error={errors?.tax?.message}
          labelFor="tax"
          label={ADD_EDIT_CUSTOMER_FORM.tax.label[locale]}
        >
          <Input
            {...register("tax")}
            type="text"
            id="tax"
            placeholder={ADD_EDIT_CUSTOMER_FORM.tax.placeholder[locale]}
          />
        </InputWrapper>
        {/* CUSTOMER ADDRESS */}
        <InputWrapper
          className="overflow-hidden"
          error={errors?.address?.message}
          labelFor="address"
          label={ADD_EDIT_CUSTOMER_FORM.address.label[locale]}
        >
          <Input
            {...register("address")}
            type="text"
            id="address"
            placeholder={ADD_EDIT_CUSTOMER_FORM.address.placeholder[locale]}
          />
        </InputWrapper>
        {/* CUSTOMER PERMANENT ADDRESS */}
        <InputWrapper
          className="overflow-hidden"
          error={errors?.permanentAddress?.message}
          labelFor="permanent_address"
          label={ADD_EDIT_CUSTOMER_FORM.permanentAddress.label[locale]}
        >
          <Input
            {...register("permanentAddress")}
            type="text"
            id="permanent_address"
            placeholder={
              ADD_EDIT_CUSTOMER_FORM.permanentAddress.placeholder[locale]
            }
          />
        </InputWrapper>
        {/* CUSTOMER CITY */}
        <InputWrapper
          className="overflow-hidden"
          error={errors?.city?.message}
          labelFor="city"
          label={ADD_EDIT_CUSTOMER_FORM.city.label[locale]}
        >
          <Input
            {...register("city")}
            type="text"
            id="city"
            placeholder={ADD_EDIT_CUSTOMER_FORM.city.placeholder[locale]}
          />
        </InputWrapper>
        {/* CUSTOMER STATE */}
        <InputWrapper
          className="overflow-hidden"
          error={errors?.state?.message}
          labelFor="state"
          label={ADD_EDIT_CUSTOMER_FORM.state.label[locale]}
        >
          <Input
            {...register("state")}
            type="text"
            id="state"
            placeholder={ADD_EDIT_CUSTOMER_FORM.state.placeholder[locale]}
          />
        </InputWrapper>

        {/* CUSTOMER ZIP CODE */}
        <InputWrapper
          className="overflow-hidden"
          error={errors?.zipCode?.message}
          labelFor="zip_code"
          label={ADD_EDIT_CUSTOMER_FORM.zipCode.label[locale]}
        >
          <Input
            {...register("zipCode")}
            type="text"
            id="zip_code"
            placeholder={ADD_EDIT_CUSTOMER_FORM.zipCode.placeholder[locale]}
          />
        </InputWrapper>
        {/* PAY TERM  */}
        <InputWrapper
          label={ADD_EDIT_CUSTOMER_FORM.peyTerm.label[locale]}
          labelFor="pay_term"
          error={errors?.peyTerm?.message}
        >
          <Select onValueChange={(value: string) => setValue("peyTerm", value)}>
            <SelectTrigger id="pay_term">
              <SelectValue
                placeholder={ADD_EDIT_CUSTOMER_FORM.peyTerm.placeholder[locale]}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Days">Daily</SelectItem>
              <SelectItem value="Months">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </InputWrapper>
        {/* CUSTOMER DEPARTMENT */}
        <InputWrapper
          className="overflow-hidden"
          error={errors?.department?.message}
          labelFor="department"
          label={ADD_EDIT_CUSTOMER_FORM.department.label[locale]}
        >
          <Input
            {...register("department")}
            type="text"
            id="department"
            placeholder={ADD_EDIT_CUSTOMER_FORM.department.placeholder[locale]}
          />
        </InputWrapper>

        {/* BRANCH LIST */}
        {actionManager(["admin"]) && (
          <InputWrapper
            label={ADD_EDIT_CUSTOMER_FORM.branchId.label[locale]}
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
                    ADD_EDIT_CUSTOMER_FORM.branchId.placeholder[locale]
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
          {addCustomerError &&
            Object?.keys(addCustomerError)?.length > 0 &&
            "data" in addCustomerError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Add Supplier Error</AlertTitle>
                <AlertDescription>
                  {addCustomerError?.data?.message ||
                    "Something went wrong! try again"}
                </AlertDescription>
              </Alert>
            )}
        </div>
        {/* ADD CUSTOMER BUTTON */}
        <div className="flex justify-end w-1/2">
          <Button disabled={addCustomerLoading} type="submit">
            {addCustomerLoading && <ButtonLoader />}
            Add Now
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AddCustomer;
