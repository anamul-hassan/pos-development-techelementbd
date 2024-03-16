import * as yup from "yup";

export const addEditWarrantySchema = yup.object().shape({
  warrantyType: yup.string().required("Warranty type is required"),
  warranty: yup.string().required("Warranty is required"),
});
