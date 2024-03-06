import * as yup from "yup";

export const AccountSchema = yup.object().shape({
  accountName: yup.string().required("Account name is required"),
  bankName: yup.string().required("Bank name is required"),
  accountHolderName: yup.string().required("Account Holder name is required"),
  accountNumber: yup.string().required("Account number is required"),
  accountType: yup.string().required(),
  branchId: yup.number().required(),
  openingBalance: yup.number().required().positive().integer(),
});
