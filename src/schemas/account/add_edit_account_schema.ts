import * as yup from "yup";

export const addEditAccountSchema = yup.object().shape({
  bankName: yup.string().required("Bank name is required"),
  accountHolderName: yup.string().required("Account holder name is required"),
  accountName: yup.string().required("Account name is required"),
  accountNumber: yup.string().required("Account number is required"),
  accountType: yup.string().required("Account type is required"),
  branchId: yup
    .number()
    .required("Branch is required")
    .typeError("Branch Id must be a number"),
  openingBalance: yup
    .number()
    .required("Opening balance is required")
    .positive("Opening balance must be a positive number")
    .integer("Opening balance must be an integer")
    .typeError("Opening balance must be a number"),
});
