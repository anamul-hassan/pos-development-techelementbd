import { ILabelPlaceholder } from "../common/form_type";

export interface IPurchaseGeneralInfo {
  search_supplier: ILabelPlaceholder;
  discount_type: ILabelPlaceholder;
  discount_amount: ILabelPlaceholder;
  payment_method: ILabelPlaceholder;
  payment_amount: ILabelPlaceholder;
  purchase_status: ILabelPlaceholder;
  purchase_date: ILabelPlaceholder;
  reference_number: ILabelPlaceholder;
  purchase_note: ILabelPlaceholder;
  attach_documents: ILabelPlaceholder;
  search_product: ILabelPlaceholder;
}

const PURCHASE_GENERAL_INFO_FORM: IPurchaseGeneralInfo = {
  search_supplier: {
    label: {
      en: "Select Product Supplier ✽",
      bn: "পণ্য সরবরাহকারী নির্বাচন করুন ✽",
    },
    placeholder: {
      en: "Select product supplier",
      bn: "পণ্য সরবরাহকারী নির্বাচন করুন",
    },
  },
  discount_type: {
    label: {
      en: "Select Discount Type",
      bn: "ডিসকাউন্টের ধরণ নির্বাচন করুন",
    },
    placeholder: {
      en: "Select Discount Type",
      bn: "ডিসকাউন্টের ধরণ নির্বাচন করুন",
    },
  },
  discount_amount: {
    label: {
      en: "Write Discount Amount",
      bn: "ডিসকাউন্ট পরিমাণ লিখুন",
    },
    placeholder: {
      en: "Write discount amount",
      bn: "ডিসকাউন্ট পরিমাণ লিখুন",
    },
  },
  payment_method: {
    label: {
      en: "Select Payment Method",
      bn: "পেমেন্ট পদ্ধতি নির্বাচন করুন",
    },
    placeholder: {
      en: "Select payment method",
      bn: "পেমেন্ট পদ্ধতি নির্বাচন করুন",
    },
  },
  payment_amount: {
    label: {
      en: "Write Payment Amount",
      bn: "পেমেন্ট পরিমাণ লিখুন",
    },
    placeholder: {
      en: "Write payment amount",
      bn: "পেমেন্ট পরিমাণ লিখুন",
    },
  },
  purchase_status: {
    label: {
      en: "Select Purchase Status",
      bn: "ক্রয় স্থিতি নির্বাচন করুন",
    },
    placeholder: {
      en: "Select purchase status",
      bn: "ক্রয় স্থিতি নির্বাচন করুন",
    },
  },
  purchase_date: {
    label: {
      en: "Select Purchase Date",
      bn: "ক্রয় তারিখ নির্বাচন করুন",
    },
    placeholder: {
      en: "Select purchase date",
      bn: "ক্রয় তারিখ নির্বাচন করুন",
    },
  },
  reference_number: {
    label: {
      en: "Write Reference Number/ Code",
      bn: "রেফারেন্স নম্বর লিখুন",
    },
    placeholder: {
      en: "Write reference number/ code",
      bn: "রেফারেন্স নম্বর লিখুন",
    },
  },
  purchase_note: {
    label: {
      en: "Write Note About Purchasing",
      bn: "ক্রয় সম্পর্কে নোট লিখুন",
    },
    placeholder: {
      en: "Write note about purchasing",
      bn: "ক্রয় সম্পর্কে নোট লিখুন",
    },
  },
  attach_documents: {
    label: {
      en: "Attach Document About Purchasing",
      bn: "ক্রয়ের সম্পর্কে ডকুমেন্ট সংযুক্ত করুন",
    },
    placeholder: {
      en: "Attach document about purchasing",
      bn: "ক্রয়ের সম্পর্কে ডকুমেন্ট সংযুক্ত করুন",
    },
  },
  search_product: {
    label: {
      en: "Search Product Name/ ID/ IMEI/ Barcode",
      bn: "",
    },
    placeholder: {
      en: "Name/ ID/ IMEI/ Barcode",
      bn: "",
    },
  },
};

interface IPurchaseProductInfo {
  quantity: ILabelPlaceholder;
  price: ILabelPlaceholder;
  selling_price: ILabelPlaceholder;
  warranty: ILabelPlaceholder;
  size: ILabelPlaceholder;
  color: ILabelPlaceholder;
  profit_margin: ILabelPlaceholder;
  sku: ILabelPlaceholder;
}

const PURCHASE_PRODUCT_INFO: IPurchaseProductInfo = {
  quantity: {
    label: {
      en: "Product Quantity ✽",
      bn: "সামগ্রীর পরিমাণ ✽",
    },
    placeholder: {
      en: "Enter product quantity",
      bn: "সামগ্রীর পরিমাণ লিখুন",
    },
  },
  price: {
    label: {
      en: "Purchase Price Per-unit ✽",
      bn: "প্রতি ইউনিটের ক্রয় মূল্য ✽",
    },
    placeholder: {
      en: "Enter Purchase price per-unit",
      bn: "প্রতি ইউনিটের ক্রয় মূল্য লিখুন",
    },
  },
  selling_price: {
    label: {
      en: "Selling Price Per-unit ✽",
      bn: "প্রতি ইউনিটের বিক্রয় মূল্য ✽",
    },
    placeholder: {
      en: "Enter selling price per-unit",
      bn: "প্রতি ইউনিটের বিক্রয় মূল্য লিখুন",
    },
  },
  warranty: {
    label: {
      en: "Select Warranty",
      bn: "গ্যারান্টি নির্বাচন করুন",
    },
    placeholder: {
      en: "Product warranty duration",
      bn: "সামগ্রীর গ্যারান্টি সময়কাল নির্বাচন করুন",
    },
  },
  size: {
    label: {
      en: "Select Product Size ✽",
      bn: "",
    },
    placeholder: {
      en: "Select product size",
      bn: "",
    },
  },
  color: {
    label: {
      en: "Select Product Color",
      bn: "",
    },
    placeholder: {
      en: "Select product color",
      bn: "",
    },
  },
  profit_margin: {
    label: {
      en: "Write Profit Margin",
      bn: "গ্যারান্টি নির্বাচন করুন",
    },
    placeholder: {
      en: "Write profit margin",
      bn: "সামগ্রীর গ্যারান্টি সময়কাল নির্বাচন করুন",
    },
  },
  sku: {
    label: {
      en: "Write Product SKU Code",
      bn: "গ্যারান্টি নির্বাচন করুন",
    },
    placeholder: {
      en: "Write product sku code",
      bn: "সামগ্রীর গ্যারান্টি সময়কাল নির্বাচন করুন",
    },
  },
};

export const ADD_PURCHASE_FORM = {
  generalInfo: PURCHASE_GENERAL_INFO_FORM,
  productInfo: PURCHASE_PRODUCT_INFO,
};
