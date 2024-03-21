import SubmitErrorWrapper from "@/components/common/form/SubmitErrorWrapper";
import AddSaleExchangeReturnContainer from "@/components/dashboard/sale/sale_return_exchange/AddSaleExchangeReturnContainer";
import { useToast } from "@/components/ui/use-toast";
import { addEditSaleExchangeReturnSchema } from "@/schemas/sale/add_sale_exchange_return";
import { useAddSaleExchangeReturnMutation } from "@/store/sale_exchange_return/saleExchangeReturnApi";
import { removeEmptyStringOrZeroProperties } from "@/utils/helpers/removeEmptyStringProperties";
import { yupResolver } from "@hookform/resolvers/yup";
import { FC } from "react";
import { useForm } from "react-hook-form";

interface IAddSaleExchangeReturnProps {}

const AddSaleExchangeReturn: FC<IAddSaleExchangeReturnProps> = () => {
  const { toast } = useToast();
  const [
    addSaleExchangeReturn,
    {
      isLoading: addSaleExchangeReturnLoading,
      error: addSaleExchangeReturnError,
    },
  ] = useAddSaleExchangeReturnMutation({}) as any;
  // REACT HOOK FORM
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    // formState: { errors },
    // reset,
    setError,
  } = useForm({
    resolver: yupResolver(addEditSaleExchangeReturnSchema),
    defaultValues: {
      products: [],
      payments: [],
    },
  });

  // console.log(errors, "eror");
  // console.log(watch());

  const addExchangeReturnHandler = async (data: any) => {
    const updateData = removeEmptyStringOrZeroProperties(data, [
      "customerPay",
      "sellerPay",
    ]) as any;

    if (!updateData?.products?.length) {
      delete updateData?.products;
    }

    // console.log(updateData);
    // return;
    const result = await addSaleExchangeReturn(updateData);

    if (result?.data?.success) {
      toast({
        title: "Add Exchange Return Message",
        description: result?.data?.message,
      });
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
        errorTitle="Add Return & Exchange Error"
      />
    </form>
  );
};

export default AddSaleExchangeReturn;
