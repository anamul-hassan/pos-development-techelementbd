import AddSaleExchangeReturnContainer from "@/components/dashboard/sale/sale_return_exchange/AddSaleExchangeReturnContainer";
import { addEditSaleExchangeReturnSchema } from "@/schemas/sale/add_sale_exchange_return";
import { yupResolver } from "@hookform/resolvers/yup";
import { FC } from "react";
import { useForm } from "react-hook-form";

interface IAddSaleExchangeReturnProps {}

const AddSaleExchangeReturn: FC<IAddSaleExchangeReturnProps> = () => {
  // REACT HOOK FORM
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(addEditSaleExchangeReturnSchema),
  });
  return (
    <section>
      <AddSaleExchangeReturnContainer watch={watch} setValue={setValue} />
    </section>
  );
};

export default AddSaleExchangeReturn;
