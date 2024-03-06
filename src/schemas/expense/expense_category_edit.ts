import * as yup from "yup";

export const ExpenseCategoryEditSchema = yup.object().shape({
  name: yup.string().optional(),
});
