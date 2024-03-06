import * as yup from "yup";
export const categoryEditSchema = yup.object().shape({
  categoryName: yup.string().optional(),
  description: yup.string(),
  categoryCode: yup.string(),
});
