import AddPointOfSellContainer from "@/components/dashboard/sell/point_of_sell/AddPointOfSellContainer";
import PrintPos from "@/components/dashboard/sell/point_of_sell/PrintPos";
import { useToast } from "@/components/ui/use-toast";
import { addPOSSchema } from "@/schemas/pos/pos_schema";
import { useAddPOSMutation } from "@/store/point_of_sell/posApi";
import { percentageCalculator } from "@/utils/helpers/percentageCalculator";
import { shareBranchAndUserInfo } from "@/utils/helpers/shareBranchAndUserInfo";
import { totalCalculator } from "@/utils/helpers/totalCalculator";
import { vatCalculator } from "@/utils/helpers/vatCalculator";
import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useReactToPrint } from "react-to-print";

interface IAddPointOfSellProps {}

const AddPointOfSell: FC<IAddPointOfSellProps> = () => {
  // TOAST HOOK
  const { toast } = useToast();
  const [clear, setClear] = useState(false);

  // GET BRANCH ID FORM COOKIE
  const { branchId } = shareBranchAndUserInfo();

  // REFERENCE FOR PRINT SELECTED COMPONENT
  const printPOSRef = useRef(null);
  const [isPrinting, setIsPrinting] = useState(false);

  // STORE PROMISE RESOLVE REFERENCE
  const promiseResolveRef = useRef<any>(null);

  // ADD NEW POS MUTATION
  const [
    addPOS,
    { data: posData, isLoading: addPOSLoading, isSuccess: addPOSSuccess },
  ] = useAddPOSMutation({}) as any;

  // FORM FOR ADD NEW POS
  const {
    register: addPOSRegister,
    handleSubmit: addPOSHandleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver<any>(addPOSSchema),
    defaultValues: {
      branchId: branchId,
      customerId: "",
      discount: 0,
      discountType: "Fixed",
      products: [],
      payments: [],
      totalPaymentAmount: "",
      totalPrice: "",
    },
  });

  const [discountAmount, setDiscountAmount] = useState<string>("");
  const [vatAmount, setVatAmount] = useState<number>(0);
  // HERE CALCULATE TOTAL PRICE
  const totalPrice: number | string =
    watch("discountType") === "Fixed"
      ? totalCalculator(watch("products"), "subTotal") - watch("discount")
      : watch("discountType") === "Persent"
      ? totalCalculator(watch("products"), "subTotal") -
        percentageCalculator(
          +discountAmount,
          totalCalculator(watch("products"), "subTotal")
        )
      : totalCalculator(watch("products"), "subTotal");

  // HERE CALCULATE TOTAL VAT
  const totalVat = vatCalculator(
    totalCalculator(watch("products"), "subTotal"),
    vatAmount
  );

  // UPDATE THE COMPONENT VIA REFERENCE
  useEffect(() => {
    if (isPrinting && promiseResolveRef.current) {
      promiseResolveRef.current();
    }
  }, [isPrinting]);

  const handlePrint = useReactToPrint({
    content: () => printPOSRef.current,
    onBeforeGetContent: () => {
      return new Promise((resolve) => {
        promiseResolveRef.current = resolve;
        setIsPrinting(true);
      });
    },
    onAfterPrint: () => {
      // RESET THE PROMISE RESOLVE SO WE CAN PRINT AGAIN
      promiseResolveRef.current = null;
      setIsPrinting(false);
      setClear(false);
      setVatAmount(0);
      setDiscountAmount("");
    },
  });
  // ADDING NEW POS
  const onSubmit = async (data: any) => {
    const result = await addPOS(data);
    if (result?.data?.success) {
      // AFTER COMPLETE THE ADDING POS CALL TO PRINT
      handlePrint();
      // RESET PREVIOUS FORM DATA
      reset();
      // GIVE PERMISSION TO CLEAR ALL PREVIOUS DATA
      setClear(true);
      // SHOW TOAST FOR ADDING NEW POS
      toast({
        title: "POS Message",
        description: "POS added successfully",
      });
    }
  };

  return (
    <section>
      <form onSubmit={addPOSHandleSubmit(onSubmit)}>
        <AddPointOfSellContainer
          totalVat={totalVat}
          totalPrice={totalPrice}
          vatAmount={vatAmount}
          setVatAmount={setVatAmount}
          discountAmount={discountAmount}
          setDiscountAmount={setDiscountAmount}
          loading={addPOSLoading}
          watch={watch}
          setValue={setValue}
          error={errors}
          register={addPOSRegister}
          clear={clear}
          setClear={setClear}
        />
      </form>
      <div className="invisible hidden -left-full">
        {addPOSSuccess && (
          <PrintPos
            discountAmount={discountAmount}
            vatAmount={vatAmount}
            ref={printPOSRef}
            POSData={posData}
          />
        )}
      </div>
    </section>
  );
};
export default AddPointOfSell;
