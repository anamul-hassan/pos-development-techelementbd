import * as yup from "yup";

export const addExpenseSchema = yup.object().shape({
  date: yup.string().required(""),
  image: yup.string().required("Image is required"),
  name: yup.string().required("Name is require"),
  expenseCategoryId: yup.number().optional(),
  expenseSubcategoryId: yup.number().optional(),
  totalAmount: yup.number().optional().positive().integer(),
});
