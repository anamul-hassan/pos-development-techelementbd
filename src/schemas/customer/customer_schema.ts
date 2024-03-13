import * as yup from "yup";
import { phoneEng } from "../common/commonSchemas";

export const addEditCustomerSchema = yup.object().shape({
  firstName: yup.string().optional(),
  lastName: yup.string().optional(),
  email: yup.string().email("Invalid email format").optional(),
  tax: yup.string().optional(),
  phone: phoneEng.required("Phone is required"),
  openingBalance: yup.number().optional(),
  peyTerm: yup.string().optional(),
  creditLimit: yup.number().optional(),
  address: yup.string().optional(),
  city: yup.string().optional(),
  state: yup.string().optional(),
  zipCode: yup.string().optional(),
  alternatePhone: phoneEng.optional(),
  familyPhone: phoneEng.optional(),
  department: yup.string().optional(),
  permanentAddress: yup.string().optional(),
  branchId: yup.number().required("Branch ID is required"),
  memberShipId: yup.string().optional(),
});
