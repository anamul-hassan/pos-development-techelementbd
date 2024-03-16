import * as yup from "yup";
export const addEditExpenseSubCategorySchema = yup.object().shape({
  name: yup.string().required("Sub-category name is required"),
  expenseCategoryId: yup.number().required("Category is required"),
});
