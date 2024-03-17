import * as yup from "yup";

export const addEditSaleExchangeReturnSchema = yup.object().shape({
  customerId: yup.number().required("Customer is required"),
  sellId: yup.number().required("Sell is required"),
  customerPay: yup.number(),
  sellerPay: yup.number(),
  returnProduct: yup.array().of(
    yup.object().shape({
      sellProductId: yup.number().required("Sell Product is required"),
      quantity: yup.number().required("Quantity is required"),
    })
  ),
  payments: yup.array().of(
    yup.object().shape({
      accountId: yup.number().required("Account is required"),
      paymentAmount: yup.number().required("Payment Amount is required"),
    })
  ),
});

export const addEditSaleExchangeProductSchema = yup.object().shape({
  variationProductId: yup.number().required("Variation Product is required"),
  quantity: yup.number().required("Quantity is required"),
  unitPrice: yup.number().required("Unit Price is required"),
  warranty: yup.string(),
  discount: yup.number(),
  subTotal: yup.number().required("Subtotal is required"),
});
