import { ILabelPlaceholder } from "../../common/form_type";

export interface IAddEditAccount {
  bankName: ILabelPlaceholder;
  accountHolderName: ILabelPlaceholder;
  accountName: ILabelPlaceholder;
  accountNumber: ILabelPlaceholder;
  accountType: ILabelPlaceholder;
  branchId: ILabelPlaceholder;
  openingBalance: ILabelPlaceholder;
}
export const ADD_EDIT_ACCOUNT_FORM_DATA: IAddEditAccount = {
  bankName: {
    label: {
      en: "Write Bank Name ✽",
      bn: "",
    },
    placeholder: {
      en: "Write bank name",
      bn: "",
    },
  },
  accountHolderName: {
    label: {
      en: "Write Account Holder Name ✽",
      bn: "",
    },
    placeholder: {
      en: "Write account holder name",
      bn: "",
    },
  },
  accountName: {
    label: {
      en: "Write Account Name ✽",
      bn: "",
    },
    placeholder: {
      en: "Write account name",
      bn: "",
    },
  },
  accountNumber: {
    label: {
      en: "Write Account Number ✽",
      bn: "",
    },
    placeholder: {
      en: "Write account number",
      bn: "",
    },
  },
  accountType: {
    label: {
      en: "Select Account Type ✽",
      bn: "",
    },
    placeholder: {
      en: "Select account type",
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
  openingBalance: {
    label: {
      en: "Write Opening Balance ✽",
      bn: "",
    },
    placeholder: {
      en: "Write opening balance",
      bn: "",
    },
  },
};
