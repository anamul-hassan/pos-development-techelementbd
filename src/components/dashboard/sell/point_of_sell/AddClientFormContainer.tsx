import FormWrapper from "@/components/common/form/FormWrapper";
import InputWrapper from "@/components/common/form/InputWrapper";
import ButtonLoader from "@/components/common/loader/ButtonLoader";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { addAndEditClientSchema } from "@/schemas/sell/add_edit_client _schema";
import { useAddCustomerMutation } from "@/store/customer/customerApi";
import { shareBranchAndUserInfo } from "@/utils/helpers/shareBranchAndUserInfo";
import { yupResolver } from "@hookform/resolvers/yup";
import { AlertCircle } from "lucide-react";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";

interface IAddClientFormData {
  name: string;
  phone: string;
  membershipId?: string | undefined;
}

interface IAddClientFormContainerProps {
  setClientAddOpen: (clientAddOpen: boolean) => void;
}

const AddClientFormContainer: FC<IAddClientFormContainerProps> = ({
  setClientAddOpen,
}) => {
  // BRANCH ID
  const { branchId } = shareBranchAndUserInfo();
  // USE TOAST HOOK
  const { toast } = useToast();

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
    // setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IAddClientFormData>({
    resolver: yupResolver(addAndEditClientSchema),
  });

  const onSubmit = handleSubmit(async (data: any) => {
    let newClientData;

    // CHECK MEMBERSHIP ID AVAILABLE OR NOT
    if (data?.membershipId) {
      newClientData = {
        firstName: data?.name?.split(" ")[0],
        lastName: data?.name?.split(" ")?.slice(1).join(" "),
        phone: data.phone,
        memberShipId: data.membershipId,
        branchId,
      };
    } else {
      newClientData = {
        firstName: data?.name?.split(" ")[0],
        lastName: data?.name?.split(" ")?.slice(1).join(" "),
        phone: data.phone,
        branchId,
      };
    }

    await addCustomer(newClientData);
  });

  useEffect(() => {
    if (addCustomerSuccess) {
      toast({
        title: "Add Client Message",
        description: "Client added successfully",
      });
      reset();
      setClientAddOpen(false);
    }
  }, [addCustomerSuccess, toast, reset, setClientAddOpen]);

  return (
    <form onSubmit={onSubmit}>
      <FormWrapper size="half" heading="Add New Customer">
        {/* CLIENT NAME */}
        <InputWrapper
          label="Write Client Name ✽"
          labelFor="new_client_name"
          error={errors?.name?.message}
        >
          <Input
            {...register("name")}
            type="text"
            id="new_client_name"
            placeholder="Write client name"
          />
        </InputWrapper>
        {/* CLIENT PHONE */}
        <InputWrapper
          label="Write Client Phone Number ✽"
          labelFor="new_client_phone"
          error={errors?.phone?.message}
        >
          <Input
            {...register("phone")}
            type="phone"
            id="new_client_phone"
            placeholder="Write client phone number"
          />
        </InputWrapper>
        {/* CLIENT MEMBERSHIP ID */}
        <InputWrapper
          label="Write Client Membership ID"
          labelFor="new_client_membership_id"
          error={errors?.membershipId?.message}
        >
          <Input
            {...register("membershipId")}
            type="text"
            id="new_client_membership_id"
            placeholder="Write client membership id"
          />
        </InputWrapper>
        <div className="flex justify-end w-full my-4">
          <Button type="submit">
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
