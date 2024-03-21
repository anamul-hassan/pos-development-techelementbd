import AddPurchaseReturnContainer from "@/components/dashboard/purchase/purchase_return/AddPurchaseReturnContainer";
import { addEditSaleExchangeReturnSchema } from "@/schemas/sale/add_sale_exchange_return";
import { yupResolver } from "@hookform/resolvers/yup";
import { FC } from "react";
import { useForm } from "react-hook-form";

interface IAddPurchaseReturnProps {}

const AddPurchaseReturn: FC<IAddPurchaseReturnProps> = () => {
  // REACT HOOK FORM
  const {
    // register,
    // handleSubmit,
    watch,
    setValue,
    // formState: { errors },
    // reset,
  } = useForm({
    resolver: yupResolver(addEditSaleExchangeReturnSchema),
  });
  return (
    <section>
      <AddPurchaseReturnContainer watch={watch} setValue={setValue} />
    </section>
  );
};

export default AddPurchaseReturn;
