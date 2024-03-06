import * as yup from "yup";

export const addUserSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().optional(),
  gender: yup.string().optional(),
  dateOfBirth: yup.string().optional(),
  bloodGroup: yup.string().optional(),
  martialStatus: yup.string().optional(),
  alternatePhone: yup.string().optional(),
  familyPhone: yup.string().optional(),
  currentAddress: yup.string().optional(),
  permanentAddress: yup.string().optional(),
  facebook: yup.string().optional(),
  twitter: yup.string().optional(),
  phone: yup.string().required("User number is required"),
  email: yup.string().required("User email is required"),
  password: yup.string().min(8).max(24).required("Password is required"),
  role: yup.string().required("Role is required"),
  fileAttachment: yup.string().optional(),
  avatar: yup.string().optional(),
  branchId: yup.number().required("Branch is required"),
});
