import { ILabelPlaceholder } from "../common/form_type";

export interface IAddEditExpense {
  date: ILabelPlaceholder;
  image: ILabelPlaceholder;
  name: ILabelPlaceholder;
  expenseCategoryId: ILabelPlaceholder;
  expenseSubcategoryId: ILabelPlaceholder;
  totalAmount: ILabelPlaceholder;
  branchId: ILabelPlaceholder;
  accountId: ILabelPlaceholder;
  paymentAmount: ILabelPlaceholder;
}

export const ADD_EDIT_EXPENSE_FORM_DATA: IAddEditExpense = {
  date: {
    label: {
      en: "Select Expense Data",
      bn: "",
    },
    placeholder: {
      en: "Select expense data",
      bn: "",
    },
  },
  image: {
    label: {
      en: "Attach Expense File",
      bn: "",
    },
    placeholder: {
      en: "Attach expense file",
      bn: "",
    },
  },
  name: {
    label: {
      en: "Write Expense Name ✽",
      bn: "",
    },
    placeholder: {
      en: "Write expense name",
      bn: "",
    },
  },
  expenseCategoryId: {
    label: {
      en: "Select Expense Category ✽",
      bn: "",
    },
    placeholder: {
      en: "Select expense category",
      bn: "",
    },
  },
  expenseSubcategoryId: {
    label: {
      en: "Select Expense Sub-category ✽",
      bn: "",
    },
    placeholder: {
      en: "Select expense sub-category",
      bn: "",
    },
  },
  totalAmount: {
    label: {
      en: "Write Total Expense Amount ✽",
      bn: "",
    },
    placeholder: {
      en: "Write total expense amount",
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
  accountId: {
    label: {
      en: "Select Account ✽",
      bn: "",
    },
    placeholder: {
      en: "Select account",
      bn: "",
    },
  },
  paymentAmount: {
    label: {
      en: "Write Payment Amount ✽",
      bn: "",
    },
    placeholder: {
      en: "Write payment amount",
      bn: "",
    },
  },
};
