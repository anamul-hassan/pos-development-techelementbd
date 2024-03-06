import * as yup from "yup";
export const ExpenseSubEditCategorySchema = yup.object().shape({
  name: yup.string().optional(),
  expenseCategoryId: yup.string().optional(),
});
