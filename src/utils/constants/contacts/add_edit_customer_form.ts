import { ILabelPlaceholder } from "../common/form_type";

export interface IAddEditCustomer {
  firstName: ILabelPlaceholder;
  lastName: ILabelPlaceholder;
  email: ILabelPlaceholder;
  tax: ILabelPlaceholder;
  phone: ILabelPlaceholder;
  openingBalance: ILabelPlaceholder;
  peyTerm: ILabelPlaceholder;
  creditLimit: ILabelPlaceholder;
  address: ILabelPlaceholder;
  city: ILabelPlaceholder;
  state: ILabelPlaceholder;
  zipCode: ILabelPlaceholder;
  alternatePhone: ILabelPlaceholder;
  familyPhone: ILabelPlaceholder;
  department: ILabelPlaceholder;
  permanentAddress: ILabelPlaceholder;
  branchId: ILabelPlaceholder;
  memberShipId: ILabelPlaceholder;
}

export const ADD_EDIT_CUSTOMER_FORM: IAddEditCustomer = {
  firstName: {
    label: {
      en: "Write First Name",
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
  email: {
    label: {
      en: "Write Customer's Email",
      bn: "",
    },
    placeholder: {
      en: "Write customer's email",
      bn: "",
    },
  },
  tax: {
    label: {
      en: "Write Tax Information",
      bn: "",
    },
    placeholder: {
      en: "Write tax information",
      bn: "",
    },
  },
  phone: {
    label: {
      en: "Write Customer's Phone ✽",
      bn: "",
    },
    placeholder: {
      en: "Write phone number",
      bn: "",
    },
  },
  openingBalance: {
    label: {
      en: "Write Opening Balance",
      bn: "",
    },
    placeholder: {
      en: "Write opening balance",
      bn: "",
    },
  },
  peyTerm: {
    label: {
      en: "Select Payment Term",
      bn: "",
    },
    placeholder: {
      en: "Select payment term",
      bn: "",
    },
  },
  creditLimit: {
    label: {
      en: "Write Credit Limit",
      bn: "",
    },
    placeholder: {
      en: "Write credit limit",
      bn: "",
    },
  },
  address: {
    label: {
      en: "Write Current Address",
      bn: "",
    },
    placeholder: {
      en: "Write current address",
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
  alternatePhone: {
    label: {
      en: "Write Alternative Phone",
      bn: "",
    },
    placeholder: {
      en: "Write alternative phone number",
      bn: "",
    },
  },
  familyPhone: {
    label: {
      en: "Write Family Phone",
      bn: "",
    },
    placeholder: {
      en: "Write family phone number",
      bn: "",
    },
  },
  department: {
    label: {
      en: "Write Department Information",
      bn: "",
    },
    placeholder: {
      en: "Write department information",
      bn: "",
    },
  },
  permanentAddress: {
    label: {
      en: "Write Permanent Address",
      bn: "",
    },
    placeholder: {
      en: "Write permanent address",
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
  memberShipId: {
    label: {
      en: "Write Membership ID",
      bn: "",
    },
    placeholder: {
      en: "Write membership ID",
      bn: "",
    },
  },
};
