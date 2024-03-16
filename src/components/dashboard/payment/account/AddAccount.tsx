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
import { useAddAccountMutation } from "@/store/account/accountApi";
import { useGetBranchesQuery } from "@/store/branch/branchApi";
import { ADD_EDIT_ACCOUNT_FORM_DATA } from "@/utils/constants/payment/account/add_edit_account_form";
import { actionManager } from "@/utils/helpers/actionManager";
import { capitalizeEveryWord } from "@/utils/helpers/capitalizeEveryWord";
import { shareBranchAndUserInfo } from "@/utils/helpers/shareBranchAndUserInfo";
import { yupResolver } from "@hookform/resolvers/yup";
import { AlertCircle } from "lucide-react";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface IAddAccountProps {
  setAddAccountOpen: (addAccountOpen: boolean) => void;
}

const AddAccount: FC<IAddAccountProps> = ({ setAddAccountOpen }) => {
  const locale = "en";
  const { branchId } = shareBranchAndUserInfo();
  const { toast } = useToast();
  const [branch, setBranch] = useState<number>(branchId);

  // BRANCH LIST QUERY
  const { data: branchList, isLoading: branchLoading } =
    useGetBranchesQuery(undefined);

  // ADD ACCOUNT MUTATION
  const [addAccount, { isLoading: addAccountLoading, error: addAccountError }] =
    useAddAccountMutation({}) as any;
  // REACT HOOK FORM TO ADD ACCOUNT
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    setError,
  } = useForm({ resolver: yupResolver(addEditAccountSchema) });
  const handleAddAccount = async (data: any) => {
    const result = await addAccount(data);
    if (result?.data?.data && result?.data?.success === true) {
      toast({
        title: "Add Account Message",
        description: result?.data?.message,
      });
      reset();
      setAddAccountOpen(false);
    }
  };

  useEffect(() => {
    if (branch) {
      setValue("branchId", branch);
    }
  }, [branch, setValue]);

  return (
    <form onSubmit={handleSubmit(handleAddAccount)}>
      <FormWrapper
        className="grid grid-cols-1 md:grid-cols-2 gap-y-1 gap-x-4 md:gap-x-6"
        size="full"
        heading="Add New Account"
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

        {/* BRANCH LIST */}
        {actionManager(["admin"]) && (
          <InputWrapper
            label={ADD_EDIT_ACCOUNT_FORM_DATA.branchId.label[locale]}
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
                    ADD_EDIT_ACCOUNT_FORM_DATA.branchId.placeholder[locale]
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
          {addAccountError &&
            Object?.keys(addAccountError)?.length > 0 &&
            "data" in addAccountError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Add Account Error</AlertTitle>
                <AlertDescription>
                  {addAccountError?.data?.message ||
                    "Something went wrong! try again"}
                </AlertDescription>
              </Alert>
            )}
        </div>
        {/* ADD ACCOUNT BUTTON */}
        <div className="flex justify-end w-1/2">
          <Button disabled={addAccountLoading} type="submit">
            {addAccountLoading && <ButtonLoader />}
            Add Now
          </Button>
        </div>
      </div>
    </form>
  );
};
export default AddAccount;
