import * as yup from "yup";

export const addBranchSchema = yup.object().shape({
  branchName: yup.string().required("Branch name is required"),
  branchLocation: yup.string().required("Branch location is required"),
});
