import * as yup from "yup";
import { englishOnly, phoneEng } from "../common/commonSchemas";
// ADD NEW CLIENT SCHEMA

export const addAndEditClientSchema = yup.object().shape({
  name: yup
    .string()
    .max(100, "Client name limit 100 characters")
    .required("Client name is required"),
  phone: phoneEng.required("Phone number is required"),
  membershipId: englishOnly.max(100, "Membership ID limit 100 characters"),
});
