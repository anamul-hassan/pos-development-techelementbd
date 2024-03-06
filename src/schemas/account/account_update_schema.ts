import * as yup from "yup";

export const accountUpdateSchema = yup.object().shape({
  accountName: yup.string().optional(),
  bankName: yup.string().optional(),
  accountHolderName: yup.string().optional(),
  accountNumber: yup.string().optional(),
  accountType: yup.string().required(),
  openingBalance: yup.number().required().positive().integer(),
});
