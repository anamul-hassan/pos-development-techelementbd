import * as yup from "yup";

// ADD NEW VARIATION SCHEMA

export const addAndEditVariationColorSchema = yup.object().shape({
  color: yup
    .string()
    .max(100, "Variation color limit 100 characters")
    .required("Variation color is required"),
});
