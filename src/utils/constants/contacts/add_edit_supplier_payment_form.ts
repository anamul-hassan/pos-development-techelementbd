import { ILabelPlaceholder } from "../common/form_type";

export interface IAddEditSupplierPayment {
  supplierId: ILabelPlaceholder;
  type: ILabelPlaceholder;
  paymentAmount: ILabelPlaceholder;
}

export const ADD_EDIT_SUPPLIER_PAYMENT_FORM_DATA: IAddEditSupplierPayment = {
  supplierId: {
    label: {
      en: "Select Supplier ✽",
      bn: "",
    },
    placeholder: {
      en: "Select supplier",
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
