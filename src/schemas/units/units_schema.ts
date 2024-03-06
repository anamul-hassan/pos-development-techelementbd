import * as yup from "yup";

export const addUnitsSchema = yup.object().shape({
  name: yup.string().required("Unit Name is required"),
  shortName: yup.string().required("Short Name is required"),
  allowDecimal: yup.string().required(),
});
