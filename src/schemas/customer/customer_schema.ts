import * as yup from "yup";
export const customerSchema = yup.object().shape({
  email: yup.string().required("email is required"),
  // branchId: yup.string().required("branchId is required"),
  phone: yup.string().required("phone Number is required"),
  tax: yup.string().optional(),
  openingBalance: yup.number().optional().integer(),
  payTerm: yup.string().optional(),
  creditLimit: yup.number().optional().integer(),
  address: yup.string().optional(),
  city: yup.string().optional(),
  state: yup.string().optional(),
  zipCode: yup.string().optional(),
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().optional(),
  alternatePhone: yup.string().optional(),
  familyPhone: yup.string().optional(),
  department: yup.string().optional(),
});
