import * as yup from "yup";
export const addEditProductCategorySchema = yup.object().shape({
  categoryName: yup.string().required("Category Name is required"),
  description: yup.string(),
  categoryCode: yup.string(),
});
