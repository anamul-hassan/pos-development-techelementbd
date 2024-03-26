import * as yup from "yup";
import { englishOnly, phoneEng } from "../common/commonSchemas";
// ADD NEW CLIENT SCHEMA

export const addAndEditClientSchema = yup.object().shape({
  name: englishOnly.max(100, "Customer name limit 100 characters").optional(),
  phone: phoneEng.required("Phone number is required"),
  memberShipId: englishOnly.max(100, "Membership number limit 100 characters"),
  branchId: yup.number().required("Branch is required"),
});
