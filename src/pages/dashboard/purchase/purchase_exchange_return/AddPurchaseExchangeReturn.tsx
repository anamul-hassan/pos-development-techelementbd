import SubmitErrorWrapper from "@/components/common/form/SubmitErrorWrapper";
import AddPurchaseExchangeReturnContainer from "@/components/dashboard/purchase/purchase_exchange_return/AddPurchaseExchangeReturnContainer";
import { useToast } from "@/components/ui/use-toast";
import { addEditSaleExchangeReturnSchema } from "@/schemas/sale/add_sale_exchange_return";
import { useAddSaleExchangeReturnMutation } from "@/store/sale_exchange_return/saleExchangeReturnApi";
import { yupResolver } from "@hookform/resolvers/yup";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface IAddPurchaseReturnProps {}

const AddPurchaseExchangeReturn: FC<IAddPurchaseReturnProps> = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [
    addSaleExchangeReturn,
    {
      isLoading: addSaleExchangeReturnLoading,
      error: addSaleExchangeReturnError,
    },
  ] = useAddSaleExchangeReturnMutation({}) as any;
  // REACT HOOK FORM
  const { register, handleSubmit, watch, setValue, setError } = useForm({
    resolver: yupResolver(addEditSaleExchangeReturnSchema),
    defaultValues: {
      products: [],
      payments: [],
    },
  });

  const addExchangeReturnHandler = async (data: any) => {
    // REMOVE THE PROPERTY IF THE FALSY VALUE
    // const updateData = removeEmptyStringOrZeroProperties(data, [
    //   "customerPay",
    //   "sellerPay",
    // ]) as any;

    // LOGIC REMOVE PRODUCTS PROPERTY
    // if (!updateData?.products?.length) {
    //   delete updateData?.products;
    // }

    // // FILTER THE FALSY PAYMENTS
    // const updatePayment = updateData?.payments?.filter(
    //   (payment: any) =>
    //     payment?.accountId !== null && payment?.paymentAmount > 0
    // );

    // // REMOVE THE PAYMENTS PROPERTY
    // if (updatePayment?.length > 0) {
    //   updateData.payments = updatePayment;
    // } else {
    //   delete updateData.payments;
    // }

    const result = await addSaleExchangeReturn(data);

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
      />
      <SubmitErrorWrapper
        loading={addSaleExchangeReturnLoading}
        className="pt-4 pb-8"
        error={addSaleExchangeReturnError}
        buttonLabel="Add Exchange & Return"
        errorTitle="Add Return & Exchange Error"
      />
    </form>
  );
};

export default AddPurchaseExchangeReturn;
