import * as yup from "yup";
export const addEditBrandSchema = yup.object().shape({
  brand: yup.string().required("Brand name is required"),
  note: yup.string().optional(),
});
