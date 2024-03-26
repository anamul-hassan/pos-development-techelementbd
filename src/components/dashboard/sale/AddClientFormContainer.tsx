import FormWrapper from "@/components/common/form/FormWrapper";
import InputWrapper from "@/components/common/form/InputWrapper";
import ButtonLoader from "@/components/common/loader/ButtonLoader";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { addAndEditClientSchema } from "@/schemas/sale/add_edit_client _schema";
import { useGetBranchesQuery } from "@/store/branch/branchApi";
import { useAddCustomerMutation } from "@/store/customer/customerApi";
import { removeEmptyStringOrZeroProperties } from "@/utils/helpers/removeEmptyStringProperties";
import { shareBranchAndUserInfo } from "@/utils/helpers/shareBranchAndUserInfo";
import { yupResolver } from "@hookform/resolvers/yup";
import { AlertCircle } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { actionManager } from "@/utils/helpers/actionManager";
import { ADD_EDIT_CLIENT_FORM } from "@/utils/constants/customer/add_customer_form";
import { capitalizeEveryWord } from "@/utils/helpers/capitalizeEveryWord";

interface IAddClientFormData {
  name?: string;
  phone: string;
  memberShipId?: string | undefined;
  branchId: number;
}

interface IAddClientFormContainerProps {
  setClientAddOpen: (clientAddOpen: boolean) => void;
  setSelectedClient: any;
}

const AddClientFormContainer: FC<IAddClientFormContainerProps> = ({
  setClientAddOpen,
  setSelectedClient,
}) => {
  const locale = "en";
  // BRANCH ID
  const { branchId } = shareBranchAndUserInfo();
  const [branch, setBranch] = useState<number>(branchId);
  // USE TOAST HOOK
  const { toast } = useToast();

  // BRANCH LIST QUERY
  const { data: branchList, isLoading: branchLoading } =
    useGetBranchesQuery(undefined);

  // ADD NEW CUSTOMER MUTATION
  const [
    addCustomer,
    {
      isLoading: isLoadingCustomer,
      error: addCustomerError,
      isSuccess: addCustomerSuccess,
    },
  ] = useAddCustomerMutation({}) as any;

  // FORM HOOK TO ADD NEW CLIENT
  const {
    register,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IAddClientFormData>({
    resolver: yupResolver(addAndEditClientSchema),
  });

  const onSubmit = handleSubmit(async (data: any) => {
    const updateData = removeEmptyStringOrZeroProperties(data, [
      "name",
      "memberShipId",
    ]) as any;

    // CHECK MEMBERSHIP ID AVAILABLE OR NOT
    if (updateData?.name) {
      updateData.firstName = updateData?.name?.split(" ")[0];
      updateData.lastName = updateData?.name?.split(" ")?.slice(1).join(" ");
      delete updateData?.name;
    }

    const result = await addCustomer(updateData);
    if (result?.data?.data) {
      setSelectedClient(result?.data?.data);
    }
  });

  useEffect(() => {
    if (addCustomerSuccess) {
      toast({
        title: "Add Customer Message",
        description: "Customer added successfully",
      });
      reset();
      setClientAddOpen(false);
    }
    if (branch) {
      setValue("branchId", branch);
    }
  }, [addCustomerSuccess, toast, reset, setClientAddOpen, branch, setValue]);

  return (
    <form onSubmit={onSubmit}>
      <FormWrapper size="full" heading="Add New Customer">
        {/* CLIENT NAME */}
        <InputWrapper
          label={ADD_EDIT_CLIENT_FORM.name.label[locale]}
          labelFor="new_client_name"
          error={errors?.name?.message}
        >
          <Input
            {...register("name")}
            type="text"
            id="new_client_name"
            placeholder={ADD_EDIT_CLIENT_FORM.name.placeholder[locale]}
          />
        </InputWrapper>
        {/* CLIENT PHONE */}
        <InputWrapper
          label={ADD_EDIT_CLIENT_FORM.phone.label[locale]}
          labelFor="new_client_phone"
          error={errors?.phone?.message}
        >
          <Input
            {...register("phone")}
            type="phone"
            id="new_client_phone"
            placeholder={ADD_EDIT_CLIENT_FORM.phone.placeholder[locale]}
          />
        </InputWrapper>
        {/* CLIENT MEMBERSHIP ID */}
        <InputWrapper
          label={ADD_EDIT_CLIENT_FORM.membershipId.label[locale]}
          labelFor="new_client_membership_id"
          error={errors?.memberShipId?.message}
        >
          <Input
            {...register("memberShipId")}
            type="text"
            id="new_client_membership_id"
            placeholder={ADD_EDIT_CLIENT_FORM.membershipId.placeholder[locale]}
          />
        </InputWrapper>
        {/* BRANCH LIST */}
        {actionManager(["admin"]) && (
          <InputWrapper
            label={ADD_EDIT_CLIENT_FORM.branchId.label[locale]}
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
                    ADD_EDIT_CLIENT_FORM.membershipId.placeholder[locale]
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
        <div className="flex justify-end w-full my-4">
          <Button disabled={isLoadingCustomer} type="submit">
            {isLoadingCustomer && <ButtonLoader />}
            Add Now
          </Button>
        </div>

        {/* ERROR MESSAGE */}
        <div className="my-2">
          {addCustomerError && "data" in addCustomerError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Add Customer Error</AlertTitle>
              <AlertDescription>
                {addCustomerError?.data?.message ||
                  "Something went wrong! try again"}
              </AlertDescription>
            </Alert>
          )}
        </div>
      </FormWrapper>
    </form>
  );
};

export default AddClientFormContainer;
