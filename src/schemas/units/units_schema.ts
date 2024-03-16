import * as yup from "yup";

export const addEditUnitSchema = yup.object().shape({
  name: yup.string().required("Unit name is required"),
  shortName: yup.string().required("Unit short name is required"),
  allowDecimal: yup.string().required("Decimal is required"),
});
