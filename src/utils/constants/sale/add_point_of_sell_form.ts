import { ILabelPlaceholder } from "../common/form_type";

export interface IAddEditSaleForm {
  search_product: ILabelPlaceholder;
  search_client: ILabelPlaceholder;
  discount_type: ILabelPlaceholder;
  discount_amount: ILabelPlaceholder;
  payment_method: ILabelPlaceholder;
  payable_amount: ILabelPlaceholder;
  vat_amount: ILabelPlaceholder;
}

export const ADD_EDIT_SALE_FORM: IAddEditSaleForm = {
  search_product: {
    label: {
      en: "Search Product Name/ ID/ IMEI/ Barcode ✽",
      bn: "",
    },
    placeholder: {
      en: "Name/ ID/ IMEI/ Barcode",
      bn: "",
    },
  },
  search_client: {
    label: {
      en: "Search Client Name/ Phone ✽",
      bn: "",
    },
    placeholder: {
      en: "Name / Phone/ ID",
      bn: "",
    },
  },
  discount_type: {
    label: {
      en: "Choose Discount Type",
      bn: "",
    },
    placeholder: {
      en: "Choose discount type",
      bn: "",
    },
  },
  discount_amount: {
    label: {
      en: "Enter The Discount Amount",
      bn: "",
    },
    placeholder: {
      en: "Enter the discount amount",
      bn: "",
    },
  },
  vat_amount: {
    label: {
      en: "Enter The VAT Amount",
      bn: "",
    },
    placeholder: {
      en: "Enter the VAT amount",
      bn: "",
    },
  },
  payment_method: {
    label: {
      en: "Choose The Method For Paying",
      bn: "",
    },
    placeholder: {
      en: "Choose the method for paying",
      bn: "",
    },
  },
  payable_amount: {
    label: {
      en: "Enter Amount",
      bn: "",
    },
    placeholder: {
      en: "Enter amount",
      bn: "",
    },
  },
};
