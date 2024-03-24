import AddSaleContainer from "@/components/dashboard/sale/AddSaleContainer";
import PrintSale from "@/components/dashboard/sale/PrintSale";
import { useToast } from "@/components/ui/use-toast";
import { addEditSaleSchema } from "@/schemas/sale/add_edit_sale_schema";
import { useAddSaleMutation } from "@/store/sale/saleApi";
import { percentageCalculator } from "@/utils/helpers/percentageCalculator";
import { shareBranchAndUserInfo } from "@/utils/helpers/shareBranchAndUserInfo";
import { totalCalculator } from "@/utils/helpers/totalCalculator";
import { vatCalculator } from "@/utils/helpers/vatCalculator";
import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useReactToPrint } from "react-to-print";

interface IAddPointOfSellProps {}

const AddSale: FC<IAddPointOfSellProps> = () => {
  // TOAST HOOK
  const { toast } = useToast();
  const [clear, setClear] = useState(false);

  // GET BRANCH ID FORM COOKIE
  const { branchId } = shareBranchAndUserInfo();

  // REFERENCE FOR PRINT SELECTED COMPONENT
  const printSaleRef = useRef(null);
  const [isPrinting, setIsPrinting] = useState(false);

  // STORE PROMISE RESOLVE REFERENCE
  const promiseResolveRef = useRef<any>(null);

  // ADD NEW SALE MUTATION
  const [
    addSale,
    { data: saleData, isLoading: addSaleLoading, isSuccess: addSaleSuccess },
  ] = useAddSaleMutation({}) as any;

  // FORM FOR ADD NEW SALE
  const {
    register: addSaleRegister,
    handleSubmit: addSaleHandleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver<any>(addEditSaleSchema),
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
    content: () => printSaleRef.current,
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
  // ADDING NEW SALE
  const onSubmit = async (data: any) => {
    const result = await addSale(data);
    if (result?.data?.success) {
      // AFTER COMPLETE THE ADDING SALE CALL TO PRINT
      handlePrint();
      // RESET PREVIOUS FORM DATA
      reset();
      // GIVE PERMISSION TO CLEAR ALL PREVIOUS DATA
      setClear(true);
      // SHOW TOAST FOR ADDING NEW SALE
      toast({
        title: "Sale Message",
        description: "Sale added successfully",
      });
    }
  };

  // console.log(watch(), "form");

  return (
    <section>
      <form onSubmit={addSaleHandleSubmit(onSubmit)}>
        <AddSaleContainer
          setError={setError}
          totalVat={totalVat}
          totalPrice={totalPrice}
          vatAmount={vatAmount}
          setVatAmount={setVatAmount}
          discountAmount={discountAmount}
          setDiscountAmount={setDiscountAmount}
          loading={addSaleLoading}
          watch={watch}
          setValue={setValue}
          error={errors}
          register={addSaleRegister}
          clear={clear}
          setClear={setClear}
        />
      </form>
      <div className="invisible hidden -left-full">
        {addSaleSuccess && (
          <PrintSale
            discountAmount={discountAmount}
            vatAmount={vatAmount}
            ref={printSaleRef}
            saleData={saleData}
          />
        )}
      </div>
    </section>
  );
};
export default AddSale;
