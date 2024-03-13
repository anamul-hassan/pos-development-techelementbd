import { ILabelPlaceholder } from "../common/form_type";

export interface IAddEditSupplier {
  email: ILabelPlaceholder;
  branchId: ILabelPlaceholder;
  phone: ILabelPlaceholder;
  tax: ILabelPlaceholder;
  openingBalance: ILabelPlaceholder;
  advanceAmount: ILabelPlaceholder;
  dueAmount: ILabelPlaceholder;
  address: ILabelPlaceholder;
  city: ILabelPlaceholder;
  state: ILabelPlaceholder;
  zipCode: ILabelPlaceholder;
  firstName: ILabelPlaceholder;
  lastName: ILabelPlaceholder;
  creditLimit: ILabelPlaceholder;
  memberShipId: ILabelPlaceholder;
  paidStatus: ILabelPlaceholder;
  payTerm: ILabelPlaceholder;
}

export const ADD_EDIT_SUPPLIER_FORM: IAddEditSupplier = {
  email: {
    label: {
      en: "Write Supplier's Email",
      bn: "",
    },
    placeholder: {
      en: "Write supplier's email",
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
  phone: {
    label: {
      en: "Write Supplier's Phone Number ✽",
      bn: "",
    },
    placeholder: {
      en: "Write supplier's phone number",
      bn: "",
    },
  },
  tax: {
    label: {
      en: "Write TAX Amount",
      bn: "",
    },
    placeholder: {
      en: "Write tax amount",
      bn: "",
    },
  },
  openingBalance: {
    label: {
      en: "Write Opening Balance Amount",
      bn: "",
    },
    placeholder: {
      en: "Write opening balance amount",
      bn: "",
    },
  },
  advanceAmount: {
    label: {
      en: "Write Advance Amount",
      bn: "",
    },
    placeholder: {
      en: "Write advance amount",
      bn: "",
    },
  },
  dueAmount: {
    label: {
      en: "Write Due Amount",
      bn: "",
    },
    placeholder: {
      en: "Write due amount",
      bn: "",
    },
  },
  address: {
    label: {
      en: "Write Supplier's Address",
      bn: "",
    },
    placeholder: {
      en: "Write supplier's address",
      bn: "",
    },
  },
  city: {
    label: {
      en: "Write Current City",
      bn: "",
    },
    placeholder: {
      en: "Write current city",
      bn: "",
    },
  },
  state: {
    label: {
      en: "Write Current State",
      bn: "",
    },
    placeholder: {
      en: "Write current state",
      bn: "",
    },
  },
  zipCode: {
    label: {
      en: "Write Zip Code",
      bn: "",
    },
    placeholder: {
      en: "Write zip code",
      bn: "",
    },
  },
  firstName: {
    label: {
      en: "Write First Name ✽",
      bn: "",
    },
    placeholder: {
      en: "Write first name",
      bn: "",
    },
  },
  lastName: {
    label: {
      en: "Write Last Name",
      bn: "",
    },
    placeholder: {
      en: "Write last name",
      bn: "",
    },
  },
  creditLimit: {
    label: {
      en: "Write Credit Limitation",
      bn: "",
    },
    placeholder: {
      en: "Write credit limitation",
      bn: "",
    },
  },
  memberShipId: {
    label: {
      en: "Write Membership ID",
      bn: "",
    },
    placeholder: {
      en: "Write membership id",
      bn: "",
    },
  },
  paidStatus: {
    label: {
      en: "Select Paid Status",
      bn: "",
    },
    placeholder: {
      en: "Select paid status",
      bn: "",
    },
  },
  payTerm: {
    label: {
      en: "Select Pay Term",
      bn: "",
    },
    placeholder: {
      en: "Select pay term",
      bn: "",
    },
  },
};
