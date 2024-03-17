import BarCode from "@/components/common/BarCode";
import SubmitErrorWrapper from "@/components/common/form/SubmitErrorWrapper";
import AddPurchaseContainer from "@/components/dashboard/purchase/AddPurchaseContainer";
import { useToast } from "@/components/ui/use-toast";
import { addEditPurchaseSchema } from "@/schemas/purchase/purchase_schema";
import { useAddPurchaseMutation } from "@/store/purchase/purchaseApi";
import { CLIENT_DETAILS } from "@/utils/constants/client_information/client_details";
import { objectCopier } from "@/utils/helpers/objectCopier";
import { removeEmptyStringOrZeroProperties } from "@/utils/helpers/removeEmptyStringProperties";
import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useReactToPrint } from "react-to-print";

interface IAddPurchaseProps {}

const AddPurchase: FC<IAddPurchaseProps> = () => {
  const { companyName } = CLIENT_DETAILS;
  const { toast } = useToast();
  // REFERENCE FOR PRINT SELECTED COMPONENT
  const labelPrintRef = useRef(null);
  // STORE PROMISE RESOLVE REFERENCE
  const promiseResolveRef = useRef<any>(null);
  const [isPrinting, setIsPrinting] = useState(false);
  const [labelList, setLabelList] = useState<any>([]);
  const [clear, setClear] = useState(false);

  // ADD PURCHASE MUTATION
  const [
    addPurchase,
    { isLoading: addPurchaseLoading, error: addPurchaseError },
  ] = useAddPurchaseMutation({}) as any;

  // REACT HOOK FORM
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(addEditPurchaseSchema),
    defaultValues: {
      discount: 0,
      referenceNo: "",
      attachDocument: "",
      purchaseDate: "",
      note: "",
      supplierId: 0,
      discountType: "Fixed",
      purchaseStatus: "Received",
      branchId: 0,
      due: 0,
      totalAmount: 0,
      totalPaymentAmount: 0,
      payments: [
        {
          accountId: 0,
          paymentAmount: 0,
        },
      ],
      products: [
        {
          productId: 0,
          quantity: 0,
          price: 0,
          size: "",
          sellingPrice: 0,
          subTotal: 0,
          color: "",
          warrantyId: 0,
          sku: "",
        },
      ],
    },
  });

  // UPDATE THE COMPONENT VIA REFERENCE
  useEffect(() => {
    if (isPrinting && promiseResolveRef.current) {
      promiseResolveRef.current();
    }
  }, [isPrinting]);

  const handlePrint = useReactToPrint({
    content: () => labelPrintRef.current,
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
    },
  });

  const onSubmit = async (data: any) => {
    const generalData = removeEmptyStringOrZeroProperties(data, [
      "referenceNo",
      "attachDocument",
      "note",
    ]);
    const productData = data.products.flatMap((singleData: any) =>
      removeEmptyStringOrZeroProperties(singleData, [
        "sku",
        "color",
        "size",
        "version",
        "warrantyId",
      ])
    );

    const isPaymentAvailable = data?.payments
      .map((singlePayment: any) =>
        removeEmptyStringOrZeroProperties(singlePayment, ["accountId"])
      )
      .filter((singlePayment: any) => {
        if (Object.keys(singlePayment).length > 0) {
          return singlePayment;
        }
      });

    const updateData = {
      ...generalData,
      products: productData,
      payments: isPaymentAvailable.filter(
        (singlePayment: any) => "accountId" in singlePayment
      ),
    };

    const result = (await addPurchase(updateData)) as any;

    if (result?.data?.success) {
      setLabelList(
        result?.data?.data?.purchaseProducts?.flatMap((singleLabel: any) => {
          const quantity = singleLabel?.quantity;
          return objectCopier(singleLabel, quantity);
        })
      );

      // AFTER COMPLETE THE ADDING POS CALL TO PRINT
      handlePrint();
      // RESET PREVIOUS FORM DATA
      reset();
      // GIVE PERMISSION TO CLEAR ALL PREVIOUS DATA
      setClear(true);
      // SHOW TOAST FOR ADDING NEW POS
      toast({
        title: "App Purchase Message",
        description: "New Purchase added successfully",
      });
    }
  };

  return (
    <section className="pb-12">
      <form onSubmit={handleSubmit(onSubmit)}>
        <AddPurchaseContainer
          register={register}
          watch={watch}
          setValue={setValue}
          error={errors}
          clear={clear}
        />

        {/* ERROR MESSAGE */}
        <SubmitErrorWrapper
          error={addPurchaseError}
          loading={addPurchaseLoading}
          errorTitle="Add Expense Error"
          buttonLabel="Add Purchase"
        />
      </form>

      <div className="hidden">
        <div ref={labelPrintRef}>
          {labelList?.map((singleProduct: any, productIndex: number) => (
            <div
              key={productIndex}
              className="flex justify-center items-center"
            >
              <BarCode
                singleProduct={singleProduct}
                companyName={companyName}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AddPurchase;
