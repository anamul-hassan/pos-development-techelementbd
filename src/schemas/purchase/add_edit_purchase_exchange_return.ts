import * as yup from "yup";

export const addEditPurchaseExchangeReturnSchema = yup.object().shape({
  supplierId: yup.number().required("Supplier is required"),
  returnPrice: yup.number().required("Return price is required"),
  branchId: yup.number().required("Branch is required"),
  purchaseId: yup.number().required("Purchase is required"),
  returnProduct: yup.array().of(
    yup.object().shape({
      purchaseProductId: yup.number().required("Purchase product is required"),
      quantity: yup.number().required("Quantity is required"),
    })
  ),
});
