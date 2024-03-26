import SubmitErrorWrapper from "@/components/common/form/SubmitErrorWrapper";
import AddSaleExchangeReturnContainer from "@/components/dashboard/sale/sale_return_exchange/AddSaleExchangeReturnContainer";
import { useToast } from "@/components/ui/use-toast";
import { addEditSaleExchangeReturnSchema } from "@/schemas/sale/add_edit_sale_exchange_return";
import { useAddSaleExchangeReturnMutation } from "@/store/sale_exchange_return/saleExchangeReturnApi";
import { removeEmptyStringOrZeroProperties } from "@/utils/helpers/removeEmptyStringProperties";
import { yupResolver } from "@hookform/resolvers/yup";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface IAddSaleExchangeReturnProps {}

const AddSaleExchangeReturn: FC<IAddSaleExchangeReturnProps> = () => {
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
    const updateData = removeEmptyStringOrZeroProperties(data, [
      "customerPay",
      "sellerPay",
    ]) as any;

    // // LOGIC REMOVE PRODUCTS PROPERTY
    if (!updateData?.products?.length) {
      delete updateData?.products;
    }

    // // FILTER THE FALSY PAYMENTS
    const updatePayment = updateData?.payments?.filter(
      (payment: any) =>
        payment?.accountId !== null && payment?.paymentAmount > 0
    );

    // // REMOVE THE PAYMENTS PROPERTY
    if (updatePayment?.length > 0) {
      updateData.payments = updatePayment;
    } else {
      delete updateData.payments;
    }

    const refineData = {
      ...updateData,
      returnProduct: updateData?.returnProduct?.filter(
        (singleProduct: any) => singleProduct?.quantity !== 0
      ),
    };
    const result = await addSaleExchangeReturn(refineData);

    if (result?.data?.success) {
      toast({
        title: "Add Exchange Return Message",
        description: result?.data?.message,
      });
      navigate("/sale_exchange_return_list", { replace: true });
    }
  };
  return (
    <form onSubmit={handleSubmit(addExchangeReturnHandler)}>
      <AddSaleExchangeReturnContainer
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
        errorTitle="Add Exchange & Return Error"
      />
    </form>
  );
};

export default AddSaleExchangeReturn;
