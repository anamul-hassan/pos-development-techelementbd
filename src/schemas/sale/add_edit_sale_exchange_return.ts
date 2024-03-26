import * as yup from "yup";

export const addEditSaleExchangeReturnSchema = yup.object().shape({
  branchId: yup.number().required("Branch is required"),
  customerId: yup.number().required("Customer is required"),
  sellId: yup.number().required("Sell is required"),
  totalPrice: yup.number().required("Total price is required"),
  totalPaymentAmount: yup.number().required("Total payment is required"),
  returnPrice: yup.number().required(),
  customerPay: yup.number(),
  sellerPay: yup.number(),
  returnProduct: yup.array().of(
    yup.object().shape({
      sellProductId: yup.number().required("Sell product is required"),
      quantity: yup.number().required("Quantity is required"),
    })
  ),
  payments: yup.array().of(
    yup.object().shape({
      accountId: yup.number().optional().nullable(),
      paymentAmount: yup.number().optional(),
    })
  ),
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
});
