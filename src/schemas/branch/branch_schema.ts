import * as yup from "yup";

export const addEditBranchSchema = yup.object().shape({
  branchName: yup.string().required("Branch name is required"),
  branchLocation: yup.string().required("Branch location is required"),
});
