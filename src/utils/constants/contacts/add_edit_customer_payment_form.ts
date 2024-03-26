import { ILabelPlaceholder } from "../common/form_type";

export interface IAddEditCustomerPayment {
  customerId: ILabelPlaceholder;
  type: ILabelPlaceholder;
  searchClient: ILabelPlaceholder;
}

export const ADD_EDIT_CUSTOMER_PAYMENT_FORM_DATA: IAddEditCustomerPayment = {
  customerId: {
    label: {
      en: "Select Customer ✽",
      bn: "",
    },
    placeholder: {
      en: "Select customer",
      bn: "",
    },
  },
  searchClient: {
    label: {
      en: "Search Client Name/ Phone ✽",
      bn: "",
    },
    placeholder: {
      en: "Name / Phone/ ID",
      bn: "",
    },
  },
  type: {
    label: {
      en: "Select Payment Type ✽",
      bn: "",
    },
    placeholder: {
      en: "Select payment type",
      bn: "",
    },
  },
};
