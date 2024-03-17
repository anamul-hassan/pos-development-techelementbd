import * as yup from "yup";

export const addEditSaleSchema = yup.object().shape({
  branchId: yup.number().required("Branch ID is required"),
  customerId: yup.number().required("Client info is required"),
  discount: yup.number(),
  discountType: yup.string(),
  products: yup.array().of(
    yup.object().shape({
      variationProductId: yup.number().required("Product selected is required"),
      quantity: yup
        .number()
        .required("Product quantity is required")
        .positive("Must be positive number")
        .integer("Must be integer number"),
      unitPrice: yup.number().required("Product price is required"),
      subTotal: yup.number().required("Sub-total is required"),
    })
  ),
  payments: yup.array().of(
    yup.object({
      accountId: yup
        .number()
        .required("Account selected is required for purchasing"),
      paymentAmount: yup.number().required("Payment amount is required"),
    })
  ),
  totalPaymentAmount: yup
    .number()
    .min(1, "Total payment amount is required")
    .required("Total payment amount is required"),
  totalPrice: yup
    .number()
    .min(1, "Total price is required")
    .required("Total price is required"),
});
