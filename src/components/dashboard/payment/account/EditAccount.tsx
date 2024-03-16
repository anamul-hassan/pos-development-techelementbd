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
import { addEditAccountSchema } from "@/schemas/account/add_edit_account_schema";
import { useUpdateAccountMutation } from "@/store/account/accountApi";
import { useGetSingleBranchQuery } from "@/store/branch/branchApi";
import { ADD_EDIT_ACCOUNT_FORM_DATA } from "@/utils/constants/payment/account/add_edit_account_form";
import { actionManager } from "@/utils/helpers/actionManager";
import { yupResolver } from "@hookform/resolvers/yup";
import { AlertCircle } from "lucide-react";
import { ChangeEvent, FC, useEffect } from "react";
import { useForm } from "react-hook-form";

interface IEditAccountProps {
  actionItem: any;
}

const EditAccount: FC<IEditAccountProps> = ({ actionItem }) => {
  const locale = "en";
  const { toast } = useToast();

  const { data: branchData } = useGetSingleBranchQuery(
    actionItem?.branchId
  ) as any;

  // EDIT ACCOUNT MUTATION
  const [
    updateAccount,
    { isLoading: editAccountLoading, error: editAccountError },
  ] = useUpdateAccountMutation({}) as any;
  // REACT HOOK FORM TO EDIT ACCOUNT
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    setError,
  } = useForm({ resolver: yupResolver(addEditAccountSchema) });
  const handleEditAccount = async (data: any) => {
    if (data?.branchId) {
      delete data?.branchId;
    }
    const result = await updateAccount({
      id: actionItem.id,
      data,
    });
    if (result?.data?.data && result?.data?.success === true) {
      toast({
        title: "Update Account Message",
        description: result?.data?.message,
      });
      reset();
    }
  };

  useEffect(() => {
    setValue("accountName", actionItem?.accountName || "");
    setValue("accountHolderName", actionItem?.accountHolderName || "");
    setValue("bankName", actionItem?.bankName || "");
    setValue("openingBalance", actionItem?.openingBalance || 0);
    setValue("accountNumber", actionItem?.accountNumber || "");
    setValue("accountType", actionItem?.accountType || "");
    setValue("branchId", actionItem?.branchId);
  }, [actionItem, setValue]);

  return (
    <form onSubmit={handleSubmit(handleEditAccount)}>
      <FormWrapper
        className="grid grid-cols-1 md:grid-cols-2 gap-y-1 gap-x-4 md:gap-x-6"
        size="full"
        heading="Update Account Information"
      >
        {/* BANK NAME */}
        <InputWrapper
          label={ADD_EDIT_ACCOUNT_FORM_DATA.bankName.label[locale]}
          labelFor="bank_name"
          error={errors?.bankName?.message}
        >
          <Input
            {...register("bankName")}
            type="text"
            id="bank_name"
            placeholder={
              ADD_EDIT_ACCOUNT_FORM_DATA.bankName.placeholder[locale]
            }
          />
        </InputWrapper>
        {/* ACCOUNT HOLDER NAME */}
        <InputWrapper
          error={errors?.accountHolderName?.message}
          labelFor="account_holder_name"
          label={ADD_EDIT_ACCOUNT_FORM_DATA.accountHolderName.label[locale]}
        >
          <Input
            {...register("accountHolderName")}
            type="text"
            id="account_holder_name"
            placeholder={
              ADD_EDIT_ACCOUNT_FORM_DATA.accountHolderName.placeholder[locale]
            }
          />
        </InputWrapper>
        {/* ACCOUNT NAME */}
        <InputWrapper
          error={errors?.accountName?.message}
          labelFor="account_name"
          label={ADD_EDIT_ACCOUNT_FORM_DATA.accountName.label[locale]}
        >
          <Input
            {...register("accountName")}
            type="text"
            id="account_name"
            placeholder={
              ADD_EDIT_ACCOUNT_FORM_DATA.accountName.placeholder[locale]
            }
          />
        </InputWrapper>
        {/* ACCOUNT NUMBER */}
        <InputWrapper
          error={errors?.accountNumber?.message}
          labelFor="account_number"
          label={ADD_EDIT_ACCOUNT_FORM_DATA.accountNumber.label[locale]}
        >
          <Input
            {...register("accountNumber")}
            type="text"
            id="account_number"
            placeholder={
              ADD_EDIT_ACCOUNT_FORM_DATA.accountNumber.placeholder[locale]
            }
          />
        </InputWrapper>
        {/* ACCOUNT TYPE */}
        <InputWrapper
          error={errors?.accountType?.message}
          labelFor="account_type"
          label={ADD_EDIT_ACCOUNT_FORM_DATA.accountType.label[locale]}
        >
          <Select
            defaultValue={actionItem?.accountType}
            onValueChange={(value: string) => setValue("accountType", value)}
          >
            <SelectTrigger id="account_type">
              <SelectValue
                placeholder={
                  ADD_EDIT_ACCOUNT_FORM_DATA.accountType.placeholder[locale]
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MobileBanking">Mobile Banking</SelectItem>
              <SelectItem value="Bank">Bank</SelectItem>
              <SelectItem value="Cash">Cash</SelectItem>
            </SelectContent>
          </Select>
        </InputWrapper>

        {/* OPENING BALANCE */}
        <InputWrapper
          error={errors?.openingBalance?.message}
          labelFor="opening_balance"
          label={ADD_EDIT_ACCOUNT_FORM_DATA.openingBalance.label[locale]}
        >
          <Input
            defaultValue={actionItem?.openingBalance || 0}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setValue("openingBalance", +e.target.value);
              setError("openingBalance", {
                type: "custom",
                message: "",
              });
            }}
            type="number"
            id="opening_balance"
            placeholder={
              ADD_EDIT_ACCOUNT_FORM_DATA.openingBalance.placeholder[locale]
            }
          />
        </InputWrapper>
        {/* BRANCH  */}
        {actionManager(["admin"]) && (
          <InputWrapper
            label={ADD_EDIT_ACCOUNT_FORM_DATA.branchId.label[locale]}
            labelFor="branch"
            error={errors?.branchId?.message}
          >
            <Input
              readOnly
              type="text"
              placeholder={
                branchData?.data?.branchName ||
                ADD_EDIT_ACCOUNT_FORM_DATA.branchId.placeholder[locale]
              }
            />
          </InputWrapper>
        )}
      </FormWrapper>

      {/* ERROR MESSAGE */}
      <div className="flex justify-between items-center my-2 w-full">
        <div className="flex justify-start w-full md:max-w-[300px]">
          {editAccountError &&
            Object?.keys(editAccountError)?.length > 0 &&
            "data" in editAccountError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Update Account Error</AlertTitle>
                <AlertDescription>
                  {editAccountError?.data?.message ||
                    "Something went wrong! try again"}
                </AlertDescription>
              </Alert>
            )}
        </div>
        {/* EDIT ACCOUNT BUTTON */}
        <div className="flex justify-end w-1/2">
          <Button disabled={editAccountLoading} type="submit">
            {editAccountLoading && <ButtonLoader />}
            Update Now
          </Button>
        </div>
      </div>
    </form>
  );
};

export default EditAccount;
