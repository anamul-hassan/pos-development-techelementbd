import * as yup from "yup";

export const ExpenseCategorySchema = yup.object().shape({
    name: yup.string().required("Name is required"),
});