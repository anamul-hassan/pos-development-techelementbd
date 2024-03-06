import * as yup from "yup";
export const brandEditSchema = yup.object().shape({
  brand: yup.string().optional(),
  note: yup.string().optional(),
});
