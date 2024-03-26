import CopyButton from "@/components/common/button/CopyButton";
import FormWrapper from "@/components/common/form/FormWrapper";
import InputWrapper from "@/components/common/form/InputWrapper";
import SubmitErrorWrapper from "@/components/common/form/SubmitErrorWrapper";
import ButtonLoader from "@/components/common/loader/ButtonLoader";
import AddPaymentTable, {
  IPaymentTable,
} from "@/components/common/payment/AddPaymentTable";
import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { addEditCustomerPaymentSchema } from "@/schemas/customer/add_edit_customer_payment_schema";
import {
  useAddCustomerPaymentMutation,
  useGetCustomersQuery,
} from "@/store/customer/customerApi";
import { ADD_EDIT_CUSTOMER_PAYMENT_FORM_DATA } from "@/utils/constants/contacts/add_edit_customer_payment_form";
import { capitalizeEveryWord } from "@/utils/helpers/capitalizeEveryWord";
import { fullNameConverter } from "@/utils/helpers/fullNameConverter";
import { totalCalculator } from "@/utils/helpers/totalCalculator";
import { yupResolver } from "@hookform/resolvers/yup";
import { Check, ChevronsUpDown } from "lucide-react";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

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

interface IAddCustomerPaymentSelectorProps {
  setPaymentOpen: (paymentOpen: boolean) => void;
}

const AddCustomerPaymentSelector: FC<IAddCustomerPaymentSelectorProps> = ({
  setPaymentOpen,
}) => {
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

  const [clientSearch, setClientSearch] = useState<string>("");
  const [clientOpen, setClientOpen] = useState<boolean>(false);
  const [clientValue, setClientValue] = useState<string>("");
  const [targetClient, setTargetClient] = useState<any>();

  // GET SINGLE CLIENT INFORMATION QUERY
  const { data: clientData, isLoading: isClientLoading } = useGetCustomersQuery(
    {
      search: clientSearch,
    }
  );

  // ADD CUSTOMER PAYMENT MUTATION
  const [
    addCustomerPayment,
    { isLoading: addCustomerPaymentLoading, error: addCustomerPaymentError },
  ] = useAddCustomerPaymentMutation({}) as any;

  // REACT HOOK FORM TO ADD ADD CUSTOMER PAYMENT
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
    setError,
    register,
  } = useForm({ resolver: yupResolver(addEditCustomerPaymentSchema) });

  //   HANDLE CUSTOMER PAYMENT METHOD
  const handleCustomerPayment = async (data: any) => {
    const result = await addCustomerPayment(data);
    if (result?.data?.success) {
      toast({
        title: "Add Customer Payment Message",
        description: result?.data?.message,
      });
      reset();
      setPaymentOpen(false);
    }
  };
  // CALCULATION TOTAL PAYMENTS
  const totalAmount = totalCalculator(watch("payments") || [], "paymentAmount");
  useEffect(() => {
    setValue(
      "payments",
      paymentTable.map((account: any) => ({
        accountId: account.accountId,
        paymentAmount: +account.paymentAmount,
      }))
    );

    setValue("amount", totalAmount);
  }, [setValue, paymentTable, watch, totalAmount]);

  return (
    <form onSubmit={handleSubmit(handleCustomerPayment)}>
      <FormWrapper size="full" heading="Add Customer Payment">
        <ul className="flex justify-between border py-1.5 rounded-md px-2 mt-2 mx-1">
          <li className="flex space-x-2">
            <label className="text-sm md:text-base">Due Amount</label>

            <b className="ml-2 text-sm md:text-base text-red-500">
              {targetClient?.dueAmount
                ? targetClient?.dueAmount?.toFixed(2)
                : "0.00"}
              ৳
            </b>
            <CopyButton
              tooltipSide="right"
              copyItem={targetClient?.dueAmount ? targetClient?.dueAmount : 0}
            />
          </li>
          <li>
            <label className="text-sm md:text-base">Advance Amount</label>

            <b className="ml-2 text-sm md:text-base text-green-600">
              {targetClient?.advanceAmount?.toFixed(2) || "0.00"}৳
            </b>
          </li>
          <li>
            <label className="text-sm md:text-base">Payable Amount</label>

            <b className="ml-2 text-sm md:text-base">
              {totalAmount.toFixed(2) || "0.00"}৳
            </b>
          </li>
        </ul>

        <div className="grid grid-cols-2 gap-2">
          {/* CUSTOMER SELECTION */}
          <InputWrapper
            label={ADD_EDIT_CUSTOMER_PAYMENT_FORM_DATA.customerId.label[locale]}
            labelFor="client_name"
            error={errors.customerId?.message}
          >
            <Popover open={clientOpen} onOpenChange={setClientOpen}>
              <PopoverTrigger id="client_name" asChild className="w-full">
                <Button
                  variant="outline"
                  role="client_name"
                  className="w-full justify-between"
                >
                  {clientValue
                    ? capitalizeEveryWord(clientValue)
                    : ADD_EDIT_CUSTOMER_PAYMENT_FORM_DATA.customerId
                        .placeholder[locale]}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0  opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="">
                <Command>
                  <div className="flex justify-center p-2">
                    {/* CLIENT SEARCH INPUT */}
                    <Input
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setClientSearch(e.target.value)
                      }
                      placeholder={
                        ADD_EDIT_CUSTOMER_PAYMENT_FORM_DATA.customerId
                          .placeholder[locale]
                      }
                    />
                  </div>
                  {isClientLoading && (
                    <div className="my-5 flex justify-center opacity-90">
                      <ButtonLoader />
                    </div>
                  )}
                  <CommandGroup
                    onWheel={(e) => {
                      e.currentTarget.scrollTop += e.deltaY;
                    }}
                    className="max-h-[200px] overflow-y-auto"
                  >
                    {clientData?.data?.length > 0 &&
                      clientData?.data?.map(
                        (singleClient: any, clientIndex: number) => (
                          <CommandItem
                            key={clientIndex}
                            value={singleClient?.id}
                            onSelect={(currentValue) => {
                              setClientValue(
                                currentValue === clientValue ? "" : currentValue
                              );
                              setValue("customerId", singleClient?.id);
                              setTargetClient(singleClient);
                              setError("customerId", {
                                type: "custom",
                                message: "",
                              });
                              setClientOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                clientValue === singleClient?.id
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            <ul>
                              <li>
                                <b>{singleClient?.phone + " "}</b>
                              </li>
                              <li className="text-sm">
                                {singleClient?.firstName &&
                                singleClient?.firstName?.toLowerCase() !== "n/a"
                                  ? fullNameConverter(
                                      singleClient?.firstName,
                                      singleClient?.lastName
                                    )
                                  : "Not Found"}
                              </li>
                            </ul>
                          </CommandItem>
                        )
                      )}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </InputWrapper>

          {/* PAYMENT TYPE */}
          <InputWrapper
            label={ADD_EDIT_CUSTOMER_PAYMENT_FORM_DATA.type.label[locale]}
            labelFor="payment_type"
            error={errors?.type?.message}
          >
            <Select
              value={watch("type")}
              defaultValue={"Advance"}
              onValueChange={(value: string) => {
                setValue("type", value);
                setError("type", { type: "custom", message: "" });
              }}
            >
              <SelectTrigger id="discount_type" className="w-full">
                <SelectValue
                  placeholder={
                    ADD_EDIT_CUSTOMER_PAYMENT_FORM_DATA.type.placeholder[locale]
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
        </div>

        {/* PAYMENT METHOD */}
        <AddPaymentTable
          // shrink
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
        error={addCustomerPaymentError}
        loading={addCustomerPaymentLoading}
        buttonLabel="Add Now"
        errorTitle="Add Payment Error"
      />
    </form>
  );
};

export default AddCustomerPaymentSelector;
