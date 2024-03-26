import SubmitErrorWrapper from "@/components/common/form/SubmitErrorWrapper";
import AddPurchaseExchangeReturnContainer from "@/components/dashboard/purchase/purchase_exchange_return/AddPurchaseExchangeReturnContainer";
import { useToast } from "@/components/ui/use-toast";
import { addEditPurchaseExchangeReturnSchema } from "@/schemas/purchase/add_edit_purchase_exchange_return";
import { useAddPurchaseExchangeReturnMutation } from "@/store/purchase_exchange_return/purchaseExchangeReturnApi";
import { yupResolver } from "@hookform/resolvers/yup";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface IAddPurchaseReturnProps {}

const AddPurchaseExchangeReturn: FC<IAddPurchaseReturnProps> = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [
    addPurchaseExchangeReturn,
    {
      isLoading: addPurchaseExchangeReturnLoading,
      error: addPurchaseExchangeReturnError,
    },
  ] = useAddPurchaseExchangeReturnMutation({}) as any;

  // REACT HOOK FORM
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addEditPurchaseExchangeReturnSchema),
  });

  const addExchangeReturnHandler = async (data: any) => {
    const updateData = {
      ...data,
      returnProduct: data?.returnProduct?.filter(
        (singleProduct: any) => singleProduct?.quantity !== 0
      ),
    };
    const result = await addPurchaseExchangeReturn(updateData);
    if (result?.data?.success) {
      toast({
        title: "Add Exchange Return Message",
        description: result?.data?.message,
      });
      navigate("/purchase_exchange_return_list", { replace: true });
    }
  };

  return (
    <form onSubmit={handleSubmit(addExchangeReturnHandler)}>
      <AddPurchaseExchangeReturnContainer
        watch={watch}
        setValue={setValue}
        setError={setError}
        register={register}
        errors={errors}
      />
      <SubmitErrorWrapper
        loading={addPurchaseExchangeReturnLoading}
        className="pt-4 pb-8"
        error={addPurchaseExchangeReturnError}
        buttonLabel="Add Return"
        errorTitle="Add Return Error"
      />
    </form>
  );
};

export default AddPurchaseExchangeReturn;
