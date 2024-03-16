import * as yup from "yup";

export const addEditExpenseSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  expenseCategoryId: yup.number().required("Expense category ID is required"),
  branchId: yup.number().required("Branch ID is required"),
  expenseSubcategoryId: yup
    .number()
    .required("Expense subcategory ID is required"),
  totalAmount: yup.number().required("Total amount is required"),
  date: yup.date().optional(),
  image: yup.string().optional(),
  payments: yup.array().of(
    yup.object({
      accountId: yup.number().required("Account ID is required"),
      paymentAmount: yup.number().required("Payment amount is required"),
    })
  ),
});
