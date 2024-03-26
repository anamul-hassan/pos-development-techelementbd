import CopyButton from "@/components/common/button/CopyButton";
import FormWrapper from "@/components/common/form/FormWrapper";
import InputWrapper from "@/components/common/form/InputWrapper";
import SubmitErrorWrapper from "@/components/common/form/SubmitErrorWrapper";
import AddPaymentTable, {
  IPaymentTable,
} from "@/components/common/payment/AddPaymentTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { addEditSupplierPaymentSchema } from "@/schemas/supplier/add_edit_supplier_payment_schema";
import { useAddSupplierPaymentMutation } from "@/store/supplier/supplierApi";
import { ADD_EDIT_SUPPLIER_PAYMENT_FORM_DATA } from "@/utils/constants/contacts/add_edit_supplier_payment_form";
import { totalCalculator } from "@/utils/helpers/totalCalculator";
import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface IAddSupplierPaymentProps {
  actionItem: any;
}
const paymentType = [
  {
    label: "Advance",
    key: "Advance",
  },
  {
    label: "Due",
    key: "Due",
  },
];
const AddSupplierPayment: FC<IAddSupplierPaymentProps> = ({ actionItem }) => {
  const locale = "en";
  const { toast } = useToast();

  // PAYMENT TABLE STATE
  const [paymentTable, setPaymentTable] = useState<IPaymentTable[]>([
    {
      index: 0,
      accountId: null,
      paymentAmount: "",
    },
  ]);
  // CREATE SUPPLIER MUTATION
  const [
    addSupplierPayment,
    { isLoading: addSupplierPaymentLoading, error: addSupplierPaymentError },
  ] = useAddSupplierPaymentMutation({}) as any;
  // REACT HOOK FORM TO ADD EXPENSE
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
    register,
    setError,
  } = useForm({ resolver: yupResolver(addEditSupplierPaymentSchema) });

  //   HANDLE SUPPLIER PAYMENT METHOD
  const handleSupplierPayment = async (data: any) => {
    const result = await addSupplierPayment(data);
    if (result?.data?.success) {
      toast({
        title: "Add Supplier Payment Message",
        description: result?.data?.message,
      });
      reset();
    }
  };
  const totalAmount = totalCalculator(watch("payments"), "paymentAmount");
  useEffect(() => {
    // SET SUPPLIER ID WHEN SUPPLIER IS SELECTED
    setValue("supplierId", actionItem?.id);
    // SET THE PAYMENT DATA ON THE FORM
    setValue(
      "payments",
      paymentTable.map((account: any) => ({
        accountId: account.accountId,
        paymentAmount: +account.paymentAmount,
      }))
    );

    setValue("amount", totalAmount);
  }, [setValue, watch, paymentTable, actionItem, totalAmount]);
  return (
    <form onSubmit={handleSubmit(handleSupplierPayment)}>
      <FormWrapper size="full" heading="Add Supplier Payment">
        <ul className="flex justify-between border py-1.5 rounded-md px-2 mt-2 mx-1">
          <li className="flex space-x-2">
            <label className="text-sm md:text-base">Due Amount</label>

            <b className="ml-2 text-sm md:text-base text-red-500">
              {actionItem?.dueAmount.toFixed(2) || "0.00"}৳
            </b>
            <CopyButton tooltipSide="right" copyItem={actionItem?.dueAmount} />
          </li>
          <li>
            <label className="text-sm md:text-base">Advance Amount</label>

            <b className="ml-2 text-sm md:text-base text-green-600">
              {actionItem?.advanceAmount?.toFixed(2) || "0.00"}৳
            </b>
          </li>
          <li>
            <label className="text-sm md:text-base">Payable Amount</label>

            <b className="ml-2 text-sm md:text-base">
              {totalAmount.toFixed(2) || "0.00"}৳
            </b>
          </li>
        </ul>
        <InputWrapper
          label={ADD_EDIT_SUPPLIER_PAYMENT_FORM_DATA.type.label[locale]}
          labelFor="payment_type"
          error={errors?.type?.message}
        >
          <Select
            value={watch("type")}
            onValueChange={(value: string) => setValue("type", value)}
          >
            <SelectTrigger id="discount_type" className="w-full">
              <SelectValue
                placeholder={
                  ADD_EDIT_SUPPLIER_PAYMENT_FORM_DATA.type.placeholder[locale]
                }
              />
            </SelectTrigger>
            <SelectContent>
              {paymentType &&
                paymentType?.length > 0 &&
                paymentType?.map((singleOption: any, optionIndex: number) => (
                  <SelectItem
                    key={optionIndex + singleOption.key}
                    value={singleOption?.key}
                  >
                    {singleOption?.label}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </InputWrapper>
        {/* PAYMENT METHOD */}
        <AddPaymentTable
          scrollable
          paymentTable={paymentTable}
          setPaymentTable={setPaymentTable}
          watch={watch}
          property="payments"
          setError={setError}
          register={register}
        />
      </FormWrapper>
      {/* ERROR MESSAGE */}
      <SubmitErrorWrapper
        error={addSupplierPaymentError}
        loading={addSupplierPaymentLoading}
        buttonLabel="Add Now"
        errorTitle="Add Payment Error"
      />
    </form>
  );
};

export default AddSupplierPayment;
