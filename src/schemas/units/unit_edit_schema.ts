import * as yup from "yup";

export const UnitsEditSchema = yup.object().shape({
  name: yup.string().optional(),
  shortName: yup.string().optional(),
  allowDecimal: yup.string().required(),
});
