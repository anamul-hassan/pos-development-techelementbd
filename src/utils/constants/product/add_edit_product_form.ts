import { ILabelPlaceholder } from "../common/form_type";

export interface IAddEditProduct {
  name: ILabelPlaceholder;
  thumbnail: ILabelPlaceholder;
  category: ILabelPlaceholder;
  sub_category: ILabelPlaceholder;
  brand: ILabelPlaceholder;
  unit: ILabelPlaceholder;
  branch: ILabelPlaceholder;
}

export const ADD_EDIT_PRODUCT_FORM: IAddEditProduct = {
  branch: {
    label: {
      en: "Select Branch ✽",
      bn: "",
    },
    placeholder: {
      en: "Select branch",
      bn: "",
    },
  },
  name: {
    label: {
      en: "Write Product Name ✽",
      bn: "",
    },
    placeholder: {
      en: "Write product name",
      bn: "",
    },
  },
  thumbnail: {
    label: {
      en: "Add Product Thumbnail",
      bn: "",
    },
    placeholder: {
      en: "Add product thumbnail",
      bn: "",
    },
  },
  category: {
    label: {
      en: "Select Category ✽",
      bn: "",
    },
    placeholder: {
      en: "Select category",
      bn: "",
    },
  },
  sub_category: {
    label: {
      en: "Select Sub-category ✽",
      bn: "",
    },
    placeholder: {
      en: "Select sub-category",
      bn: "",
    },
  },
  brand: {
    label: {
      en: "Select Product Brand ✽",
      bn: "",
    },
    placeholder: {
      en: "Select product brand",
      bn: "",
    },
  },
  unit: {
    label: {
      en: "Select Product Unit ✽",
      bn: "",
    },
    placeholder: {
      en: "Select product brand",
      bn: "",
    },
  },
};
