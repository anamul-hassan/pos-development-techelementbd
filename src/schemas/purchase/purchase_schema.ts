import * as yup from "yup";
import { englishOnly } from "../common/commonSchemas";

const paymentSchema = yup.object({
  accountId: yup.number(),
  paymentAmount: yup.number(),
});

const productSchema = yup.object({
  productId: yup.number(),
  quantity: yup.number().integer("Must be integer number"),
  price: yup.number().required("Purchase price is required"),
  size: englishOnly.optional(),
  sellingPrice: yup.number().required("Selling price is required"),
  subTotal: yup.number(),
  color: englishOnly.optional(),
  warrantyId: yup
    .number()
    .nullable()
    .transform((value, originalValue) => {
      return originalValue === "" ? 0 : +value;
    })
    .optional(),
  sku: englishOnly.optional(),
});

export const addPurchaseSchema = yup.object().shape({
  supplierId: yup.number(),
  referenceNo: englishOnly.optional(),
  purchaseDate: yup.string().optional(),
  purchaseStatus: yup.string().optional(),
  branchId: yup.number(),
  attachDocument: yup.string().optional(),
  discountType: yup.string().optional(),
  discount: yup.number().optional(),
  due: yup.number().optional(),
  totalAmount: yup.number(),
  totalPaymentAmount: yup.number(),
  note: englishOnly.max(500, "Note limit 500 characters"),
  payments: yup.array().of(paymentSchema),
  products: yup.array().of(productSchema),
});

// import * as yup from "yup";
// import { englishOnly } from "../common/commonSchemas";

// const paymentSchema = yup.object({
//   accountId: yup.string().required("Payment Type is required"),
//   paymentAmount: yup.number().required("Payment amount is required"),
// });

// const productSchema = yup.object({
//   productId: yup.string().required("Product ID is required"),
//   quantity: yup
//     .number()
//     .integer("Must be integer number")
//     .required("Quantity is required"),
//   price: yup.number().optional().required("Price is required"),
//   size: englishOnly.optional(),
//   sellingPrice: yup.number().required("Selling price is required"),
//   subTotal: yup.number().required("Subtotal is required"),
//   color: englishOnly.optional(),
//   warrantyId: yup.string().optional(),
//   version: englishOnly.optional(),
//   sku: englishOnly.optional(),
// });

// export const addPurchaseSchema = yup.object().shape({
//   supplierId: yup.string().required("Supplier ID is required"),
//   referenceNo: englishOnly.optional(),
//   purchaseDate: yup.string().optional(),
//   purchaseStatus: yup.string().optional(),
//   branchId: yup.string().required("Branch is required"),
//   attachDocument: yup.string().optional(),
//   discountType: yup.string().optional(),
//   discount: yup.number().optional(),
//   due: yup.number().optional(),
//   totalAmount: yup.number().required("Total amount is required"),
//   totalPaymentAmount: yup.number().required("Total payment amount is required"),
//   note: englishOnly.max(500, "Note limit 500 characters"),
//   payments: yup.array().of(paymentSchema),
//   products: yup.array().of(productSchema),
// });
