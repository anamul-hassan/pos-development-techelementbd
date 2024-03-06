import * as yup from "yup";
export const brandSchema = yup.object().shape({
  brand: yup.string().required("Brand Name is required"),
  note: yup.string().optional(),
});
