import * as yup from "yup";

export const addEditCustomerPaymentSchema = yup.object().shape({
  customerId: yup.number().required("Customer is required"),
  type: yup.string().required("Type is required").oneOf(["Advance", "Due"]),
  amount: yup.number().required("Amount is required"),
  payments: yup.array().of(
    yup.object().shape({
      accountId: yup.number().required("Account is required").nullable(),
      paymentAmount: yup.number().required("Payment amount is required"),
    })
  ),
});
