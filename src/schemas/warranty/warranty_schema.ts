import * as yup from "yup";

export const addWarrantySchema = yup.object().shape({
  warrantyType: yup.string().required(),
  warranty: yup.string().required(),
});
