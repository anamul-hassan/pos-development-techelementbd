import * as yup from "yup";

export const AddInvestSchema = yup.object().shape({
    investName: yup.string().required("Invest name is required"),
    investBalances: yup.number().required("Invest balance is required").positive().integer(),
    accountId: yup.string().required(),
});