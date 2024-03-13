import { ILabelPlaceholder } from "../common/form_type";

export interface IAddEditCustomer {
  name: ILabelPlaceholder;
  phone: ILabelPlaceholder;
  membershipId: ILabelPlaceholder;
  branchId: ILabelPlaceholder;
}

export const ADD_EDIT_CLIENT_FORM: IAddEditCustomer = {
  name: {
    label: {
      en: "Write Customer's Name",
      bn: "",
    },
    placeholder: {
      en: "Write customer's name",
      bn: "",
    },
  },
  phone: {
    label: {
      en: "Write Customer's Phone Number ✽",
      bn: "",
    },
    placeholder: {
      en: "Write customer's phone number",
      bn: "",
    },
  },
  membershipId: {
    label: {
      en: "Write Customer's Membership Number",
      bn: "",
    },
    placeholder: {
      en: "Write customer's membership number",
      bn: "",
    },
  },
  branchId: {
    label: {
      en: "Select Branch ✽",
      bn: "",
    },
    placeholder: {
      en: "Select branch",
      bn: "",
    },
  },
};
