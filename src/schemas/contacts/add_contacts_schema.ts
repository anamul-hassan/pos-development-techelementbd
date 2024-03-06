import * as yup from "yup";

export const addContactsSchema = yup.object().shape({
  email: yup.string().required("Email is required"),
  businessName: yup.string().optional(),
  phone: yup.string().required("Phone is required"),
  tax: yup.string().optional(),
  openingBalance: yup.string().optional(),
  peyTerm: yup.string().optional(),
  creditLimit: yup.string().optional(),
  address: yup.string().optional(),
  city: yup.string().optional(),
  state: yup.string().optional(),
  zipCode: yup.string().optional(),
  firstName: yup.string().optional(),
  lastName: yup.string().optional(),
  alternatePhone: yup.string().optional(),
  membershipId: yup.string().optional(),
  familyPhone: yup.string().optional(),
  department: yup.string().optional(),
  pointAmount: yup.string().optional(),
  point: yup.string().optional(),
  payTerm: yup.string().required("Day, Month is required"),
});
