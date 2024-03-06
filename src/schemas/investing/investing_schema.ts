import * as yup from "yup";

export const AddInvestingSchema = yup.object().shape({
    investingName: yup.string().required("Name is required"),
    investingBalances: yup.number().required("Investing balance is required").positive().integer(),
    investingType: yup.string().required(),
    accountId: yup.string().required(),
});