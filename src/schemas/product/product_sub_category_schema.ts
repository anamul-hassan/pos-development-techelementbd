import * as yup from "yup";

export const addEditProductSubCategorySchema = yup.object().shape({
  categoryId: yup.number().required("Category is required"),
  subCategoryName: yup.string().required("Sub-category name is required"),
});
