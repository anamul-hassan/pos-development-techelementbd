import * as yup from "yup";

export const addProductSchema = yup.object().shape({
  productName: yup.string().required("Product Name is required"),
  brandId: yup.number().required(),
  image: yup.string().required("Image is required"),
  categoryId: yup.number().required(),
  subCategoryId: yup.number().required(),
  unitsId: yup.number().required(),
});
