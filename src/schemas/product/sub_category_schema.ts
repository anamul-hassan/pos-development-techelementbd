import * as yup from "yup";

export const addOrEditSubCategorySchema = yup.object().shape({
  categoryId: yup.number().required("Category is required"),
  subCategoryName: yup.string().required("Sub-category name is required"),
});
