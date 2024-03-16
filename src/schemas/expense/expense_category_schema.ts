import * as yup from "yup";

export const addEditExpenseCategorySchema = yup.object().shape({
  name: yup.string().required("Category name is required"),
});
