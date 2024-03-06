import * as yup from "yup";
export const ExpenseSubCategorySchema = yup.object().shape({
  name: yup.string().required("Sub-Category Name is required"),
  expenseCategoryId: yup.number().required("Sub-Category Id is required"),
});
