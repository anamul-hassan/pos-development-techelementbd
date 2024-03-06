import * as yup from "yup";

// ADD NEW VARIATION SCHEMA

export const addAndEditVariationSizeSchema = yup.object().shape({
  size: yup
    .string()
    .max(100, "Variation size limit 100 characters")
    .required("Variation size is required"),
});
