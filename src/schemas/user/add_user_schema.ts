import * as yup from "yup";

export const addEditUserSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().optional(),
  gender: yup.string().optional(),
  dateOfBirth: yup.date().optional(),
  bloodGroup: yup.string().optional(),
  maritialStatus: yup.string().optional(),
  alternatePhone: yup.string().optional(),
  familyPhone: yup.string().optional(),
  currentAddress: yup.string().optional(),
  permanentAddress: yup.string().optional(),
  facebook: yup.string().optional(),
  twitter: yup.string().optional(),
  phone: yup.string().required("Phone is required"),
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
  role: yup.string().required("Role is required"),
  fileAttachment: yup.string().optional(),
  avatar: yup.string().optional(),
  branchId: yup.number().required("Branch is required"),
});
