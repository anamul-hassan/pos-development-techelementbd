import * as yup from "yup";

export const addAndEditProductSchema = yup.object().shape({
  productName: yup.string().required("Product Name is required"),
  brandId: yup.number().required("Brand is required"),
  image: yup.string(),
  categoryId: yup.number().required("Category is required"),
  subCategoryId: yup.number().required("Sub-category is required"),
  unitsId: yup.number().required("Unit is required"),
  branchId: yup.number().required("Branch is required"),
});
